import React from 'react';

const Button = ({onClick}) => {
    return (
        <div className='LoadMoreButton'>
          <button 
          type='button' 
          className='Button' 
          onClick={onClick}>
              Load more
          </button>
        </div>
    );
};

export default Button;

