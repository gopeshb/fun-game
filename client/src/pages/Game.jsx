import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSuccess } from '../redux/user/userSlice';
import { toast } from 'react-hot-toast';
const Loading = () => <p className='items-center text-center'>Loading...</p>;

const GameResult = ({ status, onRestart }) => (
  <div className='gap-5 mx-auto'>
    <p className='m-2 text-center'>You {status} the Game</p>
    <button className='p-5 m-2' onClick={onRestart}>Reset The Game</button>
    
  </div>
);

const Card = ({ index, drawHandler }) => (
  <button
    onClick={() => drawHandler(index)}
    className="bg-blue-500 text-white font-bold py-16 px-8 m-2 rounded"
  >
    Draw Card {index + 1}
  </button>
);

const Cards = ({ count, drawHandler }) =>
  [...Array(count)].map((_, index) => (
    <Card key={index} index={index} drawHandler={drawHandler} />
  ));

export default function Game() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [deck, setDeck] = useState(currentUser.gameState);
  const [gameStatus, setGameStatus] = useState(null);
  const [lives, setLives] = useState(currentUser.lives);
  const [count, setCount] = useState(5 - deck);
  const [allUsers,setAllUsers]=useState(null);
  const cards = ['Cat', 'Defuse', 'Shuffle', 'ExplodingKitten'];

  const setUser = (updatedUser) => {
    dispatch(updateUserSuccess(updatedUser));
  };

  useEffect(() => {
    GetUsers();
    setCount(5 - deck);
  }, [deck]);

  const drawHandler = async (index) => {
    setLoading(true);

    try {
      const j = Math.floor(Math.random() * 4);
      const drawnCard = cards[j];
      toast.success(`You drew a ${drawnCard} card!`);
      const updatedUser = { ...currentUser };
      setDeck(deck + 1);
      updatedUser.gameState=updatedUser.gameState+1;
      switch (drawnCard) {
        case 'ExplodingKitten':
          if (deck === 4) {
            if (lives > 0) {
              updatedUser.wins = updatedUser.wins + 1;
              setGameStatus('Won');
              handleSubmit(updatedUser);
            } else {
              setLives(lives - 1);
              if (lives - 1 === 0) {
                updatedUser.losses = updatedUser.losses + 1;
                updatedUser.lives = 0;
        updatedUser.gameState = 0;
                setGameStatus('Lost');
                handleSubmit(updatedUser);
              }
            }
          } else {
           
            if (lives > 0) {
              setLives(lives - 1);
            } else {
              updatedUser.losses = updatedUser.losses + 1;
              updatedUser.lives = 0;
        updatedUser.gameState = 0;
              setGameStatus('Lost');
              handleSubmit(updatedUser);
            }
          }
          break;

        case 'Cat':
          if (deck === 4) {
            updatedUser.wins = updatedUser.wins + 1;
            setGameStatus('Won');
            handleSubmit(updatedUser);
          }
          break;

        case 'Shuffle':
          restartHandler();
          break;

        case 'Defuse':
          setLives(lives + 1);
          if (deck === 4) {
            updatedUser.wins = updatedUser.wins + 1;
            setGameStatus('Won');
            handleSubmit(updatedUser);
          }
          break;

        default:
          break;
      }
      updatedUser.lives = lives;
      setUser(updatedUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const restartHandler = async () => {
    const updatedUser = { ...currentUser };
    setDeck(0);
    setCount(5);
    setLoading(true);
    setGameStatus(null);
    setLives(0);
    updatedUser.lives = 0;
    updatedUser.gameState = 0;
    setUser(updatedUser);

    try {
      const res = await fetch(`/api/user/game/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data);
      } else {
        dispatch(updateUserSuccess(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (updatedUser) => {
    try {
      const res = await fetch(`/api/user/game/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(data);
      } else {
        dispatch(updateUserSuccess(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const GetUsers = async () => {
    const res = await fetch(`/api/user/get`);
    const data = await res.json();
    setAllUsers([...data]);
  };
  return (
    <div className='flex gap- justify-between  p-4'>
      {gameStatus ? (
        <GameResult status={gameStatus} onRestart={restartHandler} />
      ) : (
        <div >
          <button className='p-5 m-2' onClick={restartHandler}>Reset The Game</button>
          <div>
            <Cards count={count} drawHandler={drawHandler} />
          </div>
          <div className='w-full'>
            <p>Total wins:-{currentUser.wins}</p>
            <p>Totatl Losses:-{currentUser.losses}</p>
            <p>Totatl Lives Available:-{lives} (no of diffuse cards increase lives of player)</p>
          </div>
        </div>
      )}
      <div>
      { allUsers && <div className='m-3 p-auto border-2 border-white '>
        <h2 className='m-3 text-center font-bold'>Score Board</h2>
          {allUsers.map((user) => (
            <div className='gap-2 p-3' key={user._id}>
              <span className='p-2'>Username: {user.username}</span>
              <span className='p-2'>Wins: {user.wins}</span>
              <span className='p-2'>Losses: {user.losses}</span>
              
            </div>
          ))}
        </div>
      }
      </div>
    </div>
    
  );
}
