import axios from 'axios'
import * as cheerio from 'cheerio'
const url = 'https://www.manoramaonline.com/news/latest-news.html'
async function fetchData() {
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

async function fetchDistrictArticle(url) {
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
export { fetchArtcle, fetchData }