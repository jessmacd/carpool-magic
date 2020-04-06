import React from 'react';
import minusImage from '../../../assets/images/delete.ico';
import classes from './Minus.module.css';

const minus = (props) => (
    <img className={classes.Minus} src={minusImage} title="Remove" alt="Remove" onClick={props.clicked}/>
);

export default minus;