# 🧠 What is WSL?

**WSL = Windows Subsystem for Linux**

It lets you run a **Linux environment directly inside Windows** — without installing Linux separately or using a heavy virtual machine.

👉 Think of it like:

```
Windows OS
   ↓
WSL (Linux layer)
   ↓
Ubuntu / Debian / etc.
```

---

# ❓ Why WSL when we already have Windows?

Windows is great for:

* GUI apps
* Office tools
* Gaming

But many **development tools are built for Linux first**.

### 🔥 Problems without WSL:

* Node.js, Python tools behave slightly differently
* Docker works better on Linux
* Bash scripting not native in Windows
* Package managers (apt) missing

---

# 🚀 Why Developers Use WSL

### 1. ✅ Real Linux environment (inside Windows)

* Same as server/cloud (AWS, Azure, GCP)
* No “works on my machine” issues

---

### 2. ✅ Better for backend & DevOps tools

* Docker runs natively (WSL2 backend)
* Kubernetes tools work smoothly
* Nginx, MySQL, Redis → easier

---

### 3. ✅ Faster than Virtual Machines

* No heavy RAM/CPU overhead like VirtualBox/VMware

---

### 4. ✅ Dual power (Windows + Linux)

* Use Windows apps + Linux tools together

Example:

```
VS Code (Windows)
   ↔
WSL (Ubuntu terminal)
```

---

### 5. ✅ Same environment as cloud

What you run in WSL ≈ what runs in:

* AWS EC2 (Linux)
* Azure VM
* Docker containers

---

# ⚙️ WSL Versions

### 🔹 WSL1

* Lightweight
* Not full Linux kernel

### 🔹 WSL2 (Recommended ✅)

* Real Linux kernel
* Better performance
* Required for Docker

---

# 🧱 Typical Architecture (Your Case)

You are already doing something like this:

```
Windows
  ↓
WSL (Ubuntu)
  ↓
Docker
  ↓
Containers (Node, Python, DB)
```

👉 This is **modern dev setup**

---

# ⚠️ Limitations of WSL

### 1. ❌ Not full OS like real Linux

* No full systemd (though improved recently)
* Some services behave differently

---

### 2. ❌ Networking quirks

* Each WSL instance has its own IP
* Ports need mapping

---

### 3. ❌ File system differences

* Accessing Windows files from WSL is slower
* Best practice:

  ```
  Work inside /home (Linux filesystem)
  ```

---

### 4. ❌ GUI apps limited (but improving)

* Now possible (WSLg), but not perfect

---

### 5. ❌ Hardware limitations

* Direct GPU/USB access limited (though improving)

---

### 6. ❌ Multiple distros complexity

Since you created:

```
Ubuntu-Gateway
Ubuntu-Node
Ubuntu-Python
Ubuntu-DB
```

👉 Each one:

* Has separate filesystem
* Has separate IP
* Needs networking setup

---

# 🆚 WSL vs Virtual Machine

| Feature        | WSL2 ✅  | VM ❌   |
| -------------- | ------- | ------ |
| Speed          | Fast    | Slower |
| RAM usage      | Low     | High   |
| Startup        | Instant | Slow   |
| Linux kernel   | Yes     | Yes    |
| Full isolation | No      | Yes    |

---

# 🧠 When SHOULD you use WSL?

✅ Use WSL if:

* You are doing **web/backend development**
* Using **Docker/Kubernetes**
* Learning **Linux/DevOps**
* Working with **Node, Python, MySQL**

---

# 🚫 When NOT needed?

❌ Not needed if:

* Only doing C#/Windows apps
* Only using GUI tools
* Very low-end system (WSL2 needs some RAM)

---

# 🔥 Simple Real-Life Analogy

* Windows = Office desk 🖥️
* WSL = Workshop 🔧
* Docker = Machines inside workshop ⚙️

You sit at your desk but do heavy work in the workshop.

