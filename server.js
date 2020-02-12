const express = require('express'); // importing a CommonJS module
const morgan = require("morgan");
const helmet = require("helmet");

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//the three amigas rachel, rita, nancy
// function logger(req, res, next){
//   console.log(`${req.method} Request to ${req.originalUrl}`)
//   console.log('origin', req.originalUrl)
//   next();
// }


// function checkPassword (req, res, next){
//   //checking if password exists first so there isn't an error changing something to lowercase that doesn't exist
//   if (req.headers.password && req.headers.password.toLowerCase() === "mellon"){
//     next();
//   } else {
//     console.log("nope wrong password")
//     res.status(401).json({message: "wrong password"})
//   }
// }

function checkPassword (pass){
  return function (req, res, next){
    //checking if password exists first so there isn't an error changing something to lowercase that doesn't exist
    if (req.headers.password && req.headers.password.toLowerCase() === pass){
      next();
    } else {
      console.log("nope wrong password")
      res.status(401).json({message: "wrong password"})
    }
  }
}


//middleware
server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));
// server.use(logger);



server.use('/api/hubs', checkPassword('mellon'), hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
