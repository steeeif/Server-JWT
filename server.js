var express = require('express')
var app = express()
var router = express.Router()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

/*
* Get respons time 
*/

app.use(async (req, res, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(req.url, req.method, ms)
})

/*
 * Allow Origin. Define the url of the frontend app and allow it to use api
 */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
  )
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  if (req.method === 'OPTIONS') {
    res.status(204).send()
  } else {
    next()
  }
})

/*
 * Add middleware. Because we defined the first parameter ( '/api/*' ), it will run
 * only for urls that starts with '/api/*'
 */

app.all('/api/*', require('./middlewares/auth.js'))
/*
 * Add the protected route '/hello-world' after '/api'
 * So now it is available on /api/hello-world
 */

app.use('/api/hello-world', require('./controllers/helloWorld.js')(router))
/*
 * Add the '/login' route handler
 */

// parse application/x-www-form-urlencoded

// parse application/json
app.use('/', require('./controllers/user.js')(router))

module.exports = app
