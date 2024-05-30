resource "azurerm_key_vault_secret" "API_MONGO_DB" {
  name         = "MONGODB"
  value        = "qualgodb"
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}

resource "azurerm_key_vault_secret" "API_MONGO_PWS" {
  name         = "MONGOPWS"
  value        = "2ajxtajafnn117vqfts4b7"
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}

resource "azurerm_key_vault_secret" "API_MONGO_USER" {
  name         = "MONGOUSER"
  value        = "qualgouser"
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}

resource "azurerm_key_vault_secret" "QUALGO" {
  name         = "QUALGO"
  value        = file("files/qualgo.env")
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}