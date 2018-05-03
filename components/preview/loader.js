import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({children}) => (
  <div className='container'>
    <div className='grid'>
      <div className='cube cube1' />
      <div className='cube cube2' />
      <div className='cube cube3' />
      <div className='cube cube4' />
      <div className='cube cube5' />
      <div className='cube cube6' />
      <div className='cube cube7' />
      <div className='cube cube8' />
      <div className='cube cube9' />
    </div>

    <div className='text'>
      {children}
    </div>

    <style jsx>{`
      @import 'colors';

      .container {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
        width: 102px;
        height: 102px;
        margin: auto;
      }

      .text {
        color: $blue;
        font-weight: bold;
        text-align: center;
      }

      .cube {
        width: 28px;
        height: 28px;
        margin: 3px;
        background-color: $blue;
        animation: cube-delay 1.8s infinite cubic-bezier(0.9,-0.2, 0.63, 2.2);
        border-radius: 50%;
      }

      .cube1 {
        animation-delay: 0.2s;
      }
      .cube2 {
        animation-delay: 0.3s;
      }
      .cube3 {
        animation-delay: 0.4s;
      }
      .cube4 {
        animation-delay: 0.1s;
      }
      .cube5 {
        animation-delay: 0.2s;
      }
      .cube6 {
        animation-delay: 0.3s;
      }
      .cube7 {
        animation-delay: 0.0s;
      }
      .cube8 {
        animation-delay: 0.1s;
      }
      .cube9 {
        animation-delay: 0.2s;
      }

      @keyframes cube-delay {
        0%, 70%, 100% {
          transform: scale3D(1, 1, 1);
        }
        35% {
          transform: scale3D(0, 0, 1);
        }
      }
    `}</style>
  </div>
)

Loader.propTypes = {
  children: PropTypes.node.isRequired
}

export default Loader
