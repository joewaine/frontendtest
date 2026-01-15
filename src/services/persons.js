import axios from 'axios'


const baseUrl = process.env.REACT_APP_API_BASE_URL

console.log('BASE URL:', process.env.REACT_APP_API_BASE_URL)


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {


console.log(`${baseUrl}/persons/post`);
    
    const request = axios.post(`${baseUrl}/post`, newObject)
    console.log(newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log(request)
    return request.then(response => response.data)
}

const deleteItem = (id) => {

  return axios.delete(`${baseUrl}/delete/${id}`)


}





const personService = {
    getAll,
    create,
    update,
    deleteItem
}

export default personService
