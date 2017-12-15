import React, { Component } from 'react';
import './containerCard.sass';
import {connect} from 'react-redux'
import {moveStack} from '../../actions/cardsActions'
import {moveStackTo} from '../../actions/cardsActions'

class ContainerCard extends Component {
    onDragStart = (event)=>{
        this.props.moveStack(this.props.newCard, event.target.id, this.props.arrayIndex)
    };

    onDragOver = (event)=>{
        event.preventDefault();
    };

    onDragDrop = (event)=>{
        event.preventDefault();
        this.props.moveStackTo(this.props.newCard, event.target.id, this.props.arrayIndex)
    };

    onDropThirteen = (event)=>{
        event.preventDefault();
        this.props.moveThirteen(this.props.arrayIndex)
    };

    getContainers = ()=>{
        let containers = [];
        for (let i = 0 ; i < this.props.newCard.length ; i++){
            let flipped = this.props.newCard[i].flipped;
            let card = this.props.newCard[i];
            let cardClass = "cCard " + card.color;
            let suitClass = "card-suit " + card.suit;
            let miniClass = "mini-suit " + card.suit;
            containers.push(<div className={cardClass} id={i} key= {i}
                                 style={{top: (i * 25) + 'px'}}
                                 draggable={this.props.newCard[i].flipped ? 'true': null}
                                 onDragStart={this.props.newCard[i].flipped ? this.onDragStart: null}
                                 onDragOver={this.onDragOver}
                                 onDrop={this.onDragDrop}

            >
                <div className='card-rank'>{flipped ? card.name :null}</div>
                <div className={flipped ? suitClass : null}></div>
                <div className={flipped ? miniClass : null}></div>
                <div className='card-rank-bottom'>{flipped ? card.name :null}</div>
            </div>)
        }
        return containers
    };


    render(){
        return(
            <div onDragOver={this.onDragOver} onDrop={this.props.containerDeck ? this.props.containerDeck.card[0].rank === 13 ? this.onDropThirteen: null: null} className="containers-parent">
                {this.getContainers()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        containerDeck : state.cards.containerDeck
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        moveStack: (array, card, arrayIndex) => dispatch (moveStack(array, card, arrayIndex)),
        moveStackTo: (array, card, arrayIndex) => dispatch (moveStackTo(array, card, arrayIndex)),
        moveThirteen: (arrayIndex) => dispatch (moveStackTo(null, null, arrayIndex))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ContainerCard);