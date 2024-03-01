import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject)
}

const get = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}
//delete
const eliminar = (id) => {
   return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {getAll, create, eliminar, update, get}