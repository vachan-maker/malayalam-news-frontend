import {Router} from 'express';
import { getArticle, getDistrictArticle, getHome } from '../controllers/controller.js';

const router = Router ()

router.get("/",getHome)

router.get("/news/latest-news/:year/:month/:day/:headline",getArticle)
router.get("/district-news/:district/:year/:month/:day/:headline",getDistrictArticle)
export default router