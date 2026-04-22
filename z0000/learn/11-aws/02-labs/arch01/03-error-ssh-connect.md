# Error in connecting to instance using "ssh"

The below error I got during connecting via ssh to instance
```
PS C:\Users\gmahe\Downloads> ssh -i "trainer_fs_apps_key.pem" ubuntu@ec2-3-111-246-74.ap-south-1.compute.amazonaws.com
The authenticity of host 'ec2-3-111-246-74.ap-south-1.compute.amazonaws.com (64:ff9b::36f:f64a)' can't be established.
ECDSA key fingerprint is SHA256:YS63SAVtPLhXQ+o/1Y1rvPKqfh8/9vkcED6as8nJGTA.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'ec2-3-111-246-74.ap-south-1.compute.amazonaws.com,64:ff9b::36f:f64a' (ECDSA) to the list of known hosts.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions for 'trainer_fs_apps_key.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "trainer_fs_apps_key.pem": bad permissions
ubuntu@ec2-3-111-246-74.ap-south-1.compute.amazonaws.com: Permission denied (publickey).
PS C:\Users\gmahe\Downloads>
```

Fix it
```
1. Right click key file
Check each user 
    SYSTEM
    Codex Sandbox Users
    Maheswaran Govindaraju
    Administrators

Is there full permissions 
    ie "Full Control", "Modify", "Read & execute", "Read", "Write" are in tick. 
    "Special Permissions" is not required.

For me, "Codex Sandbox Users" only I didnot have the above permissions.
Now, we will apply the below for this user.
Give "Advanced"
Select "Codex Sandbox Users" user
Give "Disable Inheritance"
    Give "Convert inherited permissions into explicit permissions on this object."
Select again "Codex Sandbox Users" user
    Give "Remove"
Give "Apply"
Give "Okay"

We have to repeat it for all the users having not full permissions.

Now check the ssh connection with constr, it will connect.
```