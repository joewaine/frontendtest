import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL


console.log('BASE URL:', process.env.REACT_APP_API_BASE_URL)


// const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('gettingall')
    const request = axios.get(`${baseUrl}`)
    return request.then(response => response.data)




}

const create = newObject => {

    const request = axios.post(`${baseUrl}`, newObject)
    return request.then(response => response.data)
}


const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}


const noteService = {
    getAll,
    create,
    update,
    deleteItem
}


export default noteService