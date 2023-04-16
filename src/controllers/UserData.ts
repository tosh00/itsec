import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import UserData from '../model/UserData';
import Logging from '../library/Logging';

const createUserData = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, timestamp} = req.body;

    const time = timestamp || new Date;

    console.log(time)

    const userData = new UserData({
        _id: new mongoose.Types.ObjectId(),
        username,
        password,
        timestamp: time
    })

    return userData.save()
        .then((userData) => { res.status(201).json({ userData }) })
        .catch((error) => { res.status(500).json({ error }) })
};
const readUserData = (req: Request, res: Response, next: NextFunction) => {
    const userDataId = req.params.userDataId;

    return UserData.findById(userDataId)
        .then((userData) => (userData ? res.status(200).json({ userData }) : res.status(404).json({ message: 'UserData not found' })))
        .catch((error) => {Logging.error(error); res.status(500).json({ error }) })
};

const readAll = (req: Request, res: Response, next: NextFunction) => {

    return UserData.find()
        .then((userData) => res.status(200).json({ userData }))
        .catch((error) => {Logging.error(error);  res.status(500).json({ e: error}) })
};

const updateUserData = (req: Request, res: Response, next: NextFunction) => {
    const userDataId = req.params.userDataId;

    return UserData.findById(userDataId)
        .then((userData) => {
            if (userData) {
                userData.set(req.body)
                return userData.save()
                    .then((userData) => { res.status(201).json({ userData }) })
                    .catch((error) => { res.status(500).json({ error }) })
            }
            else {
                res.status(404).json({ message: 'UserData not found' })
            }
        })
        .catch((error) => { res.status(500).json({ error }) })

};
const deleteUserData = (req: Request, res: Response, next: NextFunction) => {
    const userDataId = req.params.userDataId;

    UserData.findByIdAndDelete(userDataId)
    .then((userData) => (userData ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: 'UserData not found' })))
    .catch((error) => { res.status(500).json({ error }) })
};

const deleteAllUserData = (req: Request, res: Response, next: NextFunction) =>{
    UserData.deleteMany({})
    .then((userData) => (userData ? res.status(201).json({ message: 'deleted' }) : res.status(404)
    .json({ message: 'UserData not found' })))
    .catch((error) => { res.status(500).json({ error }) })

}

export default {createUserData, readUserData, readAll, updateUserData, deleteUserData, deleteAllUserData}