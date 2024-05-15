import axios from "axios";

export const getContent = async (gnfdURI: string) => {
  return axios
    .get(gnfdURI, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return;
      //return error;
    });
};
