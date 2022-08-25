import React, { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSpotDetailById} from '../../store/spots'
import {useParams} from 'react-router-dom'
import CreateReview from '../CreateReviewForm/CreateReviewForm';

function GetSpotbyId(){

    const {spotId} = useParams()
    const spots = useSelector((state) => Object.values(state.spots))
    const spot = spots.find((spot) => spot.id == spotId);
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => Object.values(state.reviews))
    const thisSpotsReviews = reviews.filter((review) => review.spotId === spotId)
    useEffect(() => {
      dispatch(getSpotDetailById(spotId))
    }, [dispatch])

    if (spot === undefined){
        return;
    }

    return (
            <div>
            {spot?.name}
            {spot?.city}, {spot?.state}
            {spot && spot?.Images?.map((image, index) => <img src={image.url} key={'imageId: ' + JSON.stringify(index)}/> )}
            {user && <CreateReview spotId={spot?.id}/>}
            {thisSpotsReviews.map((review, index) => <div key={index}>{review.review}</div>) }
            </div>
    )
}

export default GetSpotbyId;
