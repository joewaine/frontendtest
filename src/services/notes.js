import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_BASE_URL


console.log('BASE URL:', process.env.REACT_APP_API_BASE_URL)


// const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {

console.log(baseUrl);
  const response = await axios.get(`${baseUrl}`)
  console.log('resp', response.data)
  return response.data



}

const create = async (newObject) => {

    const request = await axios.post(`${baseUrl}`, newObject)
    return request.data
}


const update = (id, newObject) => {
    console.log(id)
    console.log(newObject)
    console.log(`${baseUrl}/${id}`)
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