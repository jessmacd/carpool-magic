import React from 'react';
import classes from './StepButtons.module.css';

const stepButtons = (props) => {
    const previousButton = (props.showPrevious) ? (
        <button
            className={classes.StepButtonPrevious}
            onClick={props.previousStep}>
            Previous Step
        </button>)
        : <div className={classes.StepButtonPrevious} />;
    const nextButton = (props.showNext) ? (
        <button
            className={classes.StepButtonNext}
            onClick={props.nextStep}>
            {(props.nextLabel)  ? props.nextLabel : "Next Step"}
        </button>)
        : '';

    return (<div className={classes.StepButtons}>
        {previousButton}
        {nextButton}
    </div>);
};

export default stepButtons;