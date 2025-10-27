import { fetchArtcle,fetchData } from "../utils/utils.js"
const baseURL = "https://www.manoramaonline.com"
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
    const { year, month, day, headline } = req.params
    const url = `${baseURL}/news/latest-news/${year}/${month}/${day}/${headline}`
    try{
    const article = await fetchArtcle(url)
    res.render('article', { headline: article.title, content: article.content, url: url,title:article.title,description:article.content[0] })
    }
    catch(error) {
        res.status(500).send("Internal Error!")
    }

}

const getDistrictArticle = async(req,res) => {
    const {district, year, month, day, headline } = req.params
    const url = `${baseURL}/district-news/${district}/${year}/${month}/${day}/${headline}`
    try {
        const article = await fetchArtcle(url)
        res.render('article', { headline: article.title, content: article.content, url: url,title:article.title,description:article.content[0] })
    }catch(error) {
        res.status(500).send("Internal Error!")
    }

}
export { getArticle,getHome,getDistrictArticle }