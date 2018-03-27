import React from 'react'

const LoginForm = ({ token, fnLogIn, fnLogOut }) => {
    console.log(token);
    console.log(fnLogIn);
    console.log(fnLogOut);

    let login;
    let password;

    if(!token || !token.isLoggedIn) {
        return (
            <div>
                <form onSubmit={e => {
                    e.preventDefault()
                    if (!login.value.trim()) {
                        return;
                    }
                    if(!password.value.trim()) {
                        return;
                    }
                    
                    var headers = {
                        'Accept': 'application/json',
                        'Content-Type':'application/x-www-form-urlencoded'
                    }      
    
                    var params = {
                        username: login.value,
                        password: password.value,
                        grant_type: 'password',
                        client_id: '44c11f290c604cc8a73da9e99c73be06'
                    };
            
                    var formBody = [];
                    for (var property in params) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(params[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                    }
                    formBody = formBody.join("&");
            
                    var request = {
                        method: 'POST',
                        headers: headers,
                        body: formBody
                    };
            
                    fetch('http://localhost:7507/oauth2/token', request)
                    .then(function(response) {
                        return response.json();
                    }).then(function(json) {
                        fnLogIn(json.access_token)
    
                        login.value = '';
                        password.value = '';
                    });
                }}>
                    <input ref={node => login = node} />
                    <br/>
                    <input ref={node => password = node} type='password' />
                    <br/>
                    <button type="submit">Log in</button>
                </form>
            </div>
        )
    } else {
        return (
            <button onClick={ e=> {
                fnLogOut()
            }}>Log out</button>
        )
    }    
}

export default LoginForm