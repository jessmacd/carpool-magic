import React from 'react';
import classes from './Summary.module.css';

const tripSummary = (props) => {
    const {tripDetails, tripDetailComponentSettings} = props;
    const allRiders = tripDetailComponentSettings.riders;
    const tripRiders = tripDetails.riders;
    const tripRidersDisplay = tripRiders.map(rider_id => allRiders.find(riderDetail => riderDetail.id === rider_id).name).join(', ' );

    const allDrivers = (tripDetailComponentSettings.drivers) ? tripDetailComponentSettings.drivers : [];
    const selectedDriver = allDrivers.find(driver => driver.id === tripDetails.driver_id);
    const tripDriverDisplay = (selectedDriver) ? selectedDriver.name : null;

    return (
      <div className={classes.SummaryInfo}>
          <div>
              <span className={classes.SummaryLabel}>Driver: </span> {tripDriverDisplay}
          </div>
          <div className={classes.Riders}>
              <span className={classes.SummaryLabel}>Riders: </span> {tripRidersDisplay}
          </div>
      </div>
    );
};

export default tripSummary;