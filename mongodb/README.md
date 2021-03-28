# deno-mongodb-rest-api

_Based on [Deno & MongoDB REST API with Oak Framework](https://www.youtube.com/watch?v=TMPBEkfIPWk)._

## api

### get notes

```sh
curl http://localhost:8080/notes | jq
```

### get note

```sh
curl http://localhost:8080/notes/:id | jq
```

### add note

```sh
curl -XPOST http://localhost:8080/notes -H "Content-Type: application/json" -d '
{
  "title": "x",
  "body": "y"
}' | jq
```

### update note

```sh
curl -XPUT http://localhost:8080/notes/:id -H "Content-Type: application/json" -d '
{
  "title": "updated"
}' | jq
```

### delete note

```sh
curl -XDELETE http://localhost:8080/notes/:id
```

## troubleshooting

```sh
# nuke all anonymous volumes of mongo
docker-compose rm -fv mongo
```
