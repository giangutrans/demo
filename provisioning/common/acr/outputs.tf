output "registry_url" {
  description = "The URL that can be used to log into the container registry"
  value       = module.acr.registry_url
}

output "registry_username" {
  description = "The Username associated with the Container Registry Admin account - if the admin account is enabled"
  value       = module.acr.registry_username
}

output "registry_password" {
  description = "The Password associated with the Container Registry Admin account - if the admin account is enabled"
  value       = module.acr.registry_password
}

output "registry_id" {
  description = "The Container Registry ID"
  value       = module.acr.registry_id
}

output "registry_configure" {
  description = "Registry configure"
  value       = module.acr.registry_configure
}