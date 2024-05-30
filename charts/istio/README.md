# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation fluxcd
2.	Create the Istio HelmRepository custom resource
3.	Create istio base and istiod
4.	Create Istio gateway
5.  Checking
# Build and Test
1. Installation fluxcd
    ```
    $ flux check --pre
    ► checking prerequisites
    ✔ Kubernetes 1.24.6 >=1.20.6-0
    ✔ prerequisites checks passed

    $ flux install
    ✚ generating manifests
    ✔ manifests build completed
    ► installing components in flux-system namespace
    CustomResourceDefinition/alerts.notification.toolkit.fluxcd.io created
    CustomResourceDefinition/buckets.source.toolkit.fluxcd.io created
    CustomResourceDefinition/gitrepositories.source.toolkit.fluxcd.io created
    CustomResourceDefinition/helmcharts.source.toolkit.fluxcd.io created
    CustomResourceDefinition/helmreleases.helm.toolkit.fluxcd.io created
    CustomResourceDefinition/helmrepositories.source.toolkit.fluxcd.io created
    CustomResourceDefinition/kustomizations.kustomize.toolkit.fluxcd.io created
    CustomResourceDefinition/ocirepositories.source.toolkit.fluxcd.io created
    CustomResourceDefinition/providers.notification.toolkit.fluxcd.io created
    CustomResourceDefinition/receivers.notification.toolkit.fluxcd.io created
    Namespace/flux-system created
    ServiceAccount/flux-system/helm-controller created
    ServiceAccount/flux-system/kustomize-controller created
    ServiceAccount/flux-system/notification-controller created
    ServiceAccount/flux-system/source-controller created
    ClusterRole/crd-controller-flux-system created
    ClusterRoleBinding/cluster-reconciler-flux-system created
    ClusterRoleBinding/crd-controller-flux-system created
    Service/flux-system/notification-controller created
    Service/flux-system/source-controller created
    Service/flux-system/webhook-receiver created
    Deployment/flux-system/helm-controller created
    Deployment/flux-system/kustomize-controller created
    Deployment/flux-system/notification-controller created
    Deployment/flux-system/source-controller created
    NetworkPolicy/flux-system/allow-egress created
    NetworkPolicy/flux-system/allow-scraping created
    NetworkPolicy/flux-system/allow-webhooks created
    ◎ verifying installation
    ✔ helm-controller: deployment ready
    ✔ kustomize-controller: deployment ready
    ✔ notification-controller: deployment ready
    ✔ source-controller: deployment ready
    ✔ install finished

2. Create the Istio HelmRepository custom resource
    ```
    $ kubectl create ns istio-system istio-ingress
    namespace/istio-system created
    namespace/istio-ingress created

    $ kubectl apply -f ./helm-istio-repository.yaml
    helmrepository.source.toolkit.fluxcd.io/istio created

3. Create istio base and istiod
    ```
    $ kubectl apply -f ./helm-release-istio-base.yaml
    helmrelease.helm.toolkit.fluxcd.io/istio-base created

    $ kubectl apply -f ./helm-release-istiod.yaml
    helmrelease.helm.toolkit.fluxcd.io/istiod created

4. Create Istio gateway
    ```
    $ kubectl label ns istio-ingress istio-injection=enabled
    namespace/istio-ingress labeled

    $ kubectl apply -f ./helm-release-istio-gateway.yaml
    helmrelease.helm.toolkit.fluxcd.io/istio-ingress created

5. Checking
    ```
    $ helm ls -A
    NAME            NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
    istio-base      istio-system    1               2024-05-29 10:54:02.05622228 +0000 UTC  deployed        base-1.22.0     1.22.0   
    istio-ingress   istio-ingress   1               2024-05-29 10:56:15.299599438 +0000 UTC deployed        gateway-1.22.0   1.1.22.0   
    istiod          istio-system    1               2024-05-29 10:54:07.346954078 +0000 UTC deployed        istiod-1.22.0  1.1.22.0
    
    $ kubectl get hr -A
    NAMESPACE       NAME            AGE     READY   STATUS
    istio-ingress   istio-ingress   4m2s    True    Release reconciliation succeeded
    istio-system    istio-base      6m18s   True    Release reconciliation succeeded
    istio-system    istiod          5m50s   True    Release reconciliation succeeded