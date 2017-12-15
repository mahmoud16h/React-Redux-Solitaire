import React, { Component } from 'react';
import './aceArea.sass';
import {connect} from 'react-redux'
import {moveCardToAce} from '../../actions/cardsActions'


class AceArea extends Component {

    onDrop = (event)=>{
        event.preventDefault();
        this.props.moveCardToAce(event.target.id)

    };

    onDragOver = (event)=>{
        event.preventDefault();
    };

    getAceContainers = ()=>{
        let aceContainers = [];
        for (let i=0; i < 4; i++){
            let card = this.props.aceArea[i][this.props.aceArea[i].length -1];
            let cardColor = "card-rank " + card.color;
            let cardSuit = "card-suit " + card.suit;
            let bottomCardColor = "card-rank-bottom " + card.color;
            aceContainers.push(<div onDragOver={this.onDragOver} onDrop={this.onDrop} id={i} className ='ace-area' key={i}>
                <div id={i} className={cardColor}>{card.rank!==0? card.name : null}</div>
                <div id={i} className={cardSuit}></div>
                <div id={i} className={bottomCardColor}>{card.rank!==0? card.name : null}</div>
            </div>)
        }
        return aceContainers
    };

    render() {
        return(
            <div className="aceContainer">
                {this.getAceContainers()}
            </div>
        )}
}

const mapStateToProps = (state) =>{
    return {
        aceArea: state.cards.aceArea
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        moveCardToAce: (arrayIndex) => dispatch(moveCardToAce(arrayIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AceArea);