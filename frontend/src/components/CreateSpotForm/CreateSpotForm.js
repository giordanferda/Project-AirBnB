import React, { useState } from "react";
import { createSpot, allSpots } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const LAT = 37.7645358;
const LNG = -122.4730327;

function CreateSpot() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  function isImg(url) {
    return /\.(jpg|png|jpeg|svg|gif)$/.test(url);
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
      lat: LAT,
      lng: LNG,
      url,
      previewImage: true,
    };
    if (!isImg(url)) {
      setErrors({
        error: "Must be a valid image, expample: .jpg, .png, .jpeg, .svg, .gif",
      });
    }

    if (isImg(url)) {
      dispatch(createSpot(payload)).then(() => dispatch(allSpots()));
      // dispatch(createSpot(payload));
      history.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {Object.values(errors).map((error, i) => (
          <li key={i}>{error}</li>
        ))}
      </ul>
      <label>
        Address
        <input
          placeholder="City"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></input>
      </label>
      <label>City</label>
      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      ></input>
      <label>State</label>
      <input
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
      ></input>
      <label>Country</label>
      <input
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      ></input>
      <label>Name</label>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>Description</label>
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <label>price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <label>Spot Image</label>
      <input
        type="text"
        placeholder="image url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
      <button
        disabled={
          address.length === 0 ||
          city.length === 0 ||
          state.length === 0 ||
          country.length === 0 ||
          name.length === 0 ||
          description.length === 0 ||
          price < 1 ||
          url.length < 1
        }
      >
        Submit
      </button>
    </form>
  );
}

export default CreateSpot;
