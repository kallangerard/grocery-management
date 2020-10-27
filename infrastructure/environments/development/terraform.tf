# module "core" {
#   source = "../../modules/core"
# }

module "database" {
  source = "../../modules/database"
  db_name = "grocery"
  db_password = "${var.db_password}"
}