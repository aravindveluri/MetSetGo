#!/bin/sh
echo "Ansible Entrypoint"

# Debug
printenv
echo "Files list"
ls -al
echo "Github workspace debug"
ls /github/workspace



echo "[azure]" >> /hosts
echo "20.205.22.244 ansible_connection=ssh ansible_user=$AZURE_SSH_USER ansible_ssh_user=$AZURE_SSH_USER ansible_python_interpreter=/usr/bin/python3.8 ansible_ssh_pass=$AZURE_SSH_PASSWORD ansible_become_pass=$AZURE_SSH_PASSWORD" >> /hosts

echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user $AZURE_SSH_USER
