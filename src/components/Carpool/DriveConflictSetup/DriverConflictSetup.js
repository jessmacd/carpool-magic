import React from 'react';
import StepInfo from '../Common/StepInfo/StepInfo';
import StepButtons from '../Common/StepButtons/StepButtons';
import CarpoolStructure from '../Common/CarpoolStructure/CarpoolStructure';

import DriverConflicts from './DriverConflicts';

const driverConflictSetup  = (props) => {

    const {days, drivers, driverConflictChanged} = props;
    const detailComponentData = {
        drivers: drivers,
        driverConflictChanged: driverConflictChanged
    };

    return (
        <div>
            <StepInfo stepNumber="3" stepName="Are there any driver conflicts?" />

            <CarpoolStructure
                days={days}
                tripDetailComponent={DriverConflicts}
                tripDetailComponentSettings={detailComponentData}
            >
            </CarpoolStructure>

            <StepButtons showPrevious={true} showNext={true} nextStep = {props.nextStep} previousStep = {props.prevStep}/>
        </div>

    );
};

export default driverConflictSetup;