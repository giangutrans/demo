##########
## common

variable "resource_group_name" {
  type    = string
  default = "qualgo"
}

#######
## AKS

variable "prefix" {
  type = string
}
variable "cluster_name" {
  type = string
}
variable "os_disk_size_gb" {
  type    = number
  default = 100
}
variable "sku_tier" {
  type    = string
  default = "Standard"
}
variable "rbac_aad" {
  type    = bool
  default = false
}
variable "network_plugin" {
  type    = string
  default = "azure"
}
variable "network_policy" {
  type    = string
  default = "azure"
}
variable "key_vault_secrets_provider_enabled" {
  type    = bool
  default = false
}
variable "enable_auto_scaling" {
  type    = bool
  default = false
}
variable "agents_count" {
  type    = number
  default = 1
}
variable "agents_availability_zones" {
  type    = list(string)
  default = ["1", "2"]
}

variable "cluster_log_analytics_workspace_name" {
  type = string
}

variable "tags" {
  type = map(string)
}

variable "agents_tags" {
  type        = map(string)
  default     = {}
  description = "(Optional) A mapping of tags to assign to the Node Pool."
}

variable "kubernetes_version" {
  type        = string
  default     = null
  description = "Specify which Kubernetes release to use. The default used is the latest Kubernetes version available in the region"
}

variable "location" {
  type        = string
  default     = null
  description = "Location of cluster, if not defined it will be read from the resource-group"
}

variable "node_resource_group" {
  type        = string
  default     = null
  description = "The auto-generated Resource Group which contains the resources for this Managed Kubernetes Cluster. Changing this forces a new resource to be created."
}

variable "agents_pool_max_surge" {
  type        = string
  default     = null
  description = "The maximum number or percentage of nodes which will be added to the Default Node Pool size during an upgrade."
}

variable "identity_ids" {
  type        = list(string)
  default     = null
  description = "(Optional) Specifies a list of User Assigned Managed Identity IDs to be assigned to this Kubernetes Cluster."
}

variable "identity_type" {
  type        = string
  default     = "SystemAssigned"
  description = "(Optional) The type of identity used for the managed cluster. Conflicts with `client_id` and `client_secret`. Possible values are `SystemAssigned` and `UserAssigned`. If `UserAssigned` is set, an `identity_ids` must be set as well."

  validation {
    condition     = var.identity_type == "SystemAssigned" || var.identity_type == "UserAssigned"
    error_message = "`identity_type`'s possible values are `SystemAssigned` and `UserAssigned`"
  }
}

variable "service_mesh_profile" {
  type = object({
    mode                             = string
    internal_ingress_gateway_enabled = optional(bool, true)
    external_ingress_gateway_enabled = optional(bool, true)
  })
  default     = null
  description = <<-EOT
    `mode` - (Required) The mode of the service mesh. Possible value is `Istio`.
    `internal_ingress_gateway_enabled` - (Optional) Is Istio Internal Ingress Gateway enabled? Defaults to `true`.
    `external_ingress_gateway_enabled` - (Optional) Is Istio External Ingress Gateway enabled? Defaults to `true`.
  EOT
}

variable "green_field_application_gateway_for_ingress" {
  type = object({
    name        = optional(string)
    subnet_cidr = optional(string)
    subnet_id   = optional(string)
  })
  default     = null
  description = <<-EOT
  [Definition of `green_field`](https://learn.microsoft.com/en-us/azure/application-gateway/tutorial-ingress-controller-add-on-new)
  * `name` - (Optional) The name of the Application Gateway to be used or created in the Nodepool Resource Group, which in turn will be integrated with the ingress controller of this Kubernetes Cluster.
  * `subnet_cidr` - (Optional) The subnet CIDR to be used to create an Application Gateway, which in turn will be integrated with the ingress controller of this Kubernetes Cluster.
  * `subnet_id` - (Optional) The ID of the subnet on which to create an Application Gateway, which in turn will be integrated with the ingress controller of this Kubernetes Cluster.
EOT

  validation {
    condition     = var.green_field_application_gateway_for_ingress == null ? true : (can(coalesce(var.green_field_application_gateway_for_ingress.subnet_id, var.green_field_application_gateway_for_ingress.subnet_cidr)))
    error_message = "One of `subnet_cidr` and `subnet_id` must be specified."
  }
}

variable "network_contributor_role_assigned_subnet_ids" {
  type        = map(string)
  default     = {}
  description = "Create role assignments for the AKS Service Principal to be a Network Contributor on the subnets used for the AKS Cluster, key should be static string, value should be subnet's id"
  nullable    = false
}

variable "bring_your_own_vnet" {
  type    = bool
  default = true
}


variable "use_brown_field_application_gateway" {
  type    = bool
  default = false
}

variable "create_role_assignments_for_application_gateway" {
  type        = bool
  default     = true
  description = "(Optional) Whether to create the corresponding role assignments for application gateway or not. Defaults to `true`."
  nullable    = false
}

variable "create_role_assignment_network_contributor" {
  type        = bool
  default     = false
  description = "(Deprecated) Create a role assignment for the AKS Service Principal to be a Network Contributor on the subnets used for the AKS Cluster"
  nullable    = false
}
variable "oidc_issuer_enabled" {
  type        = bool
  default     = false
  description = "Enable or Disable the OIDC issuer URL. Defaults to false."
}

variable "workload_identity_enabled" {
  type        = bool
  default     = false
  description = "Enable or Disable Workload Identity. Defaults to false."
}

variable "agents_max_count" {
  type        = number
  default     = null
  description = "Maximum number of nodes in a pool"
}

variable "agents_max_pods" {
  type        = number
  default     = null
  description = "(Optional) The maximum number of pods that can run on each agent. Changing this forces a new resource to be created."
}

variable "agents_min_count" {
  type        = number
  default     = null
  description = "Minimum number of nodes in a pool"
}

variable "agents_size" {
  type        = string
  default     = "Standard_D2s_v3"
  description = "The default virtual machine size for the Kubernetes agents. Changing this without specifying `var.temporary_name_for_rotation` forces a new resource to be created."
}

variable "temporary_name_for_rotation" {
  type        = string
  default     = null
  description = "(Optional) Specifies the name of the temporary node pool used to cycle the default node pool for VM resizing. the `var.agents_size` is no longer ForceNew and can be resized by specifying `temporary_name_for_rotation`"
}

variable "private_cluster_enabled" {
  type        = bool
  default     = false
  description = "If true cluster API server will be exposed only on internal IP address and available only in cluster vnet."
}

variable "api_server_authorized_ip_ranges" {
  type        = set(string)
  default     = null
  description = "(Optional) The IP ranges to allow for incoming traffic to the server nodes."
}