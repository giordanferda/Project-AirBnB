import React, { useEffect, useState } from "react";
import { getSpotDetailById, getSpotsById, EditSpot} from '../../store/spots'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";



const LAT = 37.7645358
const LNG = -122.4730327

function EditSpotForm(){


    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)

    const {spotId} = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = () => {
        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
            lat:LAT,
            lng:LNG
        }
        dispatch(EditSpot(payload, spotId))
        history.push('/')
    }
    const spot = useSelector((state) => state.spots[0])
    // console.log(spot)

    useEffect(() => {
        dispatch(getSpotDetailById(spotId))
        // setAddress(spot.address)
    }, [])
    return(
        <form onSubmit={handleSubmit}>
            <label>
                addy
            <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}>
            </input>
            </label>
            <label>
                city
                </label>
            <input
            value={city}
            onChange={(e) => setCity(e.target.value)}>
            </input>
                <label>state</label>
            <input
            value={state}
            onChange={(e) => setState(e.target.value)}>
            </input>
            <label>country</label>
            <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}>
            </input>
            <label>name</label>
            <input
            value={name}
            onChange={(e) => setName(e.target.value)}>
            </input>
            <label>desc</label>
            <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}>
            </input>
            <label>price</label>
            <input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}>
            </input>
            <button disabled={address.length === 0 || city.length === 0 || state.length === 0 || country.length === 0 || name.length === 0 || description.length === 0 || price < 1 }>Submit</button>
        </form>
    )
}

export default EditSpotForm;
