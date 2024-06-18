##########
## common

variable "resource_group_name" {
  type    = string
  default = "demo"
}
variable "location" {
  type        = string
  default     = null
  description = "Location of cluster, if not defined it will be read from the resource-group"
}

variable "name" {
  type = string
}

variable "service_accounts" {
  description = "A map of service accounts with namespace as key and list of service accounts as value."
  type = map(list(string))
}

variable "tags" {
  type = map(string)
}