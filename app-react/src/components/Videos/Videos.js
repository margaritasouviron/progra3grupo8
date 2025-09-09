import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const options = { 
    method: 'GET',
    headers: { 
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN } };
        
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';

class Videos extends Component {
  constructor(props){
    super(props);
    this.state = { 
        datos: [] 
    };
  }

  componentDidMount(){
    const tipo = this.props.tipo === 'series' ? '/tv/popular' : '/movie/popular';
    const url = API_BASE + tipo + '?language=es-ES&page=1';
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        const primeros4 = [];
        data.results.map((item, idx) => {
          if (idx < 4) {
            primeros4.push(item);
          }
        });
        this.setState({ datos: primeros4 });
      })
      .catch(error=> console.log(error));
  }

  render(){
    return (
      <>
        <h2 className="titulo-videos">{this.props.tipo === 'series' ? 'Series' : 'Películas'}</h2>
        {this.state.datos.length === 0 ? 
          <h3>Cargando...</h3> : 
          <ul className="grid-videos">
            {this.state.datos.map((item, idx) => (
              <li className="item-video" key={item.id + idx}>
                <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt={item.title || item.name} />
                <div className="nombre-video">{item.title || item.name}</div>
              </li>
            ))}
          </ul>
        }
        <div className="acciones-videos">
          <Link className="boton-cargar" to={this.props.tipo === 'series' ? '/series' : '/peliculas'}>
            Ver todas
          </Link>
        </div>
      </>
    );
  }
}

export default Videos;


