import React, { Component } from 'react';
import {connect} from 'react-redux';
import {shuffleDeck} from '../../actions/cardsActions'

class ShuffleButton extends Component {

    render() {
        return(
            <div onClick={() => this.props.shuffleDeck()}>
                Shuffle deck
            </div>
        )}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        shuffleDeck : () => dispatch(shuffleDeck()),
    }
}

export default connect(null, mapDispatchToProps)(ShuffleButton);