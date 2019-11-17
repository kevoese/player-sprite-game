import React, { useEffect, useState, useRef } from 'react';
import { Board, Delay } from '../utils';
import Row from './Row';
import Button from './Button';

const BoardGame = ({ square, sprite }) => {
  const [board, setBoard] = useState(new Board(square || 10, sprite || 10));
  const [stop, setStop] = useState(false);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(new Delay(300));

  const handleMove = async () => {
    if (!stop && !board.isComplete()) {
      await delay.getPromise();
      board.movePlayer();
      setData(board.board);
      setCount(count => count + 1);
      delay.cancel();
    }
  };

  const handleRestart = () => {
    delay.cancel();
    setStop(true);
    board.create();
    setData(board.generate());
    setCount(0);
  };

  const handleToggle = () => {
    setStop(prevState => !prevState);
  };

  useEffect(() => {
    if (!data) {
      setData(board.generate());
    } else handleMove();

    return () => {
      delay.cancel();
    };
  }, [data, count, stop]);

  return (
    <>
      <div className="info">
        <div className="count">
          <strong>Players Move:</strong> <span>{count}</span>
        </div>
        <Button
          className="restart"
          imgSrc="https://res.cloudinary.com/dflmq4zxb/image/upload/v1574020588/restart_kblr2f.svg"
          type="button"
          onClick={handleRestart}
        >
          {' '}
          Restart{' '}
        </Button>
        <Button
          type="button"
          imgSrc={
            !stop
              ? 'https://res.cloudinary.com/dflmq4zxb/image/upload/v1574020588/pause_vx3f7k.svg'
              : 'https://res.cloudinary.com/dflmq4zxb/image/upload/v1574020588/start_wqqhcv.svg'
          }
          onClick={handleToggle}
        >
          {!stop ? 'Stop' : 'Start'}
        </Button>
      </div>

      <div className="board">
        {data &&
          data.map((row, index) => {
            return <Row list={row} length={square || 10} key={index} />;
          })}
      </div>
    </>
  );
};

export default BoardGame;
