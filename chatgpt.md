Para crear un clúster de alta disponibilidad en dos máquinas virtuales con Ubuntu en el contexto de tu trabajo, donde ambos servidores están ejecutando GNU/Linux y se requiere segmentación de red, enrutamiento dinámico, y el uso de un clúster de alta disponibilidad, los pasos que debes seguir se adaptan al diseño de tu infraestructura de red. Aquí tienes una guía paso a paso:

1. Configurar Máquinas Virtuales
Crea dos máquinas virtuales con Ubuntu Server en VirtualBox, VMware, o cualquier hipervisor que prefieras.
Asegúrate de que ambas máquinas virtuales estén en la misma red y que tengan conectividad IP entre ellas.
Configura los nombres de host:
bash
Copiar código
sudo hostnamectl set-hostname nodo1  # En la primera VM
sudo hostnamectl set-hostname nodo2  # En la segunda VM
2. Instalar Pacemaker y Corosync
Pacemaker y Corosync son componentes clave para el clúster. Pacemaker gestiona los recursos y Corosync maneja la comunicación entre los nodos.

En Ubuntu (en ambos nodos):

bash
Copiar código
sudo apt update
sudo apt install pacemaker corosync
Después de la instalación, habilita e inicia los servicios:
bash
Copiar código
sudo systemctl enable pacemaker corosync
sudo systemctl start pacemaker corosync
3. Configurar Corosync para Comunicación entre Nodos
Corosync necesita un archivo de configuración que defina la comunicación entre ambos nodos. El archivo de configuración está en /etc/corosync/corosync.conf.

Modifica el archivo corosync.conf en ambos nodos para que incluyan las direcciones IP de cada nodo y la clave de autenticación.
Un ejemplo básico de corosync.conf:

bash
Copiar código
totem {
    version: 2
    secauth: off
    cluster_name: UDICluster
    transport: udpu
    interface {
        ringnumber: 0
        bindnetaddr: 192.168.1.0  # Cambia por la red donde están las VMs
        mcastport: 5405
    }
}

nodelist {
    node {
        ring0_addr: nodo1
        nodeid: 1
    }

    node {
        ring0_addr: nodo2
        nodeid: 2
    }
}

quorum {
    provider: corosync_votequorum
    two_node: 1
}
Después de modificar corosync.conf, reinicia Corosync y Pacemaker en ambos nodos:
bash
Copiar código
sudo systemctl restart corosync pacemaker
4. Configurar el Clúster con Pacemaker
Ahora que Corosync está configurado y ambos nodos pueden comunicarse, es hora de configurar Pacemaker para administrar los recursos.

Primero, verifica que los nodos se reconocen mutuamente:
bash
Copiar código
sudo crm status
Inicia la configuración del clúster desde uno de los nodos:
bash
Copiar código
sudo crm configure
5. Configurar Recursos en el Clúster
El clúster de alta disponibilidad debe ofrecer al menos dos servicios. Aquí puedes implementar servicios como un servidor web Apache o un servidor NFS para compartir archivos.

Ejemplo: Configuración de un Servidor Web (Apache)

Instala Apache en ambos nodos:
bash
Copiar código
sudo apt install apache2
Luego, añade el recurso en el clúster para que sea gestionado:
bash
Copiar código
sudo crm configure primitive p_apache ocf:heartbeat:apache \
    params configfile="/etc/apache2/apache2.conf" \
    op monitor interval="30s"
6. Configurar un Recurso de IP Virtual (VIP)
Para asegurarte de que un servicio como Apache esté disponible a través de una sola IP (VIP), aunque falle uno de los nodos, puedes crear un recurso de IP virtual.

Añade el recurso VIP:
bash
Copiar código
sudo crm configure primitive p_vip ocf:heartbeat:IPaddr2 \
    params ip="192.168.1.100" cidr_netmask="24" \
    op monitor interval="30s"
Crea un grupo de recursos que incluya la IP virtual y el servidor Apache:
bash
Copiar código
sudo crm configure group webserver_group p_vip p_apache
7. Pruebas de Alta Disponibilidad
Para verificar que el clúster de alta disponibilidad funciona, realiza las siguientes pruebas:

Apaga uno de los nodos y verifica que el servicio sigue funcionando desde la IP virtual.
Comprueba que Pacemaker migra los recursos al nodo activo cuando uno falla:
bash
Copiar código
sudo crm_mon
8. Evaluación de Servicios (Sin y Con Clúster)
Primera fase: Evalúa los servicios sin el clúster, simplemente configurando Apache o el servicio que elijas en cada nodo sin usar Pacemaker para gestionar la alta disponibilidad.
Segunda fase: Repítelo con el clúster activo, validando que el servicio esté siempre disponible, incluso cuando un nodo falla.
Recursos para Profundizar
Pacemaker and Corosync Documentation:
Pacemaker
Corosync
YouTube Tutorial: Busca tutoriales como "High Availability Clustering with Pacemaker and Corosync" en YouTube para ver ejemplos visuales.
Linux Academy/CloudGuru: Tienen cursos especializados en alta disponibilidad con Pacemaker.
Este proceso cubre desde la instalación hasta la configuración básica de un clúster funcional, asegurando que los servicios se mantengan en funcionamiento incluso si uno de los servidores falla.
