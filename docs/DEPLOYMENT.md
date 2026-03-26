# Deployment Guide – VEGA Ops Bench

## Runtime Model

VEGA Ops Bench is a static Angular application that can be delivered in two main ways:

1. static hosting of built assets
2. containerized delivery behind Nginx

## Option A – Static Hosting

Recommended for fast delivery.

### AWS

- build the Angular application
- upload the build output to S3
- expose it through CloudFront

### Azure

- publish the build output to Azure Static Web Apps or Blob Storage + CDN

### GCP

- publish the build output to Cloud Storage + Cloud CDN

## Option B – Container Hosting

Recommended when the organization prefers container pipelines.

### Build

Use the provided multi-stage Dockerfile to:

- install dependencies
- run production build
- copy the static result into Nginx

### Host Targets

- AWS ECS/Fargate
- Azure Container Apps
- Google Cloud Run
- Kubernetes clusters behind an ingress controller

## Kubernetes Path

The repository includes manifests under `infra/k8s/`:

- `deployment.yaml`
- `service.yaml`
- `ingress.yaml`

These manifests assume the image is already published to a registry and can be adapted to any managed Kubernetes environment.

## Production Notes

- keep API endpoints in environment-aware configuration
- enable immutable asset caching for hashed bundles
- terminate TLS at CDN or ingress
- prefer non-root containers
- use health checks and readiness probes for the containerized path

## Suggested Interview Framing

"I modeled the front end so it can be delivered either as a static Angular build or as a containerized Nginx image. For teams with a platform preference, I included Kubernetes manifests and documented cloud deployment options without coupling the application to a specific provider."
