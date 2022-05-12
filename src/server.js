const logger = require('./utils/logger')
const routes = require('./api/v1/routes/index')
const DBConnection= require('./configuration/config.db')
const CONFIG = require('./configuration/config')

const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const morgan = require('morgan')
const express = require("express");
const app = express();

app.use(cors({
  origin:'*'
}))

app.use(morgan('tiny'))

app.use(helmet())
// to handle response compress
app.use(compression())


//db connection
DBConnection()

//routes
app.use(express.json())

app.use(express.urlencoded({extended:true}))


routes(app)

app.listen(process.env.PORT||3000,"0.0.0.0", () => {
  console.log(`server is connected.... on http://localhost:${CONFIG.port}`);
  // logger.info(`Server started and running on http://localhost:${CONFIG.port}`)
});
