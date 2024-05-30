locals {
  flattened_service_accounts = flatten([
    for namespace, sa_list in var.service_accounts : [
      for sa in sa_list : {
        namespace = namespace
        name      = sa
      }
    ]
  ])
}