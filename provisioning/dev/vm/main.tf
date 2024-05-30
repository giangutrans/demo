resource "random_id" "id" {
  byte_length = 2
}

# resource "azurerm_availability_set" "main" {
#   location            = var.location
#   name                = "as-${random_id.id.hex}"
#   resource_group_name = var.resource_group_name
# }

resource "azurerm_public_ip" "main" {
  name                = "eipvm-${random_id.id.hex}"
  resource_group_name = var.resource_group_name
  location            = var.location
  allocation_method   = "Static"
  tags                = var.tags
}

module "linux" {
  source = "../../modules/vm"

  location                   = var.location
  image_os                   = "linux"
  resource_group_name        = var.resource_group_name
  allow_extension_operations = false
#   availability_set_id        = azurerm_availability_set.main.id
  boot_diagnostics           = false
  new_network_interface = {
    ip_forwarding_enabled = false
    ip_configurations = [
      {
        primary = true
        public_ip_address_id = azurerm_public_ip.main.id
      }
    ]
  }
  admin_username = "azureuser"
  admin_ssh_keys = [
    {
        public_key = var.public_key
    }
  ]
  name = "ubuntu-${random_id.id.hex}"
  os_disk = {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 200
  }
  os_simple = "UbuntuServer"
  size      = var.size
  subnet_id = local.subnetvm
  tags = var.tags
}

resource "azurerm_network_interface_security_group_association" "as" {
  network_interface_id      = module.linux.network_interface_id
  network_security_group_id = azurerm_network_security_group.main.id
}