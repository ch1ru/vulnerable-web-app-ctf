# vulnerable-web-app-ctf
ctf challenge: Secrets of Mesopotamia

In this challenge you must hack into the admin account by discovering the secrets within. There may be more than one way to solve the challenge, but all routes lead to glory and security patches!

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
