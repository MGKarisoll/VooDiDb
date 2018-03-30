import React from 'react';
import { connect } from 'react-redux';
import TokenInfo from '../models/tokenInfo';

class AboutPage extends React.Component {
    render() {
        return(
            <p>
                This is About page
            </p>
        )            
    }
}

// const mapStateToProps = (state) => ({
//     user: new TokenInfo(state.token)
// });

const mapStateToProps = (state) => {
    
    var data = ({
        user: new TokenInfo(state.token)
    });

    console.log(data);

    return data
} 

export default connect(mapStateToProps)(AboutPage);
