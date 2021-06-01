import axios from 'axios'

const isAuth = async () => {
  const token = JSON.parse(sessionStorage.getItem('token'))
  
 return new Promise(async (resolve, reject) => {
  await axios.post('http://localhost:5000/frontend', { 
    "token": token
    }).then(res => {
      if(res.data.status === true) {
        resolve(true)
      } else {
        reject(false)
      }
    }).catch(err => err)
 })

}


export default isAuth