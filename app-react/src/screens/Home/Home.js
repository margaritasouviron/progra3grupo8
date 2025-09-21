import React, { Component } from 'react';
import Formulario from '../../components/Formulario/Formulario'
import Videos from '../../components/Videos/Videos'
import './styles.css';

class Home extends Component {
  render(){
    let limite = 6
    return (
      <div className="body">
        <Formulario history={this.props.history} />
        <Videos tipo="peliculas" query={this.state.query} limite={limite}/>
        <Videos tipo="series" query={this.state.query} limite={limite}/>
      </div>
    );
  }
}

export default Home;
