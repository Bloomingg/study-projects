import axios from 'axios'

const get = ({url}) => {
  return new Promise((resolve, reject) => {
    axios({
      url
    })
    .then(result => {
      resolve(result)
    })
    .then(error => {
      reject(error)
    })
  })
}

export {
  get
}