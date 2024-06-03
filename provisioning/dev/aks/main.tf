module "aks" {
  source = "../../modules/aks"

  prefix              = var.prefix
  cluster_name        = var.cluster_name
  resource_group_name = var.resource_group_name
  kubernetes_version  = var.kubernetes_version
  os_disk_size_gb     = var.os_disk_size_gb
  sku_tier            = var.sku_tier
  rbac_aad            = var.rbac_aad
  location            = var.location
  vnet_subnet_id      = local.subnet2 
  network_plugin      = var.network_plugin
  network_policy      = var.network_policy
  oidc_issuer_enabled = var.oidc_issuer_enabled
  key_vault_secrets_provider_enabled   = var.key_vault_secrets_provider_enabled
  cluster_log_analytics_workspace_name = var.cluster_log_analytics_workspace_name
  tags                                 = var.tags
  enable_auto_scaling                  = var.enable_auto_scaling
  agents_pool_max_surge                = var.agents_pool_max_surge
  identity_ids                         = var.identity_ids
  identity_type                        = var.identity_type
  workload_identity_enabled            = var.workload_identity_enabled
  private_cluster_enabled              = var.private_cluster_enabled
  api_server_authorized_ip_ranges      = ["${local.vm_public_ip}/32", "203.171.29.12/32"]
  network_contributor_role_assigned_subnet_ids = {
    vnet_subnet = local.subnet2
  }

  create_role_assignments_for_application_gateway = var.create_role_assignments_for_application_gateway
  create_role_assignment_network_contributor = var.create_role_assignment_network_contributor
  
  node_pools = {
    worker-01 = {
      name                  = "worker01"
      vm_size               = "Standard_D2_v2"
      node_count            = 1
      vnet_subnet_id        = local.subnet1
      create_before_destroy = true
      min_count             = 0
      max_count             = 1
      os_type               = "Linux"
      enable_auto_scaling   = true
      zones                 = toset(["1", "2"])
      tags                  = var.tags
    }
  }

  workload_autoscaler_profile = {
    keda_enabled                    = true
    vertical_pod_autoscaler_enabled = false
  }
  agents_count              = var.agents_count
  agents_availability_zones = var.agents_availability_zones
  agents_max_count          = var.agents_max_count
  agents_min_count          = var.agents_min_count
  agents_max_pods           = var.agents_max_pods
  agents_size               = var.agents_size
  temporary_name_for_rotation = var.temporary_name_for_rotation
}