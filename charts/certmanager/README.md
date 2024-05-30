# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation cert-manager
2.  Checking
# Build and Test
1. Installation cert-manager
    ```
    $ kubectl create ns cert-manager          
    namespace/cert-manager created

    $ helm repo add jetstack https://charts.jetstack.io --force-update

    $ kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.5/cert-manager.crds.yaml
    customresourcedefinition.apiextensions.k8s.io/certificaterequests.cert-manager.io created
    customresourcedefinition.apiextensions.k8s.io/certificates.cert-manager.io created
    customresourcedefinition.apiextensions.k8s.io/challenges.acme.cert-manager.io created
    customresourcedefinition.apiextensions.k8s.io/clusterissuers.cert-manager.io created
    customresourcedefinition.apiextensions.k8s.io/issuers.cert-manager.io created
    customresourcedefinition.apiextensions.k8s.io/orders.acme.cert-manager.io created

    $ helm upgrade --install cert-manager jetstack/cert-manager -f values.yaml --version v1.14.5
    Release "cert-manager" does not exist. Installing it now.
    NAME: cert-manager
    LAST DEPLOYED: Wed May 29 18:38:06 2024
    NAMESPACE: cert-manager
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    cert-manager v1.14.5 has been deployed successfully!

    In order to begin issuing certificates, you will need to set up a ClusterIssuer
    or Issuer resource (for example, by creating a 'letsencrypt-staging' issuer).

    More information on the different types of issuers and how to configure them
    can be found in our documentation:

    https://cert-manager.io/docs/configuration/

    For information on how to configure cert-manager to automatically provision
    Certificates for Ingress resources, take a look at the `ingress-shim`
    documentation:

    https://cert-manager.io/docs/usage/ingress/

2. Checking
    ```
    $ helm ls                                                    
    NAME        	NAMESPACE   	REVISION	UPDATED                                	STATUS  	CHART               	APP VERSION
    cert-manager	cert-manager	1       	2024-05-29 18:38:06.079488491 +0700 +07	deployed	cert-manager-v1.14.5	v1.14.5


    