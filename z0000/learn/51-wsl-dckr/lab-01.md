# Lab 1

```
1. Install the Ubuntu (Latest LTS dist) using Microsoft Store 
2. Check is it installed by listing the distributions and login to distribution
3. Check the version of Ubuntu installed within the ubuntu
4. Export "Ubuntu" as D:\WSL\Downloads\ubuntu2404lts.tar
5. Import "D:\WSL\Downloads\ubuntu2404lts.tar" as "ubuntu2404" into "D:\WSL\ubuntu2404"
6. Check is "ubuntu2404" installed by listing the distributions and login to distribution
7. Uninstall "Ubuntu" 
```


```bash

# Check the available dist in store
wsl -l --online

# Install using Microsoft store
    # Do it # New User Name / Password: mahesh/1234
 
# List Distributions
wsl -l -v

    PS D:\WSL\Downloads> wsl -l -v
    NAME      STATE           VERSION
    * Ubuntu    Running         2

# Login to Distribution
wsl -d Ubuntu
    PS D:\WSL\Downloads> wsl -d Ubuntu
    To run a command as administrator (user "root"), use "sudo <command>".
    See "man sudo_root" for details.

    mahesh@DESKTOP-E9TJ2O1:/mnt/d/WSL/Downloads$ exit 

# Export Distribution
wsl --export Ubuntu D:\WSL\Downloads\ubuntu2404lts.tar

# Install Distribution from tar
wsl --import ubuntu2404 D:\WSL\ubuntu2404 D:\WSL\Downloads\ubuntu2404lts.tar

# Uninstall Distribution from tar
wsl --unregister Ubuntu

# Login to Distribution
wsl -d ubuntu2404
    # To know about installed ubuntu inside Distribution
    $ lsb_release -a
     
    root@DESKTOP-E9TJ2O1:/mnt/d/WSL/Downloads# lsb_release -a
    No LSB modules are available.
    Distributor ID: Ubuntu
    Description:    Ubuntu 24.04.1 LTS
    Release:        24.04
    Codename:       noble
    root@DESKTOP-E9TJ2O1:/mnt/d/WSL/Downloads#
```