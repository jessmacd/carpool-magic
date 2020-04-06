import React from 'react';
import CarpoolDay from './CarpoolDay/CarpoolDay';
import classes from './CarpoolStructure.module.css';
import Plus from '../../../Common/Plus/Plus';

const carpoolStructure = (props) => {
    const {days, allowTripSetup, tripDetailComponent, tripDetailComponentSettings} = props;

    const allDays = days.map((day, index) => {
        return (
            <CarpoolDay
                key={index}
                day_id={index}
                day={day}
                labelChanged={(event) => props.labelChanged(event, index)}
                dayRemoved={() => props.dayRemoved(index)}
                timeChanged={props.timeChanged}
                allowTripSetup ={allowTripSetup}
                tripDetailComponent={tripDetailComponent}
                tripDetailComponentSettings={tripDetailComponentSettings}
            >{props.children}</CarpoolDay>
        );
    });

    const addDay = (allowTripSetup) ?  (
        <div className={classes.AddDay}>
            <Plus clicked={props.dayAdded} />
            <div className={classes.AddDayLabel} onClick={props.dayAdded}>Add Day</div>
        </div>
    ) : '';

    return (
        <div>
            <div className={classes.CarpoolDaysWrapper}>
                {allDays}
                {addDay}
            </div>
        </div>);
}


export default carpoolStructure;