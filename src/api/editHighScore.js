import axios from "axios";
import { API_URL } from "../constants";

/**
 * Make api request for all the users' scores
 * @returns
 */
export default function editHighScore(id,score,username) {
  const url = API_URL + "/update-score";
  const data = {
    score : score,
    username : username,
    _id : id
  };
  return axios.put(url,data);
}