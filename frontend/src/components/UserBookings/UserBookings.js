import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBookingsByUser } from "../../store/bookings";
import { deleteBookingId } from "../../store/bookings";
import "./UserBookings.css";

function UserBookings() {
const bookings = useSelector((state) => Object.values(state.bookings));
console.log("THIS IS BOOKINGS", bookings);
const dispatch = useDispatch();
const history = useHistory();

const todayDate = (new Date().toISOString().slice(0, 10));

// bookings.sort(function(a,b) {
//     return new Date(a.endDate) - new Date(b.endDate);
// });

// const filteredBookings = bookings.filter((booking) => {
//     return booking.endDate >= todayDate;
// });

const [isLoaded, setIsLoaded] = useState(false);


useEffect(() => {
    dispatch(getBookingsByUser()).then(() => setIsLoaded(true));
}, [dispatch]);

if (!isLoaded) {
    return null;
}

let userBookings;

if (Object.keys(bookings).length === 0) {
    userBookings = (
        <div className="no-bookings">
            <h2>You have no bookings</h2>
        </div>
    )
} else {
    userBookings = (
        <div className="bookings-container">
            <h2>Upcoming Bookings</h2>
            {bookings.map((booking) => (
                <div className="booking-card" key={booking.id}>
                    <div className="booking-card-left">
                        <div className="booking-card-info">
                            <h3>{booking.Spot.name}</h3>
                            <p>{booking.startDate} - {booking.endDate}</p>
                        </div>
                        <div className="booking-card-buttons">
                            <NavLink to={`/spots/${booking.Spot.id}`} className="booking-card-button">View Spot</NavLink>
                            <button className="booking-card-button" onClick={() => dispatch(deleteBookingId(booking.id))}>Cancel Booking</button>
                        </div>
                    </div>
                    <div className="booking-card-right">
                        <img src={booking.Spot.previewImage} alt="Spot" />
                    </div>
                </div>
            ))}
        </div>
    )
}

return (
 <div className="user-booking-container">
      <div className="user-booking-inner-container">
        <div className="user-booking-header">My Bookings</div>
        {userBookings}
      </div>
    </div>
)
}


export default UserBookings;
