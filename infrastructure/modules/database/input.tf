variable "db_name" {
  type = string
}
variable "db_instance_class" {
  type = string
  default = "db.t2.micro"
}
variable "db_password" {
  type = string
}
variable "db_port" {
  type = string
  default = "5432"
}
variable "environment" {
  type = string
  default = "development"
}
