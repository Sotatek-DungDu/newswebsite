import axios from "axios"
import { getAsyncWithToken } from "./request"

export const getListNews = async (params) => {
  try {
    const response = await axios.get(`http://localhost:5000/news/`, params)
    return response?.data || []
  } catch (error) {
    console.log(error)
  }
}

export const getAdvertise = async (params) => {
  try {
    const response = await axios.get(`http://localhost:5000/adv/`, params)
    return response?.data || []
  } catch (error) {
    console.log(error)
  }
}

export const getUserData = async () => {
  try {

    // const response = await axios.get(`http://localhost:5000/auth/`, params)
    const response = await getAsyncWithToken(`http://localhost:5000/auth/`)

    return response?.data || {}
  } catch (error) {
    console.log(error)
  }
}

export const getCategory = async (params) => {
  try {
    const response = await getAsyncWithToken(`http://localhost:5000/category`, params)
    return response?.data || []
  } catch (error) {
    console.log(error)
  }
}