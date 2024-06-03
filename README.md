</p>
<h1 align="center">DevOps Engineer Test Project</h1>
<p align="center">
		<a href="https://npmcharts.com/compare/@appnest/readme?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@appnest/readme.svg" height="20"/></a>
<a href="https://www.npmjs.com/package/@appnest/readme"><img alt="NPM Version" src="https://img.shields.io/npm/v/@appnest/readme.svg" height="20"/></a>
<a href="https://david-dm.org/andreasbm/readme"><img alt="Dependencies" src="https://img.shields.io/david/andreasbm/readme.svg" height="20"/></a>
<a href="https://github.com/andreasbm/readme/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/andreasbm/readme.svg" height="20"/></a>
<a href="https://github.com/badges/shields"><img alt="Custom badge" src="https://img.shields.io/badge/custom-badge-f39f37.svg" height="20"/></a>
<a href="https://github.com/andreasbm/readme/graphs/commit-activity"><img alt="Maintained" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" height="20"/></a>
	</p>

<p align="center">
  <b>This repository contains the code and configuration files for the DevOps Engineer test project. The project leverages Azure and Azure Kubernetes Service (AKS) to demonstrate modern DevOps practices and efficient cloud infrastructure management.</b>
</p>

<br />

<p align="center">
  <img src="images/demo.drawio.png" alt="Demo" width="800" />
</p>

<p>Technologies Used</p> 

* **Cloud**: Azure
* **Infra as code**: Terraform
* **CICD**: Jenkins
* **Security**: Hashicorp Vault, Service principal, vpn pritunl
* **Application Server**: Python, Nodejs
* **Database**: MongoDB, Redis
* **Kubernetes**: AKS
* **Ingress**: Istio
* **SSL**: Cert manager, issuer let's encrypt
* **Loadtest**: K6

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#installation)

## Important Notes

- **SonarQube**: Due to time constraints, SonarQube was not implemented in this project.
- **Istio**: Istio is used to handle canary deployments, but due to limited time, the implementation may not be fully complete.
- **VPN**: Due to security compliance requirements, we need to set up a VPN first. Only then can we access our system.

## ➤ Deploy infra network

```
cd provisioning/common/network/base
terraform init
terraform apply
```

## ➤ Deploy Azure kubernetes service

```
cd provisioning/dev/aks
terraform init
terraform apply
```

## ➤ Deploy Azure Vault

```
cd provisioning/dev/vault
terraform init
terraform apply
```

## ➤ Deploy Azure Vm

```
cd provisioning/dev/vm
terraform init
terraform apply
```
This Vm run mongodb and redis

## ➤ Deploy Azure ACR

```
cd provisioning/common/acr
terraform init
terraform apply
```

## ➤ Deploy Charts

- Check the README.md in each folder within the charts directory for specific details and instructions related to Helm charts.


## ➤ VPN
1. Download: https://openvpn.net/client/

2. VPN: https://vpn.yanyicivic.com
- Username: qualgo 
- Password: ***

3. file: vpn/qualgo_qualgo_qualgo.ovpn
- Username: qualgo
- Password: 123123

## ➤ CICD
1. BE: https://jenkins.yanyicivic.com/job/api/
2. FE: https://jenkins.yanyicivic.com/job/fe

- Username: qualgo
- Password: qualgo@12345

## ➤ Hasicorp Vault
- https://vaul.yanyicivic.com
- token: ***

## ➤ Splunk
1. https://log.yanyicivic.com
- Username: qualgo
- Password: ***
- Searching: index=qualgo

## ➤ Web app
- API: https://api.yanyicivic.com/docs
- FE: https://shop.yanyicivic.com
- Loadtest: 
```
cd deployment/dev/api
k6 run k6.js
```

## ➤ MongoDB
```
mongodb+srv://admin:vzo5p0ouqjvuppsran6omv@cluster0.yanyicivic.com/?replicaSet=rs0&ssl=false
```

## ➤ Auto Scale
- I use KEDA (https://keda.sh/) to manage workload scaling. In this article, I demonstrate how to use log analysis to count API requests for scaling purposes

```
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: api-scaled-object
  namespace: default
  labels:
    deploymentName: api
spec:
  scaleTargetRef:
    kind: #Optional: Default: Deployment, Available Options: ReplicaSet, Deployment, DaemonSet, StatefulSet
    name: api
  pollingInterval: 3
  cooldownPeriod: 3
  minReplicaCount: 1
  maxReplicaCount: 10
  triggers:
  - type: azure-log-analytics
    metadata:
      query: |
        let AppName = "api";
        let Namespace = "istio-ingress";
        let TimeRange = ago(1m);  // Define the time range for the query
        ContainerLog
        | where TimeGenerated > TimeRange
        | where Namespace == Namespace
        | where LogEntry contains AppName
        | extend LogFields = parse_json(LogEntry)  // Parse the log entry as JSON
        | extend UpstreamHost = tostring(LogFields.requested_server_name)  // Extract the upstream_host field
        | where UpstreamHost == "api.yanyicivic.com"  // Filter for UPSTREAM_HOST
        | project TimeGenerated, LogEntry, UpstreamHost
        | summarize Threshold = count()     
      threshold: "5"
    authenticationRef:
      name: trigger-auth-kedaloganalytics
```

## ➤ Contributors
Feel free to fork the repository and make contributions. Please create a pull request for any changes you wish to merge.


## ➤ License
	
Licensed under [MIT](https://opensource.org/licenses/MIT).