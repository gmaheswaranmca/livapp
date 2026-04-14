# **To directly open a remote directory over SSH in VS Code**
---

## ✅ Recommended Way: Use **Visual Studio Code Remote - SSH Extension**

### 🔧 Step 1: Install Extension

In VS Code:

* Go to Extensions (`Ctrl + Shift + X`)
* Search → **Remote - SSH**
* Install it

---

### 🔧 Step 2: Connect to Server

Press:

```
Ctrl + Shift + P
```

Type:

```
Remote-SSH: Connect to Host
```

Then enter:

```bash
ssh -i "your-key.pem" ubuntu@your-server-ip
```

Example:

```bash
ssh -i "trainer_server_second_key.pem" ubuntu@ec2-13-201-88-68.ap-south-1.compute.amazonaws.com
```

---

### 🔧 Step 3: Open Remote Folder

Once connected:

* VS Code will open a new window
* Click:

```
File → Open Folder
```

* Choose your remote directory (e.g. `/home/ubuntu/project`)

---

## ⚡ Optional (Better Setup): SSH Config File

Instead of typing command every time:

Edit:

```
C:\Users\<your-username>\.ssh\config
```

Add:

```bash
Host myserver
    HostName ec2-13-201-88-68.ap-south-1.compute.amazonaws.com
    User ubuntu
    IdentityFile C:\Users\<your-username>\Downloads\trainer_server_second_key.pem
```

Now just connect using:

```
Remote-SSH: Connect to Host → myserver
```

---

## ⚠️ Common Issues (You already faced one)

### 🔴 "Permissions too open"

Fix:

```bash
chmod 400 trainer_server_second_key.pem
```

On Windows (PowerShell):

```powershell
icacls trainer_server_second_key.pem /inheritance:r
icacls trainer_server_second_key.pem /grant:r "$($env:USERNAME):(R)"
```

---

## 🚀 Benefits (Why this is powerful)

* Edit files **directly on server**
* No need to `scp` or zip/unzip
* Run terminal on remote
* Perfect for your:

  * MERN apps
  * Flask APIs
  * AWS EC2 deployments

---

## 🧠 Pro Tip (for your setup)

Since you're using EC2 + Vite + Node:

* Open project via SSH
* Run:

```bash
npm run dev -- --host
```

* Access from LAN or browser
