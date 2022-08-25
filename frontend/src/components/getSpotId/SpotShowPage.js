import React, { useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getSpotDetailById} from '../../store/spots'
import {useParams} from 'react-router-dom'
import CreateReview from '../CreateReviewForm/CreateReviewForm';
import { allReviews } from '../../store/reviews';

function GetSpotbyId(){

    const {spotId} = useParams()
    const spots = useSelector((state) => Object.values(state.spots))
    const spot = spots.find((spot) => spot.id == spotId);
    const dispatch = useDispatch()

    const user = useSelector((state) => state.session.user)
    const reviews = useSelector((state) => Object.values(state.reviews))
    useEffect(() => {
      dispatch(getSpotDetailById(spotId))
      dispatch(allReviews(spotId))
    }, [dispatch])

    const filterReviews = reviews.filter((review) => {
      return review.spotId === spotId
    })
    const alreadyReviewed = (reviews) => {
      let alreadyReviewedByUser = false
      for (let i = 0; i < reviews.length; i++ ){
        if (reviews[i].userId === user.id){
          alreadyReviewedByUser = true
        } else {
          alreadyReviewedByUser = false
        }
      }
      return alreadyReviewedByUser
    }

    if (spot === undefined){
        return;
    }

    return (
      <div className="spot-detail-review">
        {spot && spot?.Images?.map((image, index) => <img src={image.url} key={'imageId: ' + JSON.stringify(index)}/> )}
          {user && <CreateReview spotId={spot?.id}/>}
        REVIEWS: {reviews.map((review, i) => (
          <div key={review.id} review={review}>Review {i + 1}: {''}
          <i className="fa-solid fa-star"></i> {review.stars} {review.review}</div>
        ))}
      </div>
    )
}

export default GetSpotbyId;
