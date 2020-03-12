import apisauce from 'apisauce'
import { API_URL } from '../constants'

export const api = apisauce.create({
  baseURL: API_URL
})
