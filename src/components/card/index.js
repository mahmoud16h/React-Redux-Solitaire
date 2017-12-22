import React, { Component } from 'react';
import './card.sass';
import {connect} from 'react-redux';
import {incrementCardIndex} from '../../actions/cardsActions'
import {moveDeckCard} from '../../actions/cardsActions'
import AceArea from '../aceArea'

class Card extends Component {

    onDrag = () => {
        this.props.moveDeckCard(this.props.cards[this.props.index], this.props.index)
    };


    render() {


        let card = this.props.cards[this.props.index];

        return(
            <div className="deck-container">
                <div className="cCard Deck" style= {{position: 'relative'}} onClick={() => {this.props.incrementCardIndex()}}>

                </div>
                <div draggable="true" onDrag={this.onDrag} className={card ? 'body ' + card.color : 'body' }>
                    <div  onDrag={this.onDrag} className="card-rank">{card ? card.name: null}</div>
                    <div  onDrag={this.onDrag} className={card ? "card-suit " + card.suit : null}></div>
                    <div  onDrag={this.onDrag} className="card-rank-bottom">{card ? card.name: null}</div>
                </div>
                <AceArea/>
            </div>
        )}
}

const mapDispatchToProps = (dispatch) =>{
    return {
        incrementCardIndex : () => dispatch(incrementCardIndex()),
        moveDeckCard: (toMove, index) => dispatch (moveDeckCard(toMove, index)),
    }
}

const mapStateToProps = (state) =>{
    return {
        cards: state.cards.myCards,
        index: state.cards.index,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);