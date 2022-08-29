import React, { useEffect, useState } from "react";
import { getSpotDetailById, EditSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./EditSpotForm.css";
// import getAllSpots from "../getAllSpots/getAllSpots";
// const LAT = 37.7645358
// const LNG = -122.4730327

function EditSpotForm() {
  const history = useHistory();
  const location = useLocation();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.state) {
      dispatch(getSpotDetailById(spotId));
    }
  }, [dispatch]);
  const spot = useSelector((state) => state.spots[parseInt(spotId)]);

  const [address, setAddress] = useState(spot?.address);
  const [city, setCity] = useState(spot?.city);
  const [state, setState] = useState(spot?.state);
  const [country, setCountry] = useState(spot?.country);
  const [name, setName] = useState(spot?.name);
  const [description, setDescription] = useState(spot?.description);
  const [price, setPrice] = useState(spot?.price);

  if (!spot) {
    return;
  }

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
  return (
    <>
      <div className="editFormContainer">
        <h2 className="create-your-spot">Edit Your Spot</h2>
        <form className="Form-Component" onSubmit={handleSubmit}>
          <div>
            <label>Address</label>
            <input
              className="input-box-singup"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div>
            <label>City</label>
            <input
              className="input-box-singup"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></input>
          </div>
          <div>
            <label>state</label>
            <input
              className="input-box-singup"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Country</label>
            <input
              className="input-box-singup"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Name</label>
            <input
              className="input-box-singup"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div>
            <label>Desc</label>
            <input
              className="input-box-singup"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label>price</label>
            <input
              className="input-box-singup"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div>
            <button className="SpotButton" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditSpotForm;
