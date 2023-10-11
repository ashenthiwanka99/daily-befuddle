import React from 'react';
import './Waviy.scss';

const WavyText = ({ word }) => {
  return (
    <div className="wavy-text">
      <div className="wave">
        {word.split('').map((char, index) => (
          <span
            key={index}
            className="letter"
            style={{ '--i': index } as React.CSSProperties}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WavyText;
