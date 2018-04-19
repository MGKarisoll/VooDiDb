import { connect }      from 'react-redux'
import { changeLang }   from '../actions/langActions.js';
import React            from 'react';

class Footer extends React.Component {

    onChangeToRU = (e) => {
        e.preventDefault();
        this.props.changeLang('ru');
        document.getElementsByTagName('html')[0].setAttribute('lang','ru'); 
    }

    onChangeToEn = (e) => {
        e.preventDefault();
        this.props.changeLang('en');
        document.getElementsByTagName('html')[0].setAttribute('lang','en'); 
    }

    render() {
        return(
            <div className="footer">
                <a href="!#" onClick={this.onChangeToRU}>ru</a> | <a href="!#" onClick={this.onChangeToEn}>eng</a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    lang: state.lang
});

const mapDispatchToProps = dispatch => ({
    changeLang: lang => dispatch(changeLang(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);