import React from 'react';
import StepInfo from '../Common/StepInfo/StepInfo';
import StepButtons from '../Common/StepButtons/StepButtons';
import CarpoolStructure from '../Common/CarpoolStructure/CarpoolStructure';
import Switch from 'react-input-switch';
import SelectDriver from './SelectDriver';
import classes from './DriverAssignment.module.css';

const driverAssignment  = (props) => {

    const {days, drivers, riders, driverAssignmentChanged, autoAssign, autoAssignChanged} = props;

    const switchStyles = {
        container: {
            width: '50px',
            height: '25px'
        },
        track: {
            backgroundColor: '#cccccc',
        },
        trackChecked: {
            backgroundColor: '#cccccc'
        },
        button: {
            backgroundColor: '#666666',
            right: '25px'
        },
        buttonChecked: {
            backgroundColor: '#002B4F',
            left: '25px'
        }
    };
    const detailComponentData = {
        drivers: drivers,
        riders: riders,
        driverAssignmentChanged: driverAssignmentChanged
    };

    const manualAssign = (!autoAssign) ? (
        <CarpoolStructure
            days={days}
            tripDetailComponent={SelectDriver}
            tripDetailComponentSettings={detailComponentData}
        >
        </CarpoolStructure>
    ) : <div className={classes.AutoAssignEnabled} />;

    return (
        <div>
            <StepInfo stepNumber="4" stepName="Assign drivers to trips" />
            <div className={classes.AutoAssign}>
                <Switch
                    styles={switchStyles}
                    className={classes.AutoAssignSwitch} on={true} off={false} value={autoAssign} onChange={(newValue) => autoAssignChanged(newValue)} /> Automatically assign drivers?
            </div>
            {manualAssign}

            <StepButtons showPrevious={true} showNext={true} nextStep = {props.nextStep} previousStep = {props.prevStep}/>
        </div>
    );
};

export default driverAssignment;