resource "azurerm_container_registry_webhook" "webhooks" {
  for_each = { for object in var.webhooks : object.name => object }

  depends_on = [azurerm_container_registry.registry]

  name                = each.value.name
  resource_group_name = var.resource_group
  location            = var.location
  registry_name       = join("", azurerm_container_registry.registry.*.name)

  service_uri = each.value.service_uri # "https://mywebhookreceiver.example/mytag"
  status      = each.value.status      # "enabled"
  scope       = each.value.scope       # "mytag:*"
  actions     = each.value.actions     # ["push"]
  # custom_headers = {
  #   "Content-Type" = "application/json"
  # }
}