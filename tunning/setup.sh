#!/bin/bash
timedatectl set-timezone Asia/Ho_Chi_Minh
ufw disable
apt -y update
apt -y upgrade
apt -y install gnupg curl gcc net-tools jq
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
apt -y update
apt -y install mongodb-org
systemctl start mongod
systemctl status mongod
systemctl enable mongod

mongosh mongodb://10.240.100.4

rs.initiate();
rs.status();
use admin;
db.createUser({ user: "admin", pwd: "vzo5p0ouqjvuppsran6omv", roles: ["root"] });
db.getUsers();
use demo;
db.createUser({ user: "demo", pwd: "7pv4dnq51u5b39gt5vgtbi", roles: [ { role: "readWrite", db: "demo" }] });
db.getUsers();

mkdir /root/mongo-security
cp keyfile.txt /root/mongo-security
chown -R mongodb:mongodb /root/mongo-security
chmod 400 /root/mongo-security/keyfile.txt

mongosh "mongodb+srv://admin:vzo5p0ouqjvuppsran6omv@cluster0.yanyicivic.com/?replicaSet=rs0&ssl=false"

tee /etc/apt/sources.list.d/pritunl.list << EOF
deb http://repo.pritunl.com/stable/apt jammy main
EOF
apt-key adv --keyserver hkp://keyserver.ubuntu.com --recv 7568D9BB55FF9E5287D586017AE645C0CF8E292A
curl https://raw.githubusercontent.com/pritunl/pgp/master/pritunl_repo_pub.asc | apt-key add -
apt -y install wireguard wireguard-tools
apt update
apt -y install pritunl


use pritunl
db.createUser({ user: "pritunl", pwd: "2anfsdfdg74564", roles: [ { role: "dbOwner", db: "pritunl" }] });
systemctl enable pritunl
systemctl start pritunl
pritunl set app.redirect_server false
pritunl set app.server_port 4443

apt -y install nginx
snap install --classic certbot

apt -y install fontconfig openjdk-17-jre
wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
apt -y update
apt -y install jenkins
systemctl enable jenkins

# Add Docker's official GPG key:
apt -y update
apt -y install ca-certificates curl
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  tee /etc/apt/sources.list.d/docker.list > /dev/null
apt -y update

apt -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl start docker
systemctl enable docker

kubectl apply -f https://raw.githubusercontent.com/stakater/Reloader/master/deployments/kubernetes/reloader.yaml