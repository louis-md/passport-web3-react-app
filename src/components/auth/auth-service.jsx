import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
      withCredentials: true
    });
    this.service = service;
  }

  signup = (firstName, lastName, email, password) => {
    return this.service.post('/signup', {firstName, lastName, email, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

export default AuthService;