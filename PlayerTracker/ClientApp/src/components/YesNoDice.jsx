import React, { Component } from 'react';
import axios from 'axios';

class YesNotDice extends Component {
    state = {
        fate:{}
    }
    getFate = () => {
        axios.get("https://yesno.wtf/api")
            .then(json => {
                console.log({json})
                this.setState({
                    fate: json.data
                })
            })
    }
    render() {
        return (
            <div>
                <button onClick={this.getFate}>Fate?</button>
                <section>
                    <header>{this.state.fate.answer}</header>
                    {this.state.fate.image && <img src={this.state.fate.image} alt={this.state.fate.answer}/>}
                </section>
            </div>
        );
    }
}

export default YesNotDice;
