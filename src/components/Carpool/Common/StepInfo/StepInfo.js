import React from 'react';
import classes from './StepInfo.module.css';

const stepInfo = (props) => (
    <div className={classes.Step}>
        <div className={classes.StepNumber}>Step {props.stepNumber}:</div>
        <div className={classes.StepInstructions}> {props.stepName}</div>
    </div>
);

export default stepInfo;