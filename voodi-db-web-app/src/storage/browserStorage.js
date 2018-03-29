import PropTypes from 'prop-types';

export const getData = function(src) {
    var stringData = localStorage.getItem(src);
    try{
        var objectData = JSON.parse(stringData);
        return objectData;
    } catch(exception) {
        if(exception.message === 'Unexpected token e in JSON at position 0') {
            return stringData;
        }
        return null;
    }
}

export const setData = function(src, data) {
    try {
        var stringData = JSON.stringify(data);
        localStorage.setItem(src, stringData);
        return data;
    } catch(exception) {
        localStorage.setItem(src, null);
        return null;
    }
}

getData.propTypes = {
    src: PropTypes.string.isRequired
}

setData.propTypes = {
    src: PropTypes.string.isRequired
}