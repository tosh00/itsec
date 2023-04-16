import express from 'express';
import controller from '../controllers/UserData'

const router = express.Router();
router.post('/add',  controller.createUserData);
router.get('/:userDataId', controller.readUserData);
router.get('/', controller.readAll);
router.delete('/delete/:userDataId',  controller.deleteUserData);
router.delete('/delete/',  controller.deleteAllUserData);

export = router;