# Steps to setup mongo cloud
- Create cluster "Cluster0" with Free Tier, AWS Cloud.
- Create DB User "mahesh" Password "1234"
- Add "IP Access List" IPv4 Anywhere ie IP Access Entry: 0.0.0.0/0 
```
Fill it here.
```

# Steps to create key pair file in AWS EC2 Work Area
- for connecting to instance via ssh to execute remote commands
- or for file upload / download via scp
- name: trainer_fs_apps_key, type:RSA, file format:.pem
```
1. Be in AWS Management Console 
2. Search "EC2" 
3. Goto "EC2" work area
   Region: Asia Pacific (Mumbai)
4. "EC2 Left Side Menu Bar" -> Network and Security -> Key Pairs
5. Give "Create Key Pair" 
6. We will be in "Create key pair" Page
7. Details of "key pair", we will provide here:
    Name: trainer_fs_apps_key
    Key pair type: RSA
    Private key file format: .pem (For use with OpenSSH)
8. Give "Create key pair"
    "Successfully created key pair" message we will get.

    "trainer_fs_apps_key.pem" is downloaded in the "Downloads" dir.
Final Step:
Goto "key pair" List page and Check.
```

# Steps to create security groups in AWS EC2 Work Area
- for allowing instances to allow inboud traffic for the port numbers
- backend app: 
  - Region: Asia Pacific (Mumbai)
  - name: backend_server_sg
  - PORTS: SSH, HTTP, TCP 5000
```
1. Be in AWS Management Console 
2. Search "EC2" 
3. Goto "EC2" work area
   Region: Asia Pacific (Mumbai)
4. "EC2 Left Side Menu Bar" -> Network and Security -> Security Groups
5. Give "Create security group" 
    Details of "ecurity group", we will provide here:
        Security group name: backend_server_sg
        Description: for backend server
        VPC: default
    Inbound rules -> Add rules
        i. Type: SSH, Protocol:TCP, Port:22, Source:Anywhere IPv4 ie 0.0.0.0/0
        Give "Add Rule"
        ii. Type: HTTP, Protocol:TCP, Port:80, Source:Anywhere IPv4 ie 0.0.0.0/0
        Give "Add Rule"
        iii. Type: Custom TCP, Protocol:TCP, Port:5000, Source:Anywhere IPv4 ie 0.0.0.0/0
6. Give "Create Security Group" 
    !"Security group (sg-00000xxx0x0004xx8 | backend_server_sg) was created successfully" 
    message we will get.
Final Step:
Goto "Security Group" List page and Check.
```
- frontend app: 
  - Region: Asia Pacific (Mumbai)
  - name: frontend_server_sg
  - PORTS: SSH, HTTP, TCP 5173
```
1. Be in AWS Management Console 
2. Search "EC2" 
3. Goto "EC2" work area
   Region: Asia Pacific (Mumbai)
4. "EC2 Left Side Menu Bar" -> Network and Security -> Security Groups
5. Give "Create security group" 
    Details of "ecurity group", we will provide here:
        Security group name: frontend_server_sg
        Description: for fronend server
        VPC: default
    Inbound rules -> Add rules
        i. Type: SSH, Protocol:TCP, Port:22, Source:Anywhere IPv4 ie 0.0.0.0/0
        Give "Add Rule"
        ii. Type: HTTP, Protocol:TCP, Port:80, Source:Anywhere IPv4 ie 0.0.0.0/0
        Give "Add Rule"
        iii. Type: Custom TCP, Protocol:TCP, Port:5173, Source:Anywhere IPv4 ie 0.0.0.0/0
6. Give "Create Security Group" 
    !"Security group (sg-00000xxx0x0004xx8 | frontend_server_sg) was created successfully" 
    message we will get.
Final Step:
Goto "Security Group" List page and Check.
```


# Steps to setup backend_server (EC2) in AWS
- Create "backend_server" instance 
- EC2, Ubuntu, 64-bit (x86), t3.micro, 8 GB volume
- Region: Asia Pacific (Mumbai) 
- key: trainer_fs_apps_key
- security group: backend_server_sg

