import express from 'express';
import userService from '../services/userService.js';

const userController = express.Router();

export const home = (req, res) => {
    res.send(`<h1>Please Route to the Room url</h1>`)
}

userController.post('/createRoom', userService.createRoom);
userController.post('/bookRoom', userService.bookRoom);
userController.get('/customerBookingDetails/:customerName', userService.customerBookingDetails);
userController.get('/allBookedCustomerDetails', userService.allBookedCustomerDetails);
userController.get('/allBookedRoomDetails', userService.allBookedRoomDetails);
export default userController;