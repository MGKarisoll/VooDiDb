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
    switch (action.type) {
        case 'LOG_IN':
            setLogin(action.token);
            return state;
        case 'LOG_OUT':
            setLogin(null);
            return state;
        default:
            return state
    }
  }
  
  export default logins