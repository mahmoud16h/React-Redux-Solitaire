import React, { Component } from 'react';
import './app.sass';
import Header from '../header'
import Card from '../card'
import DealButton from '../dealButton'
import ContainerCard from '../containerCard'

import {connect} from 'react-redux';


class App extends Component {

    getContainers = () => {
        let containers = [];
        for (let i = 0 ; i < this.props.cards.dealtCards.length ; i++){
            containers.push(<ContainerCard key={i} arrayIndex={i} newCard={this.props.cards.dealtCards[i]}/>)
        }
        return containers
    }

    render() {


        return (
            <div>
                <Header/>
                <DealButton/>
                <Card />
                <div className="container-body">
                    {this.getContainers()}
                </div>
            </div>
        );
    }

}



const mapStateToProps = (state) =>{
    return {
        cards: state.cards,
        cardIndex: state.cards.index,
    }
}

export default connect(mapStateToProps)(App);
