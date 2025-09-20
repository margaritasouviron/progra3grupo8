import React, { Component } from 'react';
import DetalleCard from '../../components/Detalle/DetalleCard';

const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';

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
    const { tipo, id } = this.props.match.params;

    const endpoint = (tipo === 'peliculas') ? `/movie/${id}` : `/tv/${id}`;

    fetch(`${API_BASE}${endpoint}`, options)
      .then(response => response.json())
      .then(data => {
        this.setState({
          datos: data,
          cargando: false
        });
      })
      .catch(() => {
        this.setState({
          error: 'Error al cargar los datos',
          cargando: false
        });
      });
  }

  render() {
    const { datos, cargando, error } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

    if (error) {
      return <h2>{error}</h2>;
    }

    return (
      <div className="detalle-contenedor">
        <DetalleCard datos={datos} imgBase={IMG_BASE_W342} tipo={this.props.match.params.tipo} />
      </div>
    );
  }
}

export default Detalle;



