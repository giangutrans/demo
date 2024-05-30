output "linux_vm_as_id" {
  value = module.linux.vm_availability_set_id
}

output "vm_public_ip" {
  value = azurerm_public_ip.main.ip_address
}