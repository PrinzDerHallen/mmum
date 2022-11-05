import useAllHighScores from "../../hooks/useAllHighScores";
import styled from "styled-components";
import bgImg from "../../assets/background.png";
import useEditScore from "../../hooks/useEditScore";
import { useState } from "react";
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: url(${bgImg});
  background-repeat: repeat;
  background-position: 0 0;
  background-size: auto 100%;
  /*adjust s value for speed*/
  animation: animatedBackground 500s linear infinite;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const ScoreWrapper = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  text-align: center;
  width: 275px;
  height: 70px;
  margin-bottom: 50px;
  opacity: 0.75;
  transition: all ease-in-out 300ms;

  p {
    margin: 0;
  }

  p:nth-child(1) {
    margin-bottom: 15px;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Header = styled.h1`
  color: #fff;
  font-size 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: red;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  outline: none;
  border-color: red;
  border-style: solid;

  &:hover {
    cursor: pointer;
  }
`;

const EditButton = styled.button`
  color: #fff;
  background-color: green;
  border-radius: 4px;
  padding: 0.5rem 0.5rem;
  outline: none;
  border-color: red;
  border-style: solid;

  &:hover {
    cursor: pointer;
  }
`;

export default function HighScores() {
  const [userScore, setUserScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  // object destructuring
  const { allScores, deleteScore, isDeleting } = useAllHighScores();
const { isUpdating, setIsUpdating, editScore} = useEditScore();

const handleSubmit = event => {
  console.log("handleSubmit Ran")
  window.location.reload();
  console.log(userScore)
  console.log(userName)
  console.log(userId)
  setUserScore(0)
  setUserName('')
  setUserId('')
  setIsUpdating(false)
  submitEdit()
}

async function submitEdit (score,username,id) {
  try {
    id = userId
    username = userName
    score = userScore
    editScore(id,score,username)
  }
  catch (error) {
    console.log(error)
  }
}

  return (
    <PageWrapper>
      <Header>Space Shooter Scores</Header>
      {allScores.map((score, i) => (
        <ScoreWrapper key={i}>
          <p>{score.username}</p>
          <p>{score.score}</p>
          <DeleteButton
            onClick={() => {
              console.log("hit delete");
              deleteScore(score._id);
            }}
          >
            {isDeleting === true ? "Is Deleting" : "Delete"}
          </DeleteButton>

          <EditButton onClick={()=>{
            console.log("hit edit");
            setIsUpdating(true);
            console.log(isUpdating);
            setUserId(score._id);
            setUserName(score.username);
            setUserScore(score.score);
          }}>
            edit
         </EditButton>
        
         {isUpdating === true ?
            <form onSubmit={handleSubmit}>
              <input
                id="score"
                name="score"
                type="number"
                onChange={event => setUserScore(event.target.value)}
                value={userScore}
              />
              <input
                id="username"
                name="username"
                type="text"
                onChange={event => setUserName(event.target.value)}
                value={userName}
              />
              <button type='submit'> Done </button>
            </form> : null}

        </ScoreWrapper>
      ))}
    </PageWrapper>
  );
}