```
```
# To list the Linux distributions available for installation on WSL from the Microsoft Store
open PowerShell or Command Prompt and run the command:
``` bash
wsl --list --online
# or
wsl -l --online
```

# Available Linux Distributions (with LTS versions) 
```
The following are some of the popular Linux distributions available for WSL, including their Long Term Support (LTS) versions where applicable: 


Ubuntu: Offers several LTS versions, which are very popular on WSL.
    Ubuntu 24.04 LTS
    Ubuntu 22.04 LTS
    Ubuntu 20.04 LTS
    Ubuntu 18.04 LTS

Debian: Available as Debian GNU/Linux.

Kali Linux: Available as Kali Linux Rolling.

openSUSE:
    openSUSE Tumbleweed (rolling release)
    openSUSE Leap 15.6 (LTS-like)

SUSE Linux Enterprise Server:
    SUSE Linux Enterprise 15 SP6
    SUSE Linux Enterprise Server 12 SP5

Oracle Linux:
    Oracle Linux 9 (various point releases)
    Oracle Linux 8 (various point releases)
    Oracle Linux 7.9

AlmaLinux OS: AlmaLinux OS 9 and 8.

Arch Linux: Available as Arch WSL. 
 ```

# to Check Installed Distributions and WSL Version

``` bash
wsl --list --verbose
# or
wsl -l -v
```

```
```

# ✅ Method 1: Install Ubuntu-22.04 via Command (Best & Fast 🔥)

Open **PowerShell (Admin recommended)** and run:

```bash
wsl --install -d Ubuntu-22.04
```

👉 This will:

* Enable WSL (if not already)
* Download Ubuntu 22.04 LTS
* Install it automatically

---

### 📌 After installation:

* It will open Ubuntu terminal
* Ask you to create:

  * Username
  * Password

---

# ✅ Method 2: Install Ubuntu-22.04 via Microsoft Store

### Steps:

1. Open **Microsoft Store**
2. Search:
   👉 **Ubuntu 22.04 LTS**
3. Click **Install**
4. Launch after install

---

# 🧠 Verify Installation

Run:

```bash
wsl -l -v
```

👉 Example output:

```bash
NAME            STATE     VERSION
Ubuntu-22.04    Stopped   2
```

---

# ⚙️ Set as Default (Optional)

```bash
wsl --set-default Ubuntu-22.04
```


```
```

# **Clone one WSL distro into multiple instances** (Node, Python, DB, etc.)

This is done using **export → import**.

---

# 🧱 Overall Idea

```text
Ubuntu-22.04 (base)
        ↓ export
      base.tar
        ↓ import
Ubuntu-Node / Ubuntu-Python / Ubuntu-DB
```

---

# ✅ Step-by-Step (Clean & Correct)

## 🔹 Step 1: Ensure base distro is ready

```bash
wsl -l -v
```

👉 Example:

```
Ubuntu-22.04
```

---

## 🔹 Step 2: Export base distro

```bash
wsl --export Ubuntu-22.04 D:\WSL\base.tar
```

👉 This creates a full snapshot

---

## 🔹 Step 3: Import as new distro (Clone)

### 🔸 Ubuntu-Node

```bash
wsl --import Ubuntu-Node D:\WSL\Node D:\WSL\base.tar
```

---

### 🔸 Ubuntu-Python

```bash
wsl --import Ubuntu-Python D:\WSL\Python D:\WSL\base.tar
```

---

### 🔸 Ubuntu-DB

```bash
wsl --import Ubuntu-DB D:\WSL\DB D:\WSL\base.tar
```

---

## 🔹 Step 4: Verify

```bash
wsl -l -v
```

👉 Output:

```
Ubuntu-22.04
Ubuntu-Node
Ubuntu-Python
Ubuntu-DB
```

---

## 🔹 Step 5: Start any distro

```bash
wsl -d Ubuntu-Node
```

---

# ⚠️ Important Things (Very Important)

## 1. Default user issue ❗

Imported distros **start as root**

