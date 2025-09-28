import express from 'express'
import { engine } from 'express-handlebars'
import axios from 'axios'
import * as cheerio from 'cheerio'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const app = express()
app.use(express.static('public'))
const url = 'https://www.manoramaonline.com/news/latest-news.html'
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// const date = new Date().toLocaleDateString()

async function fethData() {
    const headlines = []
    try {
        const response = await axios(url)
        const data = await response.data
        const $ = cheerio.load(data)
        console.log(data)
        $('.cmp-story-list__title-link').each((index, element) => {
            const headline = $(element).attr('title')
            const link = $(element).attr('href')
            headlines.push({ headline, link })
        })
    } catch (error) {
        console.log("Error", error)
        return []
    }
    return headlines

}
async function fetchArtcle(url) {
    const article = []
    try {
        const response = await axios(url)
        const data = await response.data
        const $ = cheerio.load(data)

        $('.rtearticle.text p').each((index, element) => {
            article.push($(element).text())

        })
        const headline = $(`.article-header__title`).text()
        return ({ title: headline, content: article })
    } catch (error) {
        console.log(error)
        return ({ title: "Error", content: "Error fetching content" })
    }
}

app.get('/', async (req, res) => {
    try{
    const items = await fethData()
    res.render('home', { items: items,title:"Malayalam News Frontend" })
    }
    catch(error) {
        res.status(500).send("Interal Error!")
    }
})

app.get('/news/latest-news/:year/:month/:day/:headline', async (req, res) => {
    const year = req.params.year
    const month = req.params.month
    const day = req.params.day
    const headline = req.params.headline
    const url = `https://www.manoramaonline.com/news/latest-news/${year}/${month}/${day}/${headline}`
    try{
    const article = await fetchArtcle(url)
    res.render('article', { headline: article.title, content: article.content, url: url,title:article.title,description:article.content[0] })
    }
    catch(error) {
        res.status(500).send("Internal Error!")
    }

})


app.use((req,res,next)=>{
    res.status(404).send("Page Not Found")
})

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))