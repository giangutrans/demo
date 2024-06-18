variable "create_resource_group" {
  type     = bool
  default  = false
  nullable = false
}

variable "size" {
  type     = string
  default  = "Standard_F2"
  nullable = false
}

variable "resource_group_name" {
  type    = string
  default = "demo"
}

variable "location" {
  type        = string
  default     = null
  description = "Location of cluster, if not defined it will be read from the resource-group"
}

variable "public_key" {
  type        = string
  default     = null
  description = "Public Key SSH"
}

variable "tags" {
  type = map(string)
}