import actions from './actions';
import Immutable from 'immutable';


const initialWeatherState = localStorage.getItem('weathers') ?
    {
        weatherIds: Immutable.List(JSON.parse(localStorage.getItem('weatherIds'))),
        weathers: Immutable.Map((JSON.parse(localStorage.getItem('weathers'))))
    }
    : {weatherIds: Immutable.List(), weathers: Immutable.Map({})};


export default (state = initialWeatherState, action) => {
    switch (action.type) {
        case actions.ADD_WEATHER:
            const {data} = action.data;

            const newWeatherIds = state.weatherIds.concat(data.id);
            const newWeathers = state.weathers.set(data.id, data);

            return {weatherIds: newWeatherIds, weathers: newWeathers};
        case actions.DELETE_WEATHER:
            const deleteID = action.data.id;

            const newIds = state.weatherIds.filter(id => {
                return id !== deleteID
            });
            const newWeaths = state.weathers.delete(deleteID);

            return {weatherIds: newIds, weathers: newWeaths};
        case actions.CLEAR_WEATHERS:
            return {weathers: Immutable.Map({}), weatherIds: Immutable.List()};
    }
    return state;
};