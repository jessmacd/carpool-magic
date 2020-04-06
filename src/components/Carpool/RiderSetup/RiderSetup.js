import React from 'react';
import StepInfo from '../Common/StepInfo/StepInfo';
import StepButtons from '../Common/StepButtons/StepButtons';
import CarpoolStructure from '../Common/CarpoolStructure/CarpoolStructure';

import RiderNames from './RiderNames';

const riderSetup  = (props) => {

    const {days, riders, ridersChanged} = props;
    const detailComponentData = {
        riders: riders,
        ridersChanged: ridersChanged
    };

    return (
        <div>
            <StepInfo stepNumber="2" stepName="Who is riding this week?" />

            <CarpoolStructure
                days={days}
                tripDetailComponent={RiderNames}
                tripDetailComponentSettings={detailComponentData}
            >
            </CarpoolStructure>

            <StepButtons showPrevious={true} showNext={true} nextStep = {props.nextStep} previousStep = {props.prevStep}/>
        </div>

    );
};

export default riderSetup;