import {getData, setData} from '../storage/browserStorage.js'

const token = (state = getData("token"), action) => {
    console.log(action);
    switch (action.type) {
        case "SIGN_IN":
            return setData("token", action.token);
        case "SIGN_OUT":
            return setData("token", null);
        default:
            return state;
    }
}

export default token;