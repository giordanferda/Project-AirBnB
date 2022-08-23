import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { allSpots, getSpotDetailById, getSpotsById } from "./store/spots";
import Spots from './components/Spots/index'


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  useEffect(() => {
    // dispatch(getSpotsById()) //works
    dispatch(allSpots())
    // dispatch(getSpotDetailById(2))
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <Spots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
