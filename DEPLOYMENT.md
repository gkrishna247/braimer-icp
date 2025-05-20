# Deployment Guide for AWS EC2 (Python venv)

## 1. Launch EC2 Instance
- Use an Amazon Linux 2 or Ubuntu instance (t2.micro or larger recommended).
- Allow inbound ports 22 (SSH) and 5000 (Flask default) in your security group.

## 2. Connect to EC2
```
ssh -i <your-key.pem> ec2-user@<your-ec2-public-dns>
```

## 3. Install Python 3 and venv (if not present)
Amazon Linux 2:
```
sudo yum update -y
sudo yum install python3 -y
```
Ubuntu:
```
sudo apt update
sudo apt install python3 python3-venv python3-pip libgl1 -y
```

## 4. Clone/Upload Your Project
- Use `git clone` or upload files via SCP/SFTP.

## 5. Set Up Python Virtual Environment (Recommended: Use Provided Script)
You can use the provided setup script for convenience:
```
chmod +x setup_venv.sh
./setup_venv.sh
```
Or do it manually:
```
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

## 6. Run the App (Recommended: Use Provided Script)
You can use the provided start script:
```
chmod +x start.sh
./start.sh
```
Or run manually:
```
python app.py
```

## 7. (Optional) Run in Background
```
nohup python app.py &
```

---

## How to Use .sh Files
1. Make the script executable:
   ```
   chmod +x scriptname.sh
   ```
2. Run the script:
   ```
   ./scriptname.sh
   ```
Replace `scriptname.sh` with `setup_venv.sh` or `start.sh` as needed.

---

## Notes
- If your app runs on a different port, update the security group and Flask config.
- For production, consider using a process manager (e.g., `gunicorn`, `supervisor`) and a reverse proxy (e.g., Nginx).
