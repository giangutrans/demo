#!/bin/bash

# Fail fast
set -e

BUILD_FOLDER=${1}
REGISTRY=${2}
IMAGE_NAME=${3}
TAG=${4}

echo "Verify if docker is installed & running"
which docker > /dev/null && docker ps > /dev/null || { echo 'ERROR: docker is not running' ; exit 1; }

echo "Connect to Azure Container Registry"
az acr login --name "${REGISTRY}"
# or
# docker login myregistry.azurecr.io

echo "Running ${IMAGE_NAME} from ${BUILD_FOLDER}/Dockerfile"

echo "Build image"
echo build -t "${REGISTRY}".azurecr.io/"${IMAGE_NAME}"/"${TAG}" "${BUILD_FOLDER}"
docker build -t "${REGISTRY}".azurecr.io/"${IMAGE_NAME}"/"${TAG}" "${BUILD_FOLDER}"

echo "Push image (latest and random generated)"
docker push "${REGISTRY}".azurecr.io/"${IMAGE_NAME}"/"${TAG}"