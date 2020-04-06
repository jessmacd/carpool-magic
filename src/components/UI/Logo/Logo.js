import React from 'react';
import carLogo from '../../../assets/images/car_icon.png';
import classes from './Logo.module.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={carLogo} alt="Vroom!" />
    </div>
);

export default logo;