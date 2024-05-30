data "terraform_remote_state" "aks" {
  backend = "azurerm"
  config = {
    storage_account_name = "qualgoinfra"
    container_name       = "tfstate"
    key                  = "aks-nonprod.tfstate"
    resource_group_name  = "qualgo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }
}