import React, {useRef} from 'react';
import classes from './Trip.module.css';
import Editable from '../../../../../Common/Editable/Editable';

function Trip(props) {
    const {tripDetails, allowTripSetup, tripDetailComponent, tripDetailComponentSettings, day_id, trip_id} = props;
    const inputRef = useRef();
    const tripTime = (allowTripSetup) ? (
        <Editable
            text={tripDetails.time}
            placeholder="Time"
            type="input"
            childRef={inputRef}
        >
            <input
                ref={inputRef}
                type="text"
                name="time"
                placeholder="Time"
                value={tripDetails.time}
                onChange={props.timeChanged}
            />
        </Editable>
    ) : tripDetails.time;

    const TripDetailComponent = tripDetailComponent;
    const tripSettings = (tripDetailComponent !== undefined) ? (
        <TripDetailComponent
            tripDetails={tripDetails}
            tripDetailComponentSettings={tripDetailComponentSettings}
            trip_id={trip_id}
            day_id={day_id}
        />
    ) : '';

    const tripClassNames = [classes.Trip];
    if (allowTripSetup) tripClassNames.push(classes.TripSetupMode);

    return (
        <div className={tripClassNames.join(' ' )}>
            <div>
                <div className={classes.TripTime}>{tripTime}</div>
                <div className={classes.TripSettings}>
                    {tripSettings}
                </div>
            </div>
        </div>
    );
}

export default Trip;