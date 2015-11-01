# webappTemplate
MEAN

###Dependencies:
- MongoDB
- NodeJS
- GruntJS

###Install

```bash
npm install
```

###Run

1. In one terminal:
```bash
mongod
```

2. In another terminal:
```bash
node app.js
```

3. In another terminal:
```bash
grunt serve
```

App is running on `http://localhost:3000/orders`

###Production version

Follow steps 1 and 2 above.

3. In another terminal:
```bash
grunt build
```

Files will be generated on `client/dist`

##API

`GET http://localhost:3000/api/orders`
Returns JSON with all the orders

`GET http://localhost:3000/api/orders/:id`
Returns JSON with one order

`POST http://localhost:3000/api/orders`
Inserts a new order in DB
