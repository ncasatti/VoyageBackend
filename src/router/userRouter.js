import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  logoutUser,
  updateUser,
} from '../controller/userController.js'

const router = express.Router()

router.post('/user', createUser)
router.get('/user', getAllUsers)
router.get('/user/:id', getUserById)
router.put('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router
