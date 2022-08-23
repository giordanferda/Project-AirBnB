import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSpotDetailById} from '../../store/spots'
import {useParams} from 'react-router-dom'

function GetSpotbyId(){
    const {spotId} = useParams()
    const spots = useSelector((state) => Object.values(state.spots))
    const spot = spots.find((spot) => spot.id == spotId);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotDetailById(spotId))
        // console.log()
    }, [dispatch])

    return (

        <div>
            {spot.name}
            {spot.city}, {spot.state}
            <img src={spot.previewImage} alt={spot.name}/>
            {/* {spots.map((spot, i) => (
            <div>
                <div>{spot.name}</div>
                <div>{spot.city}, {spot.state}</div>
                <img src={spot.previewImage} alt={spot.name}/>
            </div> */}
            {/* ))} */}
            </div>
    )
}

export default GetSpotbyId;
