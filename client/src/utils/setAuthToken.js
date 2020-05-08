import axios from "axios";

const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorisation"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorisation"];
  }
};

export default setAuthToken;
