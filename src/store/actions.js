const ADD_WEATHER = 'ADD_WEATHER';
const DELETE_WEATHER = 'DELETE_WEATHER';
const CLEAR_WEATHERS = 'CLEAR_WEATHERS';

const addWeather = data => {
    return {
        type: ADD_WEATHER,
        data
    }
};

const deleteWeather = data => {
    return {
        type: DELETE_WEATHER,
        data
    }
};

const clearWeather = () => {
    return {
        type: CLEAR_WEATHERS,
    }
};

export default {
    addWeather,
    deleteWeather,
    clearWeather,

    DELETE_WEATHER,
    ADD_WEATHER,
    CLEAR_WEATHERS,
}


