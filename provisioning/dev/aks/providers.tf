terraform {
  backend "azurerm" {
    storage_account_name = "demoinfra"
    container_name       = "tfstate"
    key                  = "aks-nonprod.tfstate"
    resource_group_name  = "demo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }

  required_version = ">=1.2"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.11.0, <4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.3.2"
    }
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

provider "random" {}
