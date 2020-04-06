import React from 'react';
import classes from './FieldPlaceholder.module.css';

const fieldPlaceholder = (props) => (
    <div className={classes.Placeholder}>{props.text}</div>
);

export default fieldPlaceholder;