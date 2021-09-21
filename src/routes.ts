import { Router } from 'express'
import { SendMailController } from './controllers/SendMailController';
import { SurveysController } from './controllers/SurveysUserController';
import { UserController } from './controllers/UserController'
import { SessionController } from './controllers/SessionController'

const router = Router ();

const userController = new UserController()

const sessionController = new SessionController()

const surveysController = new SurveysController()

const sendMailController = new SendMailController()

router.post("/users", userController.create)
router.post("/session", sessionController.create)

router.post("/surveys", surveysController.create)
router.get("/surveys", surveysController.show)

router.post("/sendMail", sendMailController.execute)

export {router};