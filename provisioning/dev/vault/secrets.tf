resource "azurerm_key_vault_secret" "QUALGO" {
  name         = "QUALGO"
  value        = file("files/qualgo.env")
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}