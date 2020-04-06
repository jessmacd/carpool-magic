import React from 'react';
import StepInfo from '../Common/StepInfo/StepInfo';
import StepButtons from '../Common/StepButtons/StepButtons';
import CarpoolStructure from '../Common/CarpoolStructure/CarpoolStructure';
import TripSummary from './TripSummary';

const summary  = (props) => {

    const {days, riders, drivers} = props;
    const detailComponentData = {
        riders: riders,
        drivers: drivers
    };

    return (
        <div>
            <StepInfo stepNumber="5" stepName="Review and finalize!" />

            <CarpoolStructure
                days={days}
                tripDetailComponent={TripSummary}
                tripDetailComponentSettings={detailComponentData}
            >
            </CarpoolStructure>

            <StepButtons
                showPrevious={true}
                showNext={true}
                nextStep = {props.nextStep}
                nextLabel="Finalize!"
                previousStep = {props.prevStep}
            />
        </div>
    );
};

export default summary;