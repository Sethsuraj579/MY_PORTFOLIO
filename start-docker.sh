#!/bin/bash
cd /home/suraj/Desktop/protfolio
echo "Starting Docker containers..."
sudo docker compose down -v
sudo docker compose up --build
