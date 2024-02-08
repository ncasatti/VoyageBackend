import prisma from '../utils/prisma.js'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        phone,
      },
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  const validPassword = bcrypt.compareSync(password, user.password)

  if (validPassword) {
    req.session.email = user.email
    return res.status(200).json({ message: 'Login successful' })
  }
}

export const logoutUser = async (req, res) => {
  try {
    req.session.destroy()
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.findUnique({
      where: {
        email: id,
      },
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await prisma.user.update({
      where: {
        email: id,
      },
      data: req.body,
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await prisma.user.delete({
      where: {
        email: id,
      },
    })
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json(error.message)
  }
}
