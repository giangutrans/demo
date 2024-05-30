locals {
  vnet        = data.terraform_remote_state.common.outputs.vnet
  subnet1     = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet1", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet1", subnet))], 0) : null
  subnet2     = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet2", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet2", subnet))], 0) : null
  subnetvm    = length([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet-vm", subnet))]) > 0 ? element([ for subnet in local.vnet.vnet_subnets : subnet if can(regex("subnet-vm", subnet))], 0) : null
  cidr        = join(",", local.vnet.vnet_address_space)
}
