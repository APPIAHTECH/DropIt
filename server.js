let express = require('express')
let bodyParser = require('body-parser')
let path = require('path')
let http = require('http')
let morgan = require('morgan')
let app = express()

//Server Access
app.use( (req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,application/json,multipart/form-data');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(morgan('dev'))

// API file
let api = require('./server/routes/api')

// Parsers
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ extended: false , limit: '50mb'}))

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')))

// API location
app.use('/api', api)

// Send all other requests to the Angular app
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')))

//Set Port
const port = process.env.PORT || '3500'
app.set('port', port)

const server = http.createServer(app)

server.listen(port, () => console.log(`Running on localhost:${port}`))
