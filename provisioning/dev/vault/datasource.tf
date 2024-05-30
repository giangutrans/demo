data "azurerm_client_config" "current" {}

data "terraform_remote_state" "common" {
  backend = "azurerm"
  config = {
    storage_account_name = "qualgoinfra"
    container_name       = "tfstate"
    key                  = "common.tfstate"
    resource_group_name  = "qualgo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }
}

data "azurerm_kubernetes_cluster" "aks" {
  name                = "qualgo-nonprod-aks-sea-cluster"
  resource_group_name = "qualgo"
}
