import axios from "axios"

const priceTrackerApi = axios.create({
  baseURL: process.env.API_BASE_URL,
})

priceTrackerApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("priceTrackerToken")

  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export default priceTrackerApi
// {
//   Authorization: `Token ${localStorage.getItem("token")}`,
// },
