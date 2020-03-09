import axios from "axios";
class apiHandler {
  constructor(url) {
    this.api = axios.create({
      baseURL: url || process.env.REACT_APP_BACKEND_URL,
      withCredentials: true
    });
  }

  get(endpoint) {
    return this.api.get(endpoint);
  }

  post(endpoint, data) {}
  patch(endpoint, data) {}
  delete(endpoint) {}
}
export default apiHandler;
// import axios from "axios";
// export default url => {
//   const api = axios.create({
//     baseURL: url || process.env.REACT_APP_BACKEND_URL
//   });

//   return {
//     api,
//     get: endpoint => {
//       return api.get(endpoint);
//     },

//     post: (endpoint, data) => {},
//     patch: (endpoint, data) => {},
//     delete: endpoint => {}
//   };
// };
