import React, {useRef} from 'react';
import Select from 'react-select'
import Editable from '../../Common/Editable/Editable';
import FieldPlaceHolder from '../Common/FieldPlaceholder/FieldPlaceholder';

function DriverConflicts (props) {

    const {tripDetails, tripDetailComponentSettings, day_id, trip_id} = props;

    const allDrivers = tripDetailComponentSettings.drivers;
    const tripDriverConflicts = (tripDetails.driver_conflicts) ? tripDetails.driver_conflicts : [];
    const tripDriverConflictsDisplay = (tripDriverConflicts.length > 0) ?
         tripDriverConflicts.map(driver_id => allDrivers.find(driverDetail => driverDetail.id === driver_id).name).join(', ' ) :
        null;

    //Set up options for the multiselect
    const driverConflictOptions = allDrivers.map((driver) => ({value: driver.id, label: driver.name}));
    const defaultValues = driverConflictOptions.filter(driver => tripDriverConflicts.includes(driver.value));
    const placeHolder = <FieldPlaceHolder text={'No driver conflicts'} />
    const inputRef = useRef();

    return (
      <div>
          <Editable
              text={tripDriverConflictsDisplay}
              placeholder={placeHolder}
              type="input"
              childRef={inputRef}
          >
              <Select
                  ref={inputRef}
                  options={driverConflictOptions}
                  defaultValue={defaultValues}
                  isMulti
                  onChange={(newValues) => {tripDetailComponentSettings.driverConflictChanged(newValues, day_id, trip_id )}}
              />
          </Editable>
      </div>
    );
};

export default DriverConflicts;