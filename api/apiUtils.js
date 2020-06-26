import axios from "axios"

const priceTrackerApi = axios.create({
  baseURL: process.env.API_BASE_URL,
})

priceTrackerApi.interceptors.request.use(function (config) {
  console.log("Request Sent")
  const token = localStorage.getItem("priceTracker")
  config.headers.Authorizaion = `Token ${token}`
  return config
})

export default priceTrackerApi
