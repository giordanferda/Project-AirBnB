import React, { useEffect } from "react";
import {getSpotsById } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { EditSpot } from "../../store/spots";
import { useHistory, Link } from "react-router-dom";
import { deleteYourSpot } from "../../store/spots";


const MyOwnedSpots = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const mySpots = useSelector((state) => {
        return Object.values(state.spots)
    })
    useEffect(() => {
        dispatch(getSpotsById())
    }, [dispatch])

    const handleDelete = (spotId) => {
        dispatch(deleteYourSpot(spotId))
        history.push('/')
    }
    return (
        <div>{mySpots.map((spot, i) => {
            return <div key={i}>{spot.address}
            <Link to={`/editSpot/${spot.id}`}>Edit Your Spot</Link>
            <div>{spot.city}, {spot.state}</div>
            <div>{`$${spot.price} /night`}</div>
            <button onClick={() => {handleDelete(spot.id)}}>Delete</button>
            </div>
        })}</div>
    )
}

export default MyOwnedSpots;
