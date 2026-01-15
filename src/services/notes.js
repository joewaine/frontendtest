import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'
// const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {

    const request = axios.post(`${baseUrl}/post`, newObject)
    return request.then(response => response.data)
}


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const deleteItem = (id) => {
//   return axios.delete(`${baseUrl}/${id}`)

  return axios.delete(`${baseUrl}/delete/${id}`)


}


const noteService = {
    getAll,
    create,
    update,
    deleteItem
}


export default noteService