Instance Setup:
```
1. Be in AWS Management Console 
2. Search "EC2" 
3. Goto "EC2" work area
   Region: Asia Pacific (Mumbai)
4. "EC2 Left Side Menu Bar" -> Instances List
5. Give "Launch Instances"
6. We will be in "Launch EC2 Instances" Page
    Details of EC2, we will provide here:
    Number of Instances: 1
    a. Under "Name and tags" 
       Name: backend_server
    b. Under "Application and OS Images (Amazon Machine Image)" section
       AMI: Ubuntu
       Architecture: 64-bit (x86) (by default)
    d. Under "Instance type" section (by default)
        Instance Type: t3.micro (Free Tier)
    e. Under "Key pair (login)" section 
        Key pair name - required: trainer_fs_apps_key
    f. Under "Network settings"section
        Firewall (security groups) -> Select existing security group
        Common security groups: backend_server_sg
        !Check vpc of security group and vpc of instance are same
    g. Under "Configure storage" (by default)
        1 x [8] GiB gp3 Free tier eligible 
        Root volume, 3000 IOPS, Not encrypted
    h. Advanced details
        Not Applicable
    i. Check the Summary all the details are correct
7. Give "Launch Instance"
8. "Successfully initiated launch of instance (i-idOfEc2)" message we will get.
Final Step:
Goto "Instances" List page and Check.
Under instance "backend_server" state should be "Running".
Till we get "Running" state, we will wait.
```

ssh Connect to Instances
```
1. EC2 Left Side Menu Bar -> Instances
2. Select Instance -> Give "Connect" -> Goto "SSH client" 
   --Or--
   Go inside Instance -> Give "Connect" -> Goto "SSH client"

   Copy the link under example:
   ssh -i "trainer_fs_apps_key.pem" ubuntu@ec2-3-111-246-74.ap-south-1.compute.amazonaws.com
3. Open the terminal under "Downloads" dir. Give the ssh command. 
   It will connect to instance using ssh.
   If you are not getting connected, fix using document "03-error-ssh-connect.md"
4. Now, we can run the commands in ssh.
```

Setup runtime and deploy the app and run the app:
```bash
# Update ubuntu
sudo apt update
sudo apt upgrade -y

# Install node
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Check Node installed
node -v
npm -v

# Install git
sudo apt install git -y

# Check git intalled or not
git --version

# Clone front app
git clone https://github.com/gmaheswaranmca/mern-trainer-app.git

ls 

# go to repo dir
cd mern-trainer-app

# Fetch all branches
git fetch --all

# Check available branches
git branch -a

# Switch to feature branch ie backend ie arch01be
git checkout arch01be

# Verify
git branch

# Go to backend dir
cd backend

# install dependencies
npm install
```

Open Remote git dir in vsc:
```text
Open VS Code 
-> Install:
    Remote - SSH
    from Microsoft
-> Press Ctrl + Shift + P
-> Select:
    Remote-SSH: Connect to Host

    Give ssh connection str
    ie 
    ssh -i "C:\Users\gmahe\Downloads\trainer_fs_apps_key.pem" ubuntu@ec2-3-111-246-74.ap-south-1.compute.amazonaws.com

Ctrl + Shift + P
->Remote-SSH: Connect to Host
-> Choose your EC2
    OpenFolder
        Linux
        Give path
        ie /home/ubuntu/mern-trainer-app
        Now the remote dir is opened in another vsc instance

    Add .env file to backend dir
---
PORT=5000
MONGO_URL=mongodb://mahesh:1234@ac-xzdk4sr-shard-00-00.54ofwxy.mongodb.net:27017,ac-xzdk4sr-shard-00-01.54ofwxy.mongodb.net:27017,ac-xzdk4sr-shard-00-02.54ofwxy.mongodb.net:27017/trainer_app_db?ssl=true&replicaSet=atlas-gncgrb-shard-0&authSource=admin&appName=Cluster0
---
```

