variable "teamid" {
  description = "Name of the team/group e.g. devops, dataengineering. Should not be changed after running 'tf apply'"
  type        = string
}

variable "prjid" {
  description = "Name of the project/stack e.g: mystack, nifieks, demoaci. Should not be changed after running 'tf apply'"
  type        = string
}

variable "admin_enabled" {
  description = "Specifies whether the admin user is enabled"
  default     = false
  type        = bool
}

variable "sku" {
  description = "The SKU name of the container registry. Possible values are Basic, Standard and Premium. Classic (which was previously Basic) is supported only for existing resources"
  default     = "Standard"
  type        = string
}

variable "deploy_acr" {
  description = "Feature flag, true or false"
  default     = true
  type        = bool
}

variable "deploy_image" {
  description = "Feature flag, true or false"
  default     = true
  type        = bool
}

variable "dockerfile_folder" {

  description = "This is the folder which contains the Dockerfile"
  type        = string
}

variable "registry_name" {
  description = "Registry name"
  default     = null
  type        = string
}

variable "image_name" {
  description = "Image name"
  default     = null
  type        = string
}

variable "docker_image_tag" {
  type        = string
  description = "This is the tag which will be used for the image that you created"
  default     = "latest"
}

variable "webhooks" {
  description = "A list of objects describing the webhooks resources required"
  type = list(object({
    name           = string
    service_uri    = string
    status         = string
    scope          = string
    actions        = list(string)
    custom_headers = map(string)
  }))
  default = []
}

variable "extra_tags" {
  description = "Additional tags to associate"
  type        = map(string)
  default     = {}
}

variable "resource_group" {
  description = "Name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure region to use"
  type        = string
}

variable "georeplication" {
  description = <<DESC
  A list of Azure locations where the container registry should be geo-replicated. Only activated on Premium SKU.
  Supported properties are:
    location                = string
    zone_redundancy_enabled = bool
    tags                    = map(string)
  or this can be a list of `string` (each element is a location)
DESC
  type        = list(any)
  default     = []
}

variable "images_retention_enabled" {
  description = "Specifies whether images retention is enabled (Premium only)."
  type        = bool
  default     = false
}

variable "images_retention_days" {
  description = "Specifies the number of images retention days."
  type        = number
  default     = 90
}

variable "azure_services_bypass_allowed" {
  description = "Whether to allow trusted Azure services to access a network restricted Container Registry"
  type        = bool
  default     = false
}

variable "trust_policy_enabled" {
  description = "Specifies whether the trust policy is enabled (Premium only)."
  type        = bool
  default     = false
}

variable "allowed_cidrs" {
  description = "List of CIDRs to allow on the registry"
  default     = []
  type        = list(string)
}

variable "allowed_subnets" {
  description = "List of VNet/Subnet IDs to allow on the registry"
  default     = []
  type        = list(string)
}