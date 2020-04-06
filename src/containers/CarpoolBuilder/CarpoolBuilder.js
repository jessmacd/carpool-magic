import React, {Component} from 'react';
import axios from '../../axios-carpool';
import TripSetup from '../../components/Carpool/TripSetup/TripSetup';
import RiderSetup from '../../components/Carpool/RiderSetup/RiderSetup';
import DriverConflictSetup from '../../components/Carpool/DriveConflictSetup/DriverConflictSetup';
import DriverAssignment from '../../components/Carpool/DriverAssignment/DriverAssignment';
import Summary from '../../components/Carpool/Summary/Summary';
import Modal from '../../components/UI/Modal/Modal';

class CarpoolBuilder extends Component {

    /**
     *  For demo purposes. Ideally this would come from a group-based configuration
     */
    getDefaultDayTrips = (riders) => {
        return [
            {time: '7:30 AM', riders: (riders) ? riders : [], driver: null},
            {time: '4:15 PM', riders: (riders) ? riders : [], driver: null}
        ];
    };

    //Initialize the state
    state = {
        step: 1,
        maxStep: 5,
        drivers: [],
        riders: [],
        autoAssign: true,
        showModal: false,
        modalMessage: '',

        //For demo purposes.  In reality, we'd have this pulled from a "starter schedule" set up by an admin for the group
        carpoolDays: [
            {
                day_label: 'Monday',
                trips: this.getDefaultDayTrips()
            },
            {
                day_label: 'Tuesday',
                trips: this.getDefaultDayTrips()
            },
            {
                day_label: 'Wednesday',
                trips: this.getDefaultDayTrips()
            },
            {
                day_label: 'Thursday',
                trips: this.getDefaultDayTrips()
            },
            {
                day_label: 'Friday',
                trips: this.getDefaultDayTrips()
            }
        ],

        tripRidersInitialized: false
    };

    /**
     * A day has been added to a carpool planning period
     */
    dayAddedHandler = () => {

        const carpoolDays = [...this.state.carpoolDays];
        const {riders} = this.state;

        const newDay = {
            day_label: 'New Day',
            trips: this.getDefaultDayTrips(riders.map((rider) => rider.id)),
        };
        carpoolDays.push(newDay);
        this.setState(() => {
            return {
                carpoolDays: carpoolDays
            }
        });
    }

    /**
     * The label for a carpool day has been updated
     */
    dayLabelChangedHandler = (event, id) => {
        const carpoolDays = [...this.state.carpoolDays];
        const carpoolDay = carpoolDays[id];
        carpoolDay.day_label= event.target.value;
        carpoolDays[id] = carpoolDay;

        this.setState(() => {
            return {
                carpoolDays: carpoolDays
            }
        });
    }

    /**
     * A day has been removed from a carpool planning period
     */
    dayRemovedHandler = (id) => {
        const carpoolDays = [...this.state.carpoolDays];
        const newCarpoolDays = carpoolDays.filter((value, index) => {return index!==id; });

        this.setState(() => {
            return {
                carpoolDays: newCarpoolDays
            }
        });
    };

    /**
     * Change the 'time' label for a trip
     */
    timeChangedHandler = (event, day_id, trip_id) => {
        this.tripDataChangeHandler('time',event.target.value, day_id, trip_id);
    };

    /**
     * Set who is riding on a trip
     */
    ridersChangedHandler = (newValues, day_id, trip_id) => {
        const selectedIds = (newValues) ? newValues.map(item => item.value) : [];
        this.tripDataChangeHandler('riders',selectedIds, day_id, trip_id);
    };

    /**
     * Define any conflicts for specific drivers for a trip
     */
    driverConflictChangedHandler = (newValues, day_id, trip_id) => {
        const selectedIds = (newValues) ? newValues.map(item => item.value) : [];
        this.tripDataChangeHandler('driver_conflicts',selectedIds, day_id, trip_id);
    };

    /**
     * Assign a driver to a trip
     */
    driverAssignmentChangedHandler = (newValue, day_id, trip_id)  => {
        this.tripDataChangeHandler('driver_id', newValue, day_id, trip_id);
    }

    /**
     * Assign a driver to a trip
     */
    autoAssignChangedHandler = (newValue)  => {
        this.setState({autoAssign: newValue});
    }

    /**
     * Set any particular attribute on a trip
     */
    tripDataChangeHandler = (trip_key, new_value, day_id, trip_id) => {

        const carpoolDays = [...this.state.carpoolDays];
        const carpoolDay = carpoolDays[day_id];

        carpoolDay.trips[trip_id][trip_key] = new_value;
        carpoolDays[day_id] = carpoolDay;

        this.setState(() => {
            return {
                carpoolDays: carpoolDays
            }
        });
    };

