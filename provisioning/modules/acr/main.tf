locals {
  acr_name = var.registry_name != null ? var.registry_name : "${var.teamid}${var.prjid}${local.suffix}"

}

resource "azurerm_container_registry" "registry" {
  count = var.deploy_acr ? 1 : 0

  name                = lower(local.acr_name)
  resource_group_name = var.resource_group
  location            = var.location
  sku                 = var.sku
  admin_enabled       = var.admin_enabled

  network_rule_bypass_option = var.azure_services_bypass_allowed ? "AzureServices" : "None"

  dynamic "retention_policy" {
    for_each = var.images_retention_enabled && var.sku == "Premium" ? ["enabled"] : []

    content {
      enabled = var.images_retention_enabled
      days    = var.images_retention_days
    }
  }

  dynamic "trust_policy" {
    for_each = var.trust_policy_enabled && var.sku == "Premium" ? ["enabled"] : []

    content {
      enabled = var.trust_policy_enabled
    }
  }

  dynamic "georeplications" {
    for_each = var.georeplication != null && var.sku == "Premium" ? var.georeplication : []

    content {
      location                = try(georeplications.value.location, georeplications.value)
      zone_redundancy_enabled = try(georeplications.value.zone_redundancy_enabled, null)
      tags                    = try(georeplications.value.tags, null)
    }

  }

  dynamic "network_rule_set" {
    for_each = length(concat(var.allowed_cidrs, var.allowed_subnets)) > 0 ? ["enabled"] : []

    content {
      default_action = "Deny"

      dynamic "ip_rule" {
        for_each = var.allowed_cidrs
        content {
          action   = "Allow"
          ip_range = ip_rule.value
        }
      }

      dynamic "virtual_network" {
        for_each = var.allowed_subnets
        content {
          action    = "Allow"
          subnet_id = virtual_network.value
        }
      }
    }
  }
  tags = merge(local.shared_tags, var.extra_tags)
}