terraform {
  backend "azurerm" {
    storage_account_name = "demoinfra"
    container_name       = "tfstate"
    key                  = "acr.tfstate"
    resource_group_name  = "demo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }

  required_version = ">=1.2"
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

provider "random" {}
