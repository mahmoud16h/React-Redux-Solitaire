import React, { Component } from 'react';
import {connect} from 'react-redux';
import {dealDeck} from '../../actions/cardsActions'

class DealButton extends Component {

    render() {
        return(
            <button onClick={() => this.props.dealDeck()}>
                Start New Game
            </button>
        )}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        dealDeck : () => dispatch(dealDeck()),
    }
}

export default connect(null, mapDispatchToProps)(DealButton);