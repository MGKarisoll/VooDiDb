import {getData, setData} from '../storage/browserStorage.js'

const lang = (state = getData("lang"), action) => {
    switch (action.type) {
        case "CHANGE_LANG":
            return setData("lang", action.lang);
        default:
            return state;
    }
}

export default lang;