Connect to instance and run the backend app:
```bash
# if err in node server.js
rm -rf node_modules package-lock.json

# then install node dependencies
npm install

# install pm2 if not installed
sudo npm install pm2 -g

# run the backend app using pm2
pm2 start server.js

# check the server is running in pm2
pm2 list

# to delete the service 
pm2 delete server

# to see the logs of service
pm2 logs server
Cltr+C
```

Open the below url in browser
```txt
http://13.201.69.167:5000/trainers
```

It should print the array of trainers in the browser.

# Steps to setup fronend_server (EC2) in AWS
- Create "frontend_server" instance 
- EC2, Ubuntu, 64-bit (x86), t3.micro, 8 GB volume
- Region: Asia Pacific (Mumbai) 
- key: trainer_fs_apps_key
- security group: frontend_server_sg

Instance Setup:
```
1. Be in AWS Management Console 
2. Search "EC2" 
3. Goto "EC2" work area
   Region: Asia Pacific (Mumbai)
4. "EC2 Left Side Menu Bar" -> Instances List
5. Give "Launch Instances"
6. We will be in "Launch EC2 Instances" Page
    Details of EC2, we will provide here:
    Number of Instances: 1
    a. Under "Name and tags" 
       Name: frontend_server
    b. Under "Application and OS Images (Amazon Machine Image)" section
       AMI: Ubuntu
       Architecture: 64-bit (x86) (by default)
    d. Under "Instance type" section (by default)
        Instance Type: t3.micro (Free Tier)
    e. Under "Key pair (login)" section 
        Key pair name - required: trainer_fs_apps_key
    f. Under "Network settings"section
        Firewall (security groups) -> Select existing security group
        Common security groups: frontend_server_sg
        !Check vpc of security group and vpc of instance are same
    g. Under "Configure storage" (by default)
        1 x [8] GiB gp3 Free tier eligible 
        Root volume, 3000 IOPS, Not encrypted
    h. Advanced details
        Not Applicable
    i. Check the Summary all the details are correct
7. Give "Launch Instance"
8. "Successfully initiated launch of instance (i-idOfEc2)" message we will get.
Final Step:
Goto "Instances" List page and Check.
Under instance "frontend_server" state should be "Running".
Till we get "Running" state, we will wait.
```

ssh Connect to Instances
```
1. EC2 Left Side Menu Bar -> Instances
2. Select Instance -> Give "Connect" -> Goto "SSH client" 
   --Or--
   Go inside Instance -> Give "Connect" -> Goto "SSH client"

   Copy the link under example:
   ssh -i "trainer_fs_apps_key.pem" ubuntu@ec2-65-0-104-86.ap-south-1.compute.amazonaws.com
3. Open the terminal under "Downloads" dir. Give the ssh command. 
   It will connect to instance using ssh.
   If you are not getting connected, fix using document "03-error-ssh-connect.md"
4. Now, we can run the commands in ssh.
```

Setup runtime and deploy the app and run the app:
```bash
# Update ubuntu
sudo apt update
sudo apt upgrade -y

# Install node
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Check Node installed
node -v
npm -v

pkill node

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc

nvm install 20
nvm use 20

# Install git
sudo apt install git -y

# Check git intalled or not
git --version

# Clone front app
git clone https://github.com/gmaheswaranmca/mern-trainer-app.git

ls 

# go to repo dir
cd mern-trainer-app

# Fetch all branches
git fetch --all

# Check available branches
git branch -a

# Switch to feature branch ie frontend ie arch01fe
git checkout arch01fe

# Verify
git branch

# Go to backend dir
cd frontend

# install dependencies
npm install
```

Connect to instance and run the backend app:
```bash
# then install node dependencies
npm install
npm run build

# install nginx
sudo apt update
sudo apt install nginx -y

# delete contents nginx "html" dir and copy "dist" dir contents to nginx "html" dir
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/

# edit nginx configuration
sudo nano /etc/nginx/sites-available/default

---
server {
    listen 80;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000;  # your backend port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
---

# restart the nginx
sudo systemctl restart nginx
```

Open the below url in browser
```txt
http://43.205.196.154/

This will display the list of trainers and we can add trainer as well.
```

# Clean up
```
1. Delete ec2 instances
2. Delete security groups
3. Delete key pair 
```