import actions from './actions';


const initialWeatherState = {
    weathers: []
};

export default (state = initialWeatherState, action) => {
    switch (action.type) {
        case actions.ADD_WEATHER:
            console.log(action.data);
            // const newState = { weathers: state.weathers.concat(data) };
            return state;
    }
    return state;
};