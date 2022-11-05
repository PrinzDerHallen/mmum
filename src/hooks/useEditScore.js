import { useEffect, useState } from "react";
import deleteHighScore from "../api/deleteHighScore";
import getHighScores from "../api/getHighScores";
import editHighScore from "../api/editHighScore";
/**
 * React hook that fetchs the data from server
 * @returns
 */
export default function useEditScore() {
  const [isUpdating, setIsUpdating] = useState(false)
  // makes api req to edit
  const editScore = async (id,score,username) => {
    try {
      await editHighScore(id,score,username);
      console.log("success, we edit the score");
      setIsUpdating (false)
    } catch (e) {
      console.log(e);
      setIsUpdating (false)
    }
  };

  return {
   isUpdating,
   setIsUpdating,
   editScore
  };
}
