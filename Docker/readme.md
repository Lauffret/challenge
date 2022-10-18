# Docker

```bash
# Démarrer le setup des deux images avec le fichier stack.yml

docker-compose -f stack.yml up

```

Dans ce cas vous avez un localhost:8080

Si on souhaite se connecter au bash de mysql avec le nom de l'image

```bash
docker exec -it docker_mysql bash 
```