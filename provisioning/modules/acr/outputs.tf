output "registry_url" {
  description = "The URL that can be used to log into the container registry"
  value       = join("", azurerm_container_registry.registry.*.login_server)
}

output "registry_username" {
  description = "The Username associated with the Container Registry Admin account - if the admin account is enabled"
  value       = join("", azurerm_container_registry.registry.*.admin_username)
}

output "registry_password" {
  description = "The Password associated with the Container Registry Admin account - if the admin account is enabled"
  value       = nonsensitive(join("", azurerm_container_registry.registry.*.admin_password))
}

output "registry_id" {
  description = "The Container Registry ID"
  value       = join("", azurerm_container_registry.registry.*.id)
}

output "registry_configure" {
  description = "Registry configure"
  value       = <<CONFIGURE
Authenticate to the Container registry by running the following command:
$ docker login \
  -u $(terraform output registry_username) \
  -p $(terraform output registry_password) \
  $(terraform output registry_url)
CONFIGURE
}