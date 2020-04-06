import React from 'react';
import StepInfo from '../Common/StepInfo/StepInfo';
import StepButtons from '../Common/StepButtons/StepButtons';
import CarpoolStructure from '../Common/CarpoolStructure/CarpoolStructure';

const tripSetup = (props) => {
    const {days, labelChanged, dayRemoved, timeChanged, dayAdded}  = props;

    return (
        <div>
            <StepInfo stepNumber="1" stepName="Plan your trips for the week" />
            <CarpoolStructure
                days={days}
                labelChanged={labelChanged}
                dayRemoved={dayRemoved}
                timeChanged={timeChanged}
                dayAdded={dayAdded}
                allowTripSetup={true}
            >
            </CarpoolStructure>
            <StepButtons showPrevious={false} showNext={true} nextStep = {props.nextStep} />
        </div>);
}

export default tripSetup;