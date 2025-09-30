import express from 'express'
import { engine } from 'express-handlebars'
import router from './routes/routes.js';
import { fileURLToPath } from 'url';
import path from 'path';
//import.meta.url gives the current url of the module
//fileURLToPath basically converts the url to a path
const __filename = fileURLToPath(import.meta.url)
//direname is used to access the directory name
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static('public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
//relative urls don't work on vercel so I used absoloute path
app.set('views', path.join(__dirname, 'views'))

app.use('/',router)

app.use((req,res,next)=>{
    res.status(404).send("Page Not Found")
})

export default app