# vulnerable-web-app-ctf
A vulnerable web stack for a ctf challenge

## How to run
In the root directory pull images:
```
docker-compose pull
```
Then build containers:
```
docker-compose up -d --build
```
To stop running containers:
```
docker-compose down
```

## Environment variables
The flag,server keys, ports, network and other configuration changes can be made in the docker-compose.yml file.
