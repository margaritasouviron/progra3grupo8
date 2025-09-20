import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + API_TOKEN } };
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';

class ResultadosBusqueda extends Component {
  constructor(props){
    super(props);
    this.state = { 
      datos: []
    };
  }

  componentDidMount(){ 
    this.buscar();
  }

  buscar(){
    const tipo = this.props.match.params.tipo === 'series' ? '/search/tv' : '/search/movie';
    const query = this.props.match.params.query;
    const url = `${API_BASE}${tipo}?language=es-ES&query=${query}&page=1`;
    
    fetch(url, options)
      .then(res => res.json())
      .then(data => this.setState({ datos: data.results }))
      .catch(error=> console.log(error));
  }

  render(){
    const { tipo, query } = this.props.match.params;
    const titulo = tipo === 'series' ? 'Series' : 'Películas';
    
    return (
      <>
        <h1 className='tituloResultados'>Resultados para "{query}" en {titulo}</h1>
        
        {this.state.datos.length === 0 ? 
          <h3>Cargando...</h3> 
          : 
          <ul className="grid-videos">
            {this.state.datos.map((item, idx) => (
              <li className="item-video" key={item.id + idx}>
                <img className="poster-video" src={IMG_BASE_W342 + item.poster_path}/>
                <div className="nombre-video">{item.title || item.name}</div>
                <div className="favoritos-video">Agregar a favoritos</div>
                <Link className="link-detalle" to={`/detalle/${item.title ? 'peliculas' : 'series'}/${item.id}`}>Ir al detalle</Link>
              </li>
            ))}
          </ul>
        }
      </>
    );
  }
}

export default ResultadosBusqueda;