import {Router} from 'express';

const router = Router ()

router.get("/")

router.get("/news/latest-news/:year/:month/:day/:headline")

export default router