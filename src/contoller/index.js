import express from 'express';
import userController from './userController.js'
import { home } from './userController.js';

const controller = express.Router();

controller.get('/', home)
controller.use('/roomBook', userController)
export default controller;