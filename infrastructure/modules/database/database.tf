
data "aws_vpc" "default" {
  default = true
}

data "aws_subnet_ids" "all" {
  vpc_id = data.aws_vpc.default.id
}

data "aws_security_group" "default" {
  vpc_id = data.aws_vpc.default.id
  name   = "default"
}

module "database" {
  source = "terraform-aws-modules/rds/aws"
  version = "~> 2.0"

  identifier = "${var.db_name}-postgres"

  engine = "postgres"
  engine_version = "11.5.0"
  instance_class = "${var.db_instance_class}"
  allocated_storage = "1"

  # kms_key_id        = "arm:aws:kms:<region>:<account id>:key/<kms key id>"
  name = "${var.db_name}"

  # NOTE: Do NOT use 'user' as the value for 'username' as it throws:
  # "Error creating DB Instance: InvalidParameterValue: MasterUsername
  # user cannot be used as it is a reserved word used by the engine"
  username = "${var.db_name}"

  password = "${var.db_password}"
  port     = "${var.db_port}"

  vpc_security_group_ids = [data.aws_security_group.default.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  # disable backups to create DB faster
  backup_retention_period = 0

  tags = {
    Environment = "${var.environment}"
  }

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  # DB subnet group
  subnet_ids = data.aws_subnet_ids.all.ids

  # DB parameter group
  family = "postgres11.5"

  # DB option group
  major_engine_version = "11.5"

  # Snapshot name upon DB deletion
  final_snapshot_identifier = "${var.db_name}"

  # Database Deletion Protection
  deletion_protection = false
}