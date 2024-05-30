module "vnet" {
  source = "../../../modules/vnet"
  # version = "4.1.0"

  vnet_name           = var.vnet_name
  resource_group_name = var.resource_group_name #azurerm_resource_group.this.name
  use_for_each        = var.use_for_each        #true
  address_space       = var.address_space       #["10.100.0.0/16"]
  subnet_prefixes     = var.subnet_prefixes     #["10.100.1.0/24", "10.100.2.0/24", "10.100.3.0/24"]
  subnet_names        = var.subnet_names        #["subnet1", "subnet2", "subnet3"]
  vnet_location       = var.vnet_location       #local.region

  subnet_service_endpoints = var.subnet_service_endpoints

  private_endpoint_network_policies_enabled = var.private_endpoint_network_policies_enabled

  tags = var.tags

}
