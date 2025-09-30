import {Router} from 'express';
import { getArticle, getHome } from '../controllers/controller.js';

const router = Router ()

router.get("/",getHome)

router.get("/news/latest-news/:year/:month/:day/:headline",getArticle)

export default router