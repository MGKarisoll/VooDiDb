import React from 'react';

class FormLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {login:"", password:""};

        this.loginOnChange = this.loginOnChange.bind(this);
        this.passwordOnChange = this.passwordOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginOnChange(e) {
        var val = e.target.value;
        this.setState({login: val});
    }

    passwordOnChange(e) {
        var val = e.target.value;
        this.setState({password: val});
    }

    handleSubmit(e) {
        e.preventDefaults();
        console.log(this.state);
    }

    render() {
        return 
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.loginOnChange} />
            <br/>
            <input type="password" onChange={this.passwordOnChange} />
            <br/>
            <button type="submit">Log in</button>
        </form>
        ;
    }
}