    /**
     * If indicated, cal the backend for automated driver assignment
     */
    assignDriversStep = () => {
        const { autoAssign, carpoolDays } = this.state;
        if (autoAssign) {
            //call backend to get assignments, then go to next step
            axios.post('driver_assignment', {days: carpoolDays})
                .then(response => {
                    if(response.data.days) this.setState({carpoolDays: response.data.days})
                    this.nextStep();
                })
                .catch((error) => {
                    this.setState({showModal: true, modalMessage: 'Unable to automatically assign drivers.  You can try adjusting your set-up or simply assign drivers manually!'});
            });

        } else{
            //If any drivers are not assigned, don't allow proceeding to next step
            const unassignedDrivers = this.state.carpoolDays.reduce((acc, thisDay) => {
                return acc + parseFloat(thisDay.trips.reduce((tripAcc, thisTrip) => {
                    return tripAcc + ((thisTrip.driver) ? 0 : 1);
                }, 0));
            }, 0);

            if (unassignedDrivers > 0) {
                this.setState({showModal: true, modalMessage: 'Please assign a driver to all trips before proceeding.'});
            } else {
                this.nextStep();
            }
        }
    }

    /**
     * Save the carpool driver assignments
     */
    saveCarpoolStep = () => {
        const {carpoolDays } = this.state;
        axios.post('carpools', {days: carpoolDays, planning_open: 0})
            .then(response => {
                this.setState({
                    step: 1,
                    showModal: true,
                    modalMessage: 'Carpool Saved!',
                    days: this.getDefaultDayTrips()
                });
                this.setState({showModal: true, modalMessage: 'Way to go, your carpool is finalized!'});
            })
            .catch((error) => {
                this.setState({showModal: true, modalMessage: 'Uh oh!  We are not able to save the carpool at this time. '});
            });
    };

    handleModalClose = () => {
        this.setState({showModal: false});
    }

    nextStep = () => {
        const { step, maxStep } = this.state
        this.setState({
            step : (step < maxStep) ? step + 1 : step
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : (step > 1) ? step - 1 : step
        })
    }

    componentDidMount() {
        //Load drivers from backend
        axios.get('drivers')
            .then(response => {
                this.setState({drivers: response.data})
            });

        //Load riders from backend
        axios.get('riders')
            .then(response => {
                const allRiders = response.data;
                const newState = {riders: allRiders};

                if (!this.state.tripRidersInitialized) {
                    //Put all riders on all trips
                    const allRiderIds = allRiders.map((rider) => rider.id);
                    const newCarpoolDays = [...this.state.carpoolDays];
                    newCarpoolDays.map(day => {
                        day.trips = day.trips.map(trip => ({...trip, riders: allRiderIds}));
                        return day;
                    });
                    newState.carpoolDays  = newCarpoolDays;
                    newState.tripRidersInitialized  = true;
                }

                this.setState(newState)
            });
    }

    render() {
        const {step, carpoolDays, riders, drivers, autoAssign, showModal, modalMessage} = this.state;

        const modal = (<Modal show={showModal} modalClosed={this.handleModalClose}>
            {modalMessage}
        </Modal>);

        switch(step) {
            case 1:
                return <div>
                    {modal}
                    <TripSetup
                    nextStep={this.nextStep}
                    days={carpoolDays}
                    labelChanged ={this.dayLabelChangedHandler}
                    dayAdded = {this.dayAddedHandler}
                    dayRemoved = {this.dayRemovedHandler}
                    timeChanged = {this.timeChangedHandler}
                    />
                </div>
            case 2:
                return <RiderSetup
                    days={carpoolDays}
                    riders={riders}
                    ridersChanged={this.ridersChangedHandler}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                />
            case 3:
                return <DriverConflictSetup
                    days={carpoolDays}
                    drivers={drivers}
                    driverConflictChanged={this.driverConflictChangedHandler}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                />
            case 4:
                return <div>
                    {modal}
                    <DriverAssignment
                        days={carpoolDays}
                        drivers={drivers}
                        riders={riders}
                        autoAssign={autoAssign}
                        autoAssignChanged={this.autoAssignChangedHandler}
                        driverAssignmentChanged={this.driverAssignmentChangedHandler}
                        nextStep={this.assignDriversStep}
                        prevStep={this.prevStep}
                    />
                </div>
            case 5:
                return <div>
                    {modal}
                    <Summary
                        days={carpoolDays}
                        drivers={drivers}
                        riders={riders}
                        nextStep={this.saveCarpoolStep}
                        prevStep={this.prevStep}
                    />
                </div>
            default:
                return '';
        }
    }
}

export default CarpoolBuilder;