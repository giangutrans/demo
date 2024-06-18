#Vnet
variable "resource_group_name" {
  type    = string
  default = "demo"
}
variable "use_for_each" {
  type    = bool
  default = true
}
variable "address_space" {
  type    = list(string)
  default = ["10.240.0.0/16"]
}
variable "subnet_prefixes" {
  type    = list(string)
  default = ["10.240.10.0/24", "10.240.11.0/24", "10.240.100.0/24"]
}
variable "subnet_names" {
  type    = list(string)
  default = ["subnet1", "subnet2", "subnet-vm"]
}
variable "vnet_location" {
  type    = string
  default = "Southeast Asia"
}
variable "subnet_service_endpoints" {
  type = map(any)
  default = {
    "subnet1" = ["Microsoft.Storage"]
  }
}
variable "private_endpoint_network_policies_enabled" {
  type    = bool
  default = true

}
variable "private_link_service_network_policies_enabled" {
  type    = bool
  default = false
}
variable "tags" {
  type = map(string)
  # default = {
  #   ProjectName = "demo"
  #   Approver    = "giang.truong200493@gmail.com"
  #   StartDate   = "29/5/2024"
  #   Owner       = "giang.truong200493@gmail.com"
  #   Requestor   = "giang.truong200493@gmail.com"
  #   Creator     = "giang.truong200493@gmail.com"
  # }
}
variable "vnet_name" {
  type        = string
  # default     = "ai4code-network"
  description = "Name of the vnet to create"
}
