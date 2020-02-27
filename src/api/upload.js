import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:5000/api/files',
  // withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err);
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewFile (newFile) {
    // console.log('new thing is: ', newThing)
    return service.post('/new', newFile)
      .then(res => res.data)
      .catch(errorHandler);
  }
}