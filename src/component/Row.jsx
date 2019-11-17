import React from 'react';

const Row = ({ list, length }) => {
  return (
    <div
      className="row"
      style={{
        gridTemplateColumns: `repeat( ${length}, minmax(${100 /
          length}%, ${100 / length}%) )`,
      }}
    >
      {list &&
        list.map((cell, index) => {
          return (
            <div key={index} className="column">
              {(cell === 'spri' && (
                <img
                  src="https://res.cloudinary.com/dflmq4zxb/image/upload/v1573575512/sprite_mt8vnt.svg"
                  alt="S"
                />
              )) ||
                (cell === 'play' && (
                  <img
                    src="https://res.cloudinary.com/dflmq4zxb/image/upload/v1573575512/player_teftbc.svg"
                    alt="P"
                  />
                )) ||
                ''}
            </div>
          );
        })}
    </div>
  );
};

export default Row;
