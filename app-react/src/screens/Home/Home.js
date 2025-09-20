import React, { Component } from 'react';
import Formulario from '../../components/Formulario/Formulario'
import Videos from '../../components/Videos/Videos'
import './styles.css';

class Home extends Component {
  render(){
    return (
      <div className="body">
        <Formulario history={this.props.history} />
        <Videos tipo="peliculas"/>
        <Videos tipo="series"/>
      </div>
    );
  }
}

export default Home;
