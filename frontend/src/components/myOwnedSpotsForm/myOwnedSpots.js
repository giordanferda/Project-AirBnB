import React, { useEffect } from "react";
import {getSpotsById } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { deleteYourSpot } from "../../store/spots";


const MyOwnedSpots = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const spots = useSelector((state) => Object.values(state.spots));
    const userSpots = spots.filter((spot) => spot.ownerId === user.id);


    useEffect(() => {
        dispatch(getSpotsById())
    }, [dispatch])

    const handleDelete = (spotId) => {
        dispatch(deleteYourSpot(spotId))
        history.push('/')
    }
    if (!spots){
        return null
    }
    return (
        <div>{userSpots.map((spot, i) => {
            return <div key={i}>{spot.address}
            <Link to={{pathname: `/editSpot/${spot.id}`, state: {spot}}}>Edit Your Spot</Link>
            <div>{spot.city}, {spot.state}</div>
            <div>{`$${spot.price} /night`}</div>
            <img src={spot.previewImage}></img>
            <button onClick={() => {handleDelete(spot.id)}}>Delete</button>
            </div>
        })}</div>
    )
}

export default MyOwnedSpots;
