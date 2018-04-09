import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import TokenInfo from '../models/tokenInfo';

export const Authorization = (allowedRoles, redirectPath) =>
    (WrappedComponent) => {
        class WithAuthorization extends React.Component {
            render() {                          
                let userHasAllowedRole = allowedRoles.indexOf(this.props.user.role) > -1;
                let userLoggedIn = this.props.user.isLogged;

                if(userLoggedIn) {
                    if (userHasAllowedRole) {
                        return <WrappedComponent {...this.props}/>;                    
                    } else {
                        return <Redirect to={redirectPath ? redirectPath : "/forbidden"}/>
                    }
                } else {
                    return <Redirect to={redirectPath ? redirectPath : "/forbidden"} />
                }                
            }
        }

        const mapStateToProps = (state) => {
            return {
                user: new TokenInfo(state.token)
            };
        };

        return connect(mapStateToProps)(WithAuthorization);
    }

export default Authorization;