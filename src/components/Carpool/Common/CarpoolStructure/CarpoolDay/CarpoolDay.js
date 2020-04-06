import React, {useRef} from 'react';
import classes from './CarpoolDay.module.css';
import Trip from './Trip/Trip';
import Editable from '../../../../Common/Editable/Editable';
import Minus from '../../../../Common/Minus/Minus';

function CarpoolDay (props) {
    const dayDetails = props.day;
    const allowTripSetup = props.allowTripSetup;
    const dayTrips = dayDetails.trips.map((trip, index) => {
        return (
            <Trip
                key={index}
                tripDetails={trip}
                allowTripSetup={allowTripSetup}
                timeChanged={(event) => props.timeChanged(event, props.day_id, index)}
                day_id={props.day_id}
                trip_id={index}
                riders={props.riders}
                tripDetailComponent={props.tripDetailComponent}
                tripDetailComponentSettings={props.tripDetailComponentSettings}
            >
                {props.children}
            </Trip>
        );
    });

    const removeDay = (allowTripSetup) ? (
        <div className={classes.RemoveDay}>
            <Minus clicked={props.dayRemoved}/>
        </div>
    ) : '';

    const inputRef = useRef();
    const dayName = (allowTripSetup) ? (
        <Editable
            text={dayDetails.day_label}
            placeholder="Label the day"
            type="input"
            childRef={inputRef}
        >
            <input
                ref={inputRef}
                type="text"
                name="day_label"
                placeholder="Label the day"
                value={dayDetails.day_label}
                onChange={props.labelChanged}
            />
        </Editable>
    ) : dayDetails.day_label;

    return (
        <div className={classes.CarpoolDay}>
            <div className={classes.CarpoolDayHeader}>
                <div className={classes.CarpoolDayName}>
                    {dayName}
                </div>
                {removeDay}
            </div>
            <div className={classes.CarpoolDayDetails}> {dayTrips}</div>
        </div>

    );
};

export default CarpoolDay;