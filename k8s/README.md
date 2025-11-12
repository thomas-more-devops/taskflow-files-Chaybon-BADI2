# TaskFlow Kubernetes Deployment

## Vereisten
- Kubernetes cluster (minikube of Docker Desktop)
- Docker images gebouwd

## Deploy

```bash
# Bouw images (voor minikube gebruikers)
eval $(minikube docker-env)
docker build -t taskflow-backend:1.0.0 ./backend
docker build -t taskflow-frontend:1.0.0 ./frontend

# Deploy naar Kubernetes
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml

# Verifieer
kubectl get all -n taskflow
```

## Toegang tot Applicatie

```bash
# Minikube
minikube service frontend-service -n taskflow --url

# Of port-forward
kubectl port-forward -n taskflow service/frontend-service 8080:80
```

## Handige Commando's

```bash
# Bekijk pods
kubectl get pods -n taskflow

# Bekijk logs
kubectl logs -n taskflow -l app=backend

# Schaal deployment
kubectl scale deployment backend --replicas=5 -n taskflow

# Verwijder alles
kubectl delete namespace taskflow
```

## Team Leden
- Chaybon Verlooy

## Ondervonden Problemen
- Niet van toepassing
