import React, { useState } from 'react';
import BoardGame from './component/BoardGame';

const Main = () => {
  const [boardValues, setBoardValues] = useState({});
  const [formData, setFormData] = useState({ square: '', sprite: '' });
  const [showBoard, setShowBoard] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setBoardValues({ ...formData });
    setShowBoard(true);
    setFormData({ square: '', sprite: '' });
  };

  return (
    <div className="app">
      <h1>BOARD GAME</h1>
      <div className="main">
        <h2>Player vs Sprite</h2>
        {!showBoard ? (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="square"
              placeholder="Enter the square. Default value is 10"
              onChange={handleChange}
              value={formData.square}
              required
            />
            <input
              type="number"
              name="sprite"
              placeholder="Enter the number of sprites. Default value is 10"
              onChange={handleChange}
              value={formData.sprite}
              required
            />
            <button type="submit" disabled={showBoard}>
              Submit
            </button>
          </form>
        ) : (
          <BoardGame
            square={boardValues && boardValues.square}
            sprite={boardValues && boardValues.sprite}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
