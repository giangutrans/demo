resource "azurerm_user_assigned_identity" "aks" {
  location            = var.location
  name                = "demodentityaks"
  resource_group_name = var.resource_group_name
  tags                = var.tags
}

resource "azurerm_federated_identity_credential" "aks" {
  for_each           = { for idx, sa in local.flattened_service_accounts : "${sa.namespace}-${sa.name}" => sa }
  name                = "demodentityaks-${each.key}"
  resource_group_name = var.resource_group_name
  audience            = ["api://AzureADTokenExchange"]
  issuer              = data.azurerm_kubernetes_cluster.aks.oidc_issuer_url
  parent_id           = azurerm_user_assigned_identity.aks.id
  subject            = "system:serviceaccount:${each.value.namespace}:${each.value.name}"
  
  depends_on = [ azurerm_user_assigned_identity.aks ]
}
