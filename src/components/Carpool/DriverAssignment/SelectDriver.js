import React from 'react';
import Editable from '../../Common/Editable/Editable';
import Select from 'react-select'
import FieldPlaceholder from '../Common/FieldPlaceholder/FieldPlaceholder';

const selectDriver = (props) => {

    const {tripDetails, tripDetailComponentSettings, day_id, trip_id} = props;

    const allDrivers = (tripDetailComponentSettings.drivers) ? tripDetailComponentSettings.drivers : [];
    const allRiders = (tripDetailComponentSettings.riders) ? tripDetailComponentSettings.riders : [];
    const tripDriverConflicts = (tripDetails.driver_conflicts) ? tripDetails.driver_conflicts : [];

    const tripRiderIds = (tripDetails.riders) ? tripDetails.riders : [];

    //Set up options for the multiselect
    const availableDriverOptions = allDrivers.map((driver) => {


        let disabled = false;

        //If they have a conflict they aren't an option
        if (tripDriverConflicts.includes(driver.id)) {
            disabled = true;
        } else {

            //If their child is not riding, they are not an option
            const childRiding = tripRiderIds.find(rider_id => {

                //Find the rider details
                const riderDetails = allRiders.find(riderDetail => riderDetail.id===rider_id);
                return riderDetails.parent_driver_id === driver.id;
            });

            if (!childRiding) disabled = true;
        }

        return {value: driver.id, label: driver.name, isDisabled: disabled};
    });

    const defaultValue = availableDriverOptions.find(driver => driver.value === tripDetails.driver_id);
    const selectedDriver = allDrivers.find(driver => driver.id === tripDetails.driver_id);
    const tripDriverDisplay = (selectedDriver) ? selectedDriver.name : null;
    const placeHolder = <FieldPlaceholder text={'Select a driver'} />

    return (

      <div>
          <Editable
              text={tripDriverDisplay}
              placeholder={placeHolder}
              type="input"
          >
              <Select
                  options={availableDriverOptions}
                  defaultValue={defaultValue}
                  onChange={(selection) => {tripDetailComponentSettings.driverAssignmentChanged(selection.value, day_id, trip_id )}}
              />
          </Editable>
      </div>
    );
};

export default selectDriver;