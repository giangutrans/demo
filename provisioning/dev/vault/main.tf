resource "azurerm_key_vault" "main" {
  name                        = var.name
  location                    = var.location
  resource_group_name         = var.resource_group_name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  enable_rbac_authorization   = false
  sku_name                    = "standard"
  tags                        = var.tags
}

resource "azurerm_role_assignment" "aks" {
  principal_id         = azurerm_user_assigned_identity.aks.principal_id
  scope                = azurerm_key_vault.main.id
  role_definition_name = "Contributor"
}