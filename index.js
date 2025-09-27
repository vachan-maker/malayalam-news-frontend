import express from 'express'
import {engine} from 'express-handlebars'
import axios from 'axios'
import * as cheerio from 'cheerio'

const PORT = 5173
const app = express()
app.use(express.static('public'))
const url = 'https://www.manoramaonline.com/news/latest-news.html'
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

async function fethData() {
    const headlines = []
    const response = await axios(url)
    const data = await response.data
    const $ = cheerio.load(data)
    console.log(data)
    $('.cmp-story-list__title-link').each((index,element)=>{
        const headline = $(element).attr('title')
        const link = $(element).attr('href') 
        headlines.push({headline,link})
    })
    return headlines

}


app.get('/',async (req,res)=>{
    const items = await fethData()
    res.render('home',{items:items})
})


app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`))