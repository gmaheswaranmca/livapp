# 🧹 Full Kubernetes Cleanup (Minikube Setup)

## ✅ 1. Stop the Minikube Cluster

This safely shuts down Kubernetes.

```bash
minikube stop
```

---

## ✅ 2. Delete the Cluster (IMPORTANT)

This removes:

* Pods
* Services (your `hello` service too)
* VM / container created by Minikube

```bash
minikube delete
```

👉 If you had multiple profiles:

```bash
minikube profile list
minikube delete -p <profile-name>
```

---

## ✅ 3. Remove Kubernetes Config (Optional but Clean)

Kubernetes context remains in your system. Clean it:

```bash
kubectl config delete-context minikube
kubectl config delete-cluster minikube
kubectl config delete-user minikube
```

---

## ✅ 4. Remove Local Kubernetes Files

```bash
rm -rf ~/.kube
rm -rf ~/.minikube
```

👉 If you want **full reset**, this is important.

---

## ✅ 5. Uninstall Tools (Optional)

### 🔹 Remove Minikube

```bash
sudo rm -f /usr/local/bin/minikube
```

### 🔹 Remove kubectl

```bash
sudo rm -f /usr/local/bin/kubectl
```

---

## ✅ 6. Clean Docker (VERY IMPORTANT in your case)

Since Minikube used Docker:

### Remove unused containers/images

```bash
docker system prune -a
```

👉 This removes:

* Kubernetes images
* Containers
* Networks

⚠️ Warning: removes ALL unused Docker resources

---

## ✅ 7. Verify Cleanup

```bash
kubectl get nodes
```

Expected:

```
The connection to the server localhost:8080 was refused
```

Also:

```bash
minikube status
```

Expected:

```
minikube: Stopped or not found
```

---

# 🎯 Quick Summary (Teach your students like this)

1. `minikube stop`
2. `minikube delete`
3. Remove configs (`~/.kube`, `~/.minikube`)
4. Optional: uninstall tools
5. Clean Docker

---

# ⚡ Pro Tip

When learning:

* Always know 👉 **Minikube = disposable cluster**
* Best practice:

  ```bash
  minikube delete && minikube start
  ```

  (fresh environment every time)
