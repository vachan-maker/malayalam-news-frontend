import { fetchArtcle,fetchData } from "../utils/utils.js"

const getHome = async (req, res) => {
    try{
    const items = await fetchData()
    res.render('home', { items: items,title:"Malayalam News Frontend" })
    }
    catch(error) {
        res.status(500).send("Interal Error!")
    }
}

const getArticle = async (req, res) => {
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

}

export {getArticle,getHome}