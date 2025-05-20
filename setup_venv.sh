#!/bin/bash
# Setup Python venv and install dependencies for this project

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

echo "Virtual environment setup complete. Activate with: source venv/bin/activate"
