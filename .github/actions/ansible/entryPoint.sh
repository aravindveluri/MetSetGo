#!/bin/sh
echo "Ansible Entrypoint"

echo "[azure]" >> /hosts
<<<<<<< HEAD
echo "20.205.22.244 ansible_connection=ssh ansible_user=$AZURE_SSH_USER ansible_ssh_user=$AZURE_SSH_USER ansible_python_interpreter=/usr/bin/python3.6 ansible_ssh_pass=$AZURE_SSH_PASSWORD ansible_become_pass=$AZURE_SSH_PASSWORD" >> /hosts

=======
echo "20.205.22.244" >> /hosts

echo "ansible_connection=ssh" >> /hosts
echo "ansible_user= $AZURE_SSH_USER" >> /hosts
echo "ansible_ssh_user= $AZURE_SSH_USER" >> /hosts
echo "ansible_python_interpreter=/usr/bin/python3.6" >> /hosts

echo "ansible_ssh_pass=$AZURE_SSH_PASSWORD" >> /hosts
echo "ansible_become_pass=$AZURE_SSH_PASSWORD" >> /hosts
cat /hosts
>>>>>>> badfce8b8065fb125ecac11ff2a5382247806ac3
echo "Entering the ansible using ansible-playbook"

ansible-playbook ansible/playbook.yml --user $AZURE_SSH_USER
