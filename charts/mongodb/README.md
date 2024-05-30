# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation
2.  Checking
# Build and Test
1. Installation 
    ```
    $ kubectl create ns database
    $ helm upgrade --install mongodb oci://registry-1.docker.io/bitnamicharts/mongodb -f values.yaml
    Release "mongodb" does not exist. Installing it now.
    Pulled: registry-1.docker.io/bitnamicharts/mongodb:15.6.1
    Digest: sha256:675f6279b569ed64f4a39cbd00935bcb648cfc206b8e2d73e1738fd972775ce4
    NAME: mongodb
    LAST DEPLOYED: Thu May 30 01:31:50 2024
    NAMESPACE: database
    STATUS: deployed
    REVISION: 1
    TEST SUITE: None
    NOTES:
    CHART NAME: mongodb
    CHART VERSION: 15.6.1
    APP VERSION: 7.0.11

    ** Please be patient while the chart is being deployed **

    MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

        mongodb.database.svc.cluster.local

    To get the root password run:

        export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace database mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

    WARNING: There are "resources" sections in the chart not set. Using "resourcesPreset" is not recommended for production. For production installations, please set the following values according to your workload needs:
    - arbiter.resources
    - resources
    +info https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

2. Checking
    ```
    $ helm ls
    NAME   	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART         	APP VERSION
    mongodb	database 	1       	2024-05-30 01:31:50.203462198 +0700 +07	deployed	mongodb-15.6.1	7.0.11