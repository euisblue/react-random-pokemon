import React from "react";
import axios from "axios";
import './App.scss';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      imgSrc: '',
    }
  }
  async handleClick() {
    const max = 895;
    const min = 1;

    let index = Math.floor(Math.random() * max + min);

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
    console.log(response.data.sprites)
    let name = response.data.forms[0].name;
    name = name.charAt(0).toUpperCase() + name.slice(1);

    let src = response.data.sprites.other["official-artwork"].front_default;
    if (src === '' || src === undefined || src === null) {
      src = response.data.sprites.front_default;
    }
    this.setState({
      name: name,
      imgSrc: src
    })
    console.log(this.state.imgSrc);
  }

  render() {
    return (
      <div className="App">
        <header>{this.state.name}</header>
        <img src={this.state.imgSrc} alt=" " />
        <button onClick={() => { this.handleClick() }}>Generate</button>
      </div>
    );
  }
}