import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSpotDetailById} from '../../store/spots'
import {useParams} from 'react-router-dom'

function GetSpotbyId(){
    const {spotId} = useParams()
    const spots = useSelector((state) => Object.values(state.spots))
    const spot = spots.find((spot) => spot.id == spotId);

    // if (!spot){
    //     return null
    // }

    return (

            <div>
            {spot.name}
            {spot.city}, {spot.state}
            <img src={spot.previewImage}/>
            </div>
    )
}

export default GetSpotbyId;
