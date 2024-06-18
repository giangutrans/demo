data "terraform_remote_state" "common" {
  backend = "azurerm"
  config = {
    storage_account_name = "demoinfra"
    container_name       = "tfstate"
    key                  = "common.tfstate"
    resource_group_name  = "demo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }
}

data "terraform_remote_state" "vm" {
  backend = "azurerm"
  config = {
    storage_account_name = "demoinfra"
    container_name       = "tfstate"
    key                  = "vm.tfstate"
    resource_group_name  = "demo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }
}