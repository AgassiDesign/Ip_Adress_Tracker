import axios from 'axios';

export default {
  async fetchData(apiKey, ip) {
    return await axios.get(
      `https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ip}`
    );
  },
};
