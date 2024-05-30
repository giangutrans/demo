module "acr" {
  source = "../../modules/acr"

  resource_group = var.resource_group
  location          = var.location
  # DOCKER BUILD
  deploy_image = true
  # Path to scripts directory relative to current location
  dockerfile_folder = "../../modules/acr/scripts"
  #-----------------------------------------------
  # Note: Do not change teamid and prjid once set.
  teamid = var.teamid
  prjid  = var.prjid
  admin_enabled = var.admin_enabled
  extra_tags = var.extra_tags
}

resource "azurerm_role_assignment" "main" {
  principal_id                     = data.terraform_remote_state.aks.outputs.cluster_identity.principal_id
  role_definition_name             = "AcrPull"
  scope                            = module.acr.registry_id
  skip_service_principal_aad_check = true
}