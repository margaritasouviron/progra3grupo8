import React, { Component } from 'react';
import DetalleCard from '../../components/Detalle/DetalleCard';


const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const IMG_BASE = 'https://image.tmdb.org/t/p/w342';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + API_TOKEN
  }
};

class Detalle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: null,
      cargando: true,
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params; 

    fetch(`${API_BASE}/movie/${id}?language=es-ES`, options)
        .then(res => res.json())
        .then(data => {
            this.setState({datos: data, cargando: false})
        })
        .catch(error=> console.log(error));
  }

  render() {
    const { datos, cargando } = this.state;

    return (
      <div className="detalle-contenedor">
        {cargando && <h2>Cargando...</h2>}
        {datos && <DetalleCard datos={datos} imgBase={IMG_BASE} />}
      </div>
    );
  }
}

export default Detalle;


