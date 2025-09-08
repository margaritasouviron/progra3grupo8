import React, { Component } from 'react';
import Formulario from '../../components/Formulario/Formulario'
import Videos from '../../components/Videos/Videos'
import './styles.css';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: ''
    };
  }

  actualizarBusqueda = (valor) => {
    this.setState({ query: valor });
  }

  render(){
    return (
      <div>
        <h1>Home</h1>
        <Formulario onChange={this.actualizarBusqueda} />
        <Videos tipo="peliculas" query={this.state.query} />
        <Videos tipo="series" query={this.state.query} />
      </div>
    );
  }
}

export default Home;
