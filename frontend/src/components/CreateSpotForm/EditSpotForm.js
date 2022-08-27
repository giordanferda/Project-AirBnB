import React, { useEffect, useState } from "react";
import { getSpotDetailById, EditSpot } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

// const LAT = 37.7645358
// const LNG = -122.4730327

function EditSpotForm() {
  const location = useLocation();

  const [address, setAddress] = useState(location.state.spot.address);
  const [city, setCity] = useState(location.state.spot.city);
  const [state, setState] = useState(location.state.spot.state);
  const [country, setCountry] = useState(location.state.spot.country);
  const [name, setName] = useState(location.state.spot.name);
  const [description, setDescription] = useState(
    location.state.spot.description
  );
  const [price, setPrice] = useState(location.state.spot.price);

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      address,
      city,
      state,
      country,
      name,
      description,
      price,
    };
    dispatch(EditSpot(payload, spotId));
    history.push("/");
  };
  // const spot = useSelector((state) => state.spots[0])

  // useEffect(() => {
  //     dispatch(getSpotDetailById(spotId))
  // }, [dispatch, spotId])

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Address
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </label>
      <label>City</label>
      <input value={city} onChange={(e) => setCity(e.target.value)}></input>
      <label>state</label>
      <input value={state} onChange={(e) => setState(e.target.value)}></input>
      <label>Country</label>
      <input
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      ></input>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Desc</label>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label>price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditSpotForm;
