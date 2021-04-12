"# posts-management-api"

```
Description : API for managing user's posts
```

### prerequisite
```
mongodb installed locally
```

### Local Running

To run code locally

```bash
$ run mongodb locally
$ npm start
```

### API details on swagger UI :

to get information on API (requests and response) browse to

```
$ {base_api}/api/v1/management/swagger
ex: localhost:5001/api/v1/management/swagger
```

### curl examples

Sign up

```
$ curl --location --request POST 'http://localhost:5001/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "g@gmail.com",
    "firstName" :"gar",
    "lastName" :"Danny",
    "password" : "<your_password>"
}'
```

Login

```
$curl --location --request POST 'http://localhost:5001/api/v1/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "g@gmail.com",
    "password": "<your_password>"
}'
```

Add post

```
$ curl --location --request POST 'http://localhost:5001/api/v1/posts' \
--header 'Content-Type: application/json' \
--data-raw '{
    "authorId": "607338cf76ef4d0020e4f230",
    "title" :"my new post",
    "content" :"wow what a  post"
}'
```

Get user's post

```
$ curl --location --request GET 'http://localhost:5001/api/v1/posts/607338cf76ef4d0020e4f230' \
--header 'Content-Type: application/json' \
--data-raw ''
```
