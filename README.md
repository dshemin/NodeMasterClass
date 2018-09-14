Homework Assignment #1
======================

Home work for [the node master class](https://pirple.thinkific.com/courses/take/the-nodejs-master-class/texts/4342320-homework-assignment-1)

Installation
------------

* `npm install`

Run
---

* `PORT=3000 npm run server:dev` for development server with reloading
* `PORT=3000 npm run server:prod` for production server

Available environment options:

* PORT - listening port

REST endpoints
--------------

**POST /hello**

Print welcome message, no payload required.

Docker
------

* Build docker image `npm run build:image`
* `docker run -e PORT=3000 -p 3000:3000 home1` 
