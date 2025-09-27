const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const PORT = 5173
const app = express()
const url = 'https://www.manoramaonline.com/news/latest-news.html'
let headlines = []
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
    res.send(headlines)
})
fethData()

app.listen(PORT, ()=>console.log(`Listening on PORT: ${PORT}`))