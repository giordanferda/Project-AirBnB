import React, { useEffect, useState } from 'react';
import { allSpots } from '../../store/spots';
import {useSelector} from 'react-redux'
import { NavLink } from 'react-router-dom';

function Spots(){
    const spots = useSelector((state) => Object.values(state.spots));
    // console.log(spots, 'THIS IS OUR SPOT')
  return (
    <div className="page-container">
      <div className="spots-container">
        <div className="spots">
          {spots.map((spot) => (
           <>
           <NavLink className='allSpots' to={`/spots/${spot.id}`}>
            <div>{spot.city},{spot.state}</div>
            <div>{`$${spot.price} night`}</div>
           <img src={spot.previewImage} alt={spot.name}></img>
           </NavLink>
           </>
          ))
          }
        </div>
      </div>
    </div>
  );
}

export default Spots;
