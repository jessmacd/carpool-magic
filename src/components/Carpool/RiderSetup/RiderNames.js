import React, {useRef} from 'react';
import Editable from '../../Common/Editable/Editable';
import Select from 'react-select'
import FieldPlaceholder from '../Common/FieldPlaceholder/FieldPlaceholder';

function RiderNames (props) {
    const {tripDetails, tripDetailComponentSettings, day_id, trip_id} = props;
    const allRiders = tripDetailComponentSettings.riders;
    const tripRiders = tripDetails.riders;
    const tripRidersDisplay = tripRiders.map(rider_id => allRiders.find(riderDetail => riderDetail.id === rider_id).name).join(', ' );

    //Set up options for the multiselect
    const riderOptions = allRiders.map((rider) => ({value: rider.id, label: rider.name}));
    const defaultRiders = riderOptions.filter(rider => tripRiders.includes(rider.value));
    const placeHolder = <FieldPlaceholder text={'Select riders'} />
    const inputRef = useRef();
    return (

      <div>
          <Editable
              text={tripRidersDisplay}
              placeholder={placeHolder}
              type="input"
              childRef={inputRef}
          >
              <Select
                  ref={inputRef}
                  className="inputSettings"
                  options={riderOptions}
                  defaultValue={defaultRiders}
                  isMulti
                  onChange={(newValues) => {tripDetailComponentSettings.ridersChanged(newValues, day_id, trip_id )}}
              />
          </Editable>
      </div>
    );
};

export default RiderNames;