👉 Fix inside each distro:

```bash
adduser devuser
usermod -aG sudo devuser
```

Then set default user:

```bash
ubuntu config --default-user devuser
```

⚠️ For imported distros, use:

```bash
wsl -d Ubuntu-Node -u devuser
```

(Or create `/etc/wsl.conf` if needed)

---

## 2. Each distro is isolated

* Separate filesystem ✅
* Separate packages ✅
* Separate IP ✅

---

## 3. Storage locations

You used:

```
D:\WSL\Node
D:\WSL\Python
D:\WSL\DB
```

👉 Good practice ✔️

---

## 4. You can delete base later (optional)

```bash
wsl --unregister Ubuntu-22.04
```

(Only after cloning!)

---

# 🚀 Best Practice (For Your Architecture)

## 🔥 Prepare base BEFORE export

Inside **Ubuntu-22.04**:

```bash
sudo apt update
sudo apt install -y curl git vim
```

👉 Then export

So all clones already have:

* common tools
* same configuration

---

# 🧠 Real Dev Setup (Your Goal)

```text
Ubuntu-Gateway → Nginx
Ubuntu-Node    → Node backend
Ubuntu-Python  → Flask API
Ubuntu-DB      → MySQL/Postgres
```

👉 You are basically simulating:
**Microservices architecture locally**

---

# ⚡ Bonus: Rename Distro (if needed)

WSL doesn’t support rename directly ❌

👉 Trick:

* Export → Import with new name → Delete old

---

# 💡 Pro Tip

Keep a clean base:

```
base.tar (gold image)
```

Reuse anytime instead of reinstalling Ubuntu

---

# 🎯 Summary

✔ Export base distro
✔ Import multiple clones
✔ Each clone = independent Linux system
✔ Perfect for microservices + Docker + teaching

```
```

By default, when you run:

```
wsl --install -d Ubuntu-22.04
```

👉 It **does NOT install into `D:\WSL`**
👉 It installs into your **C: drive** (inside a hidden VHD file)

---

## 📦 Default Size Requirements

### 🔹 Initial Install Size

* ~ **1.5 GB – 2 GB** (fresh Ubuntu image)

### 🔹 After First Setup (updates, packages)

* ~ **3 GB – 5 GB**

### 🔹 During Development (realistic usage)

* With tools (Node, Python, Docker, etc.):

  * **10 GB – 25 GB** easily

---

## 📁 Important: It Uses a Virtual Disk (VHDX)

WSL stores Ubuntu as a file like:

```
C:\Users\<your-user>\AppData\Local\Packages\...\ext4.vhdx
```

👉 This file:

* **Grows automatically**
* Can expand up to **hundreds of GB** if needed

---

## ⚠️ If You Want Installation in `D:\WSL`

You **CANNOT control location using `wsl --install`**

Instead, you must:

### ✔️ Correct Approach (Manual Import)

1. Install once (temporary)
2. Export it:

   ```
   wsl --export Ubuntu-22.04 ubuntu.tar
   ```
3. Import into D:

   ```
   wsl --import Ubuntu-22.04 D:\WSL\Ubuntu-22.04 ubuntu.tar
   ```
4. Remove original:

   ```
   wsl --unregister Ubuntu-22.04
   ```

---

## 💾 Recommended Disk Planning

For your use case (DevOps / ML / Containers):

| Use Case                   | Recommended Space |
| -------------------------- | ----------------- |
| Basic learning             | 10 GB             |
| Full-stack dev             | 20–30 GB          |
| Docker + multiple services | 40–60 GB          |

---

## 💡 Pro Tips (Very Important)

* Keep WSL in **D: drive** → saves your C: space
* Docker images can consume **huge storage**
* You can also:

  ```
  wsl --shutdown
  optimize-vhd
  ```

  to reclaim space later

---

## ✅ Simple Answer

👉 Minimum required: **~2 GB**
👉 Practical usage: **10–30 GB+**

```
```

