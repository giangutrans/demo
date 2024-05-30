resource "azurerm_key_vault_access_policy" "aks" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = azurerm_user_assigned_identity.aks.tenant_id
  object_id    = azurerm_user_assigned_identity.aks.principal_id

  key_permissions = [
    "Get", "List", "Encrypt", "Decrypt"
  ]
  secret_permissions = [
    "Get", "List", "Recover", "Restore" , "Set"
  ]
  storage_permissions = [
    "Get", "List"
  ]
  certificate_permissions = [
    "Get", "List"
  ]
  
  depends_on = [ azurerm_key_vault.main ]
}

resource "azurerm_key_vault_access_policy" "giangtlt" {
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  key_permissions = [
    "Get","List","Update","Create","Import","Delete","Recover","Backup","Restore","Decrypt","Encrypt","UnwrapKey","WrapKey","Verify","Sign","Purge","Release","Rotate","GetRotationPolicy","SetRotationPolicy"
  ]

  secret_permissions = [
    "Backup", "Delete", "Get", "List", "Purge", "Recover", "Restore" , "Set"
  ]

  storage_permissions = [
    "Backup", "Delete", "DeleteSAS", "Get", "GetSAS", "List", "ListSAS", "Purge", "Recover", "RegenerateKey", "Restore", "Set", "SetSAS", "Update"
  ]

  certificate_permissions = [
    "Backup", "Create", "Delete", "DeleteIssuers", "Get", "GetIssuers", "Import", "List", "ListIssuers", "ManageContacts", "ManageIssuers", "Purge", "Recover", "Restore", "SetIssuers", "Update"
  ]

  depends_on = [ azurerm_key_vault.main ]
}