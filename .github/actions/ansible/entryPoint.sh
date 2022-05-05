#!/bin/sh
echo "Ansible Entrypoint"

echo "localhost ansible_user=aravindv" >> /hosts

echo "ansible_connection=ssh" >> /hosts
echo "ansible_user= $AZURE_SSH_USER" >> /hosts
echo "ansible_AZURE_SSH_USER= $AZURE_SSH_USER" >> /hosts
echo "ansible_python_interpreter=/usr/bin/python3.6" >> /hosts

echo "ansible_ssh_pass=$AZURE_SSH_PASSWORD" >> /hosts
echo "ansible_become_pass=$AZURE_SSH_PASSWORD" >> /hosts

echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user $AZURE_SSH_USER