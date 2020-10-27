terraform {
  backend "remote" {
      hostname = "app.terraform.io"
      organization = "kallangerard"
      workspaces {
        name = "grocery-management-dev"
      }
  }
}
  
provider "aws" {
  region = "ap-southeast-2"
}