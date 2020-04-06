import React from 'react';
import plusImage from '../../../assets/images/new.ico';
import classes from './Plus.module.css';

const plus = (props) => (
    <img className={classes.Plus} src={plusImage} onClick={props.clicked} title="Add" alt="Add Item" />
);

export default plus;