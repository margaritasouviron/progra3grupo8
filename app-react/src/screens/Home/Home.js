import React, { Component } from 'react';
import Formulario from '../../components/Formulario/Formulario'
import Videos from '../../components/Videos/Videos'
import './styles.css';

class Home extends Component {
  render(){
    let limite = 8
    return (
      <div className="body">
        <Formulario history={this.props.history} />
        <Videos tipo="peliculas"  limite={limite}/>
        <Videos tipo="series"  limite={limite}/>
      </div>
    );
  }
}

export default Home;
