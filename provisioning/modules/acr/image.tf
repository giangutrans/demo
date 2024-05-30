locals {
  registry_name = join("", azurerm_container_registry.registry.*.name)
  image_name    = var.image_name != null ? var.image_name : local.registry_name
}

data "external" "build_folder" {
  program = ["sh", "${path.module}/scripts/folder_contents.sh", var.dockerfile_folder]
}

# Push to registry
resource "null_resource" "build_and_push" {
  count = var.deploy_image ? 1 : 0

  triggers = {
    build_folder_content_md5 = data.external.build_folder.result.md5
  }

  # refer scripts/build.sh for more details
  provisioner "local-exec" {
    command = "/bin/sh ${path.module}/scripts/build.sh ${var.dockerfile_folder} ${local.registry_name} ${local.image_name} ${var.docker_image_tag}"
  }
}