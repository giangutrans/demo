# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation vault
2.  Checking
# Build and Test
1. Installation vault
    ```
    $ kubectl create ns vault          
    namespace/vault created

    $ helm repo add hashicorp https://helm.releases.hashicorp.com

    $ helm upgrade --install vault hashicorp/vault -f values.yaml
    NAME: vault
    LAST DEPLOYED: Wed May 29 18:19:02 2024
    NAMESPACE: vault
    STATUS: deployed
    REVISION: 1
    NOTES:
    Thank you for installing HashiCorp Vault!

    Now that you have deployed Vault, you should look over the docs on using
    Vault with Kubernetes available here:

    https://developer.hashicorp.com/vault/docs


    Your release is named vault. To learn more about the release, try:

    $ helm status vault
    $ helm get manifest vault

2. Checking
    ```
    $ helm ls                                                    
    NAME 	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART       	APP VERSION
    vault	vault    	3       	2024-05-29 18:21:39.713099383 +0700 +07	deployed	vault-0.28.0	1.16.1  


    