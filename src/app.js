import express from 'express'
import { engine } from 'express-handlebars'
import router from './routes/routes.js';

const app = express()
app.use(express.static('public'))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/',router)

app.use((req,res,next)=>{
    res.status(404).send("Page Not Found")
})

export default app