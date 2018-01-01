let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let http = require('http')
let morgan = require('morgan')
let app = express()

//Server Access
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://dropt-it-up.herokuapp.com:80/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,application/json,multipart/form-data');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(morgan('dev'))

// DB connection
let db = require('./server/db/db')

db.connection().then((db)=> {
  console.dir("Connected to the DB");
  db.close();
}).catch((err)=> console.error("Couldint connected to DB"));

// API file
let api = require('./server/routes/api')

// Parsers
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')))

// API location
app.use('/api', api)

// Send all other requests to the Angular app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

//Set Port
const port = process.env.PORT || '80'
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => console.log(`Running on localhost:${port}`))
