const getLogin = function() {
    try {
        let data = localStorage.getItem('login');
        if(data) {
        return JSON.parse(data);
        } else {
            setLogin({});
        return getLogin();
        }
    } catch(e) {
        return null;
    }
};
  
const setLogin = function(data) {
    try {
        localStorage.setItem('login', JSON.stringify(data));
    } catch(e) { }
}

const logins = (state = getLogin(), action) => {
    let data;
    switch (action.type) {
        case 'LOG_IN':
            data = action.token;
            setLogin(data);
            return data;
        case 'LOG_OUT':
            data = null;
            setLogin(data);
            return data;
        default:
            return state
    }
  }
  
  export default logins