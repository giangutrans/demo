resource "azurerm_key_vault_secret" "demo" {
  name         = "demo"
  value        = file("files/demo.env")
  key_vault_id = azurerm_key_vault.main.id
  tags         = var.tags
  depends_on = [ azurerm_key_vault.main, azurerm_key_vault_access_policy.aks, azurerm_key_vault_access_policy.giangtlt]
}