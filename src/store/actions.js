const ADD_WEATHER = 'ADD_WEATHER';
const DELETE_WEATHER = 'DELETE_WEATHER';
const CLEAR_WEATHERS = 'CLEAR_WEATHERS';

const addWeather = data => {
    return {
        type: ADD_WEATHER,
        data
    }
};

const deleteWeather = id => {
    return {
        type: DELETE_WEATHER,
        id
    }
};

export default {
    addWeather,
    deleteWeather,

    DELETE_WEATHER,
    ADD_WEATHER,
    CLEAR_WEATHERS,
}


