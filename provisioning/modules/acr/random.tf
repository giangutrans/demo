resource "random_string" "naming" {
  special = false
  upper   = false
  length  = 3
}

locals {
  suffix = random_string.naming.result
}