terraform {
  backend "azurerm" {
    storage_account_name = "demoinfra"
    container_name       = "tfstate"
    key                  = "vm.tfstate"
    resource_group_name  = "demo"
    subscription_id      = "e48f612a-3960-4980-a4a9-47fa0a234a4f"
  }

  required_version = ">=1.2"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.11, < 4.0"
    }
    random = {
      source  = "hashicorp/random"
      version = ">=3.0.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "3.0.0"
    }
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
    key_vault {
      purge_soft_delete_on_destroy    = true
      recover_soft_deleted_key_vaults = true
    }
  }
}

provider "random" {}
