import express from 'express'
import {engine} from 'express-handlebars'
import axios from 'axios'
import * as cheerio from 'cheerio'

const PORT = 5173
const app = express()
const url = 'https://www.manoramaonline.com/news/latest-news.html'
let headlines = []
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

async function fethData() {
    const response = await axios(url)
    const data = await response.data
    const $ = cheerio.load(data)
    console.log(data)
    $('.cmp-story-list__title-link').each((index,element)=>{
        headlines.push($(element).attr('title'))
    })

}


app.get('/',(req,res)=>{
    res.render('home',{items:headlines})
})
fethData()

app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`))