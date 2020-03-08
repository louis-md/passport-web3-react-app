import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/files`,
  withCredentials: true
});

const errorHandler = err => {
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewFile (newFile) {
    return service.post('/new', newFile)
      .then(res => res.data)
      .catch(errorHandler);
  }
}