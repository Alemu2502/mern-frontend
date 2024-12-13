import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ count = 5, value = 0, size = 24, edit = false, onChange = () => {} }) => {
  const handleClick = (index, isHalf) => {
    if (!edit) return;

    const newValue = isHalf ? index + 0.5 : index + 1;
    onChange(Math.min(newValue, count));
  };

  const getStarClass = (index) => {
    if (value >= index + 1) {
      return 'full';
    } else if (value >= index + 0.5) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  return (
    <div className="star-rating d-flex align-items-center gap-2">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            display: 'inline-block',
            width: `${size}px`,
            height: `${size}px`,
          }}
        >
          {/* Clickable area for the left half of the star */}
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              left: 0,
              top: 0,
              cursor: edit ? 'pointer' : 'default',
              zIndex: 3, // Ensure the clickable area is above the star
            }}
            onClick={() => handleClick(index, true)}
          ></div>

          {/* Clickable area for the right half of the star */}
          <div
            style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              right: 0,
              top: 0,
              cursor: edit ? 'pointer' : 'default',
              zIndex: 3, // Ensure the clickable area is above the star
            }}
            onClick={() => handleClick(index, false)}
          ></div>

          {/* Full Star */}
          <span
            className={`star ${getStarClass(index)}`}
            style={{
              color: value >= index + 1 ? '#ffb400' : 'transparent',
              fontSize: `${size}px`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              WebkitTextStroke: '1px #ffb400',
              zIndex: 1,
              transition: 'color 0.2s ease',
            }}
          >
            ★
          </span>

          {/* Half Star */}
          <span
            className="star half"
            style={{
              color: value >= index + 0.5 ? '#ffb400' : 'transparent',
              fontSize: `${size}px`,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '50%',
              overflow: 'hidden',
              WebkitTextStroke: '1px #ffb400',
              zIndex: 2,
              transition: 'color 0.2s ease',
            }}
          >
            ★
          </span>
        </div>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  count: PropTypes.number,
  value: PropTypes.number,
  size: PropTypes.number,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
};

export default StarRating;
