variable "teamid" {
  description = "Name of the team/group e.g. devops, dataengineering. Should not be changed after running 'tf apply'"
  type        = string
}

variable "prjid" {
  description = "Name of the project/stack e.g: mystack, nifieks, demoaci. Should not be changed after running 'tf apply'"
  type        = string
}
variable "location" {
  description = "Specifies the supported Azure location where the resource exists. Changing this forces a new resource to be created"
  type        = string
}
variable "resource_group" {
  type    = string
  default = "demo"
}

variable "admin_enabled" {
  description = "Specifies whether the admin user is enabled"
  default     = false
  type        = bool
}

variable "extra_tags" {
  description = "Additional tags to associate"
  type        = map(string)
  default     = {}
}