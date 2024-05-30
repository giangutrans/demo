locals {
  vnet        = data.terraform_remote_state.common.outputs.vnet
  subnet1     = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet1", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet1", subnet))], 0) : null
  subnet2     = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet2", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet2", subnet))], 0) : null
  subnetvm    = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet-vm", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet-vm", subnet))], 0) : null
  cidr        = join(",", local.vnet.vnet_address_space)
  # appgw_cidr  = !var.use_brown_field_application_gateway && !var.bring_your_own_vnet ? "10.225.0.0/16" : "10.52.1.0/24"
  vm_public_ip = data.terraform_remote_state.vm.outputs.vm_public_ip
  
  backend_address_pool_name      = try("${local.vnet.vnet_name}-beap", "")
  frontend_ip_configuration_name = try("${local.vnet.vnet_name}-feip", "")
  frontend_port_name             = try("${local.vnet.vnet_name}-feport", "")
  http_setting_name              = try("${local.vnet.vnet_name}-be-htst", "")
  listener_name                  = try("${local.vnet.vnet_name}-httplstn", "")
  request_routing_rule_name      = try("${local.vnet.vnet_name}-rqrt", "")

}


