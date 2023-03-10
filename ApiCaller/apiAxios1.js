import axios from 'axios';
// const BASE_URL = 'https://www.thequana.com/apimobile/mmowner';
// const BASE_URL = 'https://www.thequana.com/apimobile/mmowner';

const version = 'hRs6';
export default apiAxios1 = async (path, body) => {
  // return axios.post(`http://localhost:8000/routes/${path}`, {
  // return axios.post(`http://10.0.2.2:8000/routes/${path}`, {
  //   xversion: version,
  //   ...body,
  // });
  return axios.post(
    `https://plankton-app-ovujs.ondigitalocean.app/routes/${path}`,
    // `http://10.0.2.2:8000/routes/${path}`,
    {...body},
  );
};
