import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token")
  return axios.create({
    headers:{
      'Content-Type' : 'application/json; charset=utf-8',
      'Authorization': token
    }
  })
}