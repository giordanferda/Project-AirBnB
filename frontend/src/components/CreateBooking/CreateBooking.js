import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createNewUserBooking, getBookingsById } from "../../store/bookings";
import "./CreateBooking.css";

const CreateBooking = (
  {
    // setStartDate,
    // setEndDate,
    // todayDate,
    // startDate,
    // endDate,
  }
) => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [errors, setErrors] = useState([]);
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const spots = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const spot = spots[spotId];
  console.log(spot, 'this is spot in create booking')
  const bookings = useSelector((state) => Object.values(state.bookings));
  console.log(bookings, 'this is bookings')

  const startDateNum = new Date(startDate) - 0;
  const endDateNum = new Date(endDate) - 0;

  const validations = () => {
    let errors = [];

    bookings?.map((booking) => {
      let bookedStartDate = new Date(booking?.startDate) - 0;
      let bookedEndDate = new Date(booking?.endDate) - 0;

      if (startDateNum >= endDateNum) {
        errors.push("Checkout cannot be the same as or before Check-in");
      }
      if (
        startDateNum === bookedStartDate ||
        startDateNum === bookedEndDate ||
        endDateNum === bookedStartDate ||
        endDateNum === bookedEndDate
      ) {
        errors.push("Chosen dates conflicts with an existing booking");
      }
      if (startDateNum > bookedStartDate && startDateNum < bookedEndDate) {
        errors.push("Chosen dates conflicts with an existing booking");
      }
      if (
        startDateNum < bookedStartDate &&
        endDateNum > bookedStartDate &&
        endDateNum < bookedEndDate
      ) {
        errors.push("Chosen dates conflicts with an existing booking");
      }
      if (startDateNum < bookedStartDate && endDateNum > bookedEndDate) {
        errors.push("Chosen dates conflicts with an existing booking");
      }

      return setErrors(errors);
    });
  };

  // console.log('THIS IS SPOT ID', spotId)

  useEffect(() => {
    dispatch(getBookingsById(spotId));
    validations();
  }, [startDateNum, endDateNum]);

  let errorsList;

  if (errors.length > 0) {
    errorsList = (
      <div className="createBookingErrorList">
        {errors.map((error, i) => (
          <div className="errorMessageContainer" key={i}>
            <i class="fa-solid fa-exclamation exclamation-point point"></i>
            <div className="errorMessage">{error}</div>
          </div>
        ))}
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      startDate,
      endDate,
    };

      if (spot?.ownerId === sessionUser.id) {
        let errors = [];
        errors.push("User cannot book their own listing");
        setErrors(errors);
      }
      if (errors.length === 0 && spot?.ownerId !== sessionUser.id) {
        dispatch(createNewUserBooking(spotId, data)).then((res) =>
          history.push(`/confirmed/${spotId}/${res.booking.id}`)
        );
      }
    // return dispatch(createNewUserBooking(spotId, data))
  };

  return (
    <div className="CreateBookingContainer">
      <form className="CreateBookingForm" onSubmit={handleSubmit}>
        <div className="handleErrors">{errorsList}</div>

        <div className="createBookingDiv">
          <div className="createBookingInputContainer">
            <label className="checkin-label">CHECK-IN {"   "} </label>
            <input
              className="BookingCheckinInput"
              type="date"
              onChange={(e) => setStartDate(e.target.value)}
              required
              min={todayDate}
              max={"9000-1-1"}
            />
          </div>

          <div className="createBookingInputContainer">
            <label className="checkout-label"> CHECKOUT </label>
            <input
              className="BookingCheckOutInput"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
              required
              min={todayDate}
              max={"9000-1-1"}
            />
          </div>
        </div>
        {/* <div className="howManyGuestsContainer">
          <div className="howManyGuestsLabel">GUESTS</div>
          <div className="HowManyGuestInput">4 guests</div>
        </div> */}
        <div className="CreateBookingContainer">
          <input
            className="BookingSubmit "
            type="Submit"
            defaultValue="Reserve"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateBooking;
