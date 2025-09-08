import React, { Component } from 'react'
import './styles.css'

const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN_V4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + API_TOKEN_V4 } };
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';

class VideosTodas extends Component {
  constructor(props){
    super(props);
    this.state = { 
      datos: [], 
      copiaDatos: [],
      busqueda: ""
    };
  }

  componentDidMount(){ this.cargarPagina(1); }

  endpoint(page){
    const tipo = this.props.tipo === 'series' ? '/tv/popular' : '/movie/popular';
    return API_BASE + tipo + '?language=es-ES&page=' + page;
  }

  cargarPagina(page){
    fetch(this.endpoint(page))
      .then(res => res.json())
      .then(data => {
        const concatenados = [...this.state.datos, ...data.results];
        this.setState({
          datos: concatenados,
          copiaDatos: concatenados,
          nextPage: data.page + 1
        });
      })
      .catch(error=> console.log(error));
  }

  cargarMas = () => { this.cargarPagina(this.state.nextPage); }

  controlarCambios = (event) => {
    const busqueda = event.target.value;
    this.setState({ busqueda: busqueda });
    
    const filtrados = this.state.copiaDatos.filter(item => {
      const titulo = (item.title || item.name).toLowerCase();
      const busquedaLower = busqueda.toLowerCase();
      return titulo.includes(busquedaLower);
    });
    this.setState({ datos: filtrados });
  }

  render(){
    const titulo = this.props.tipo === 'series' ? 'Series' : 'Películas';
    return (
      <>
        <div className="buscador-videos">
          <form>
            <input 
              type="text" 
              placeholder="Buscar películas o series..." 
              value={this.state.busqueda}
              onChange={this.controlarCambios}
            />
          </form>
        </div>
        <h2 className="titulo-videos">{titulo}</h2>
        <ul className="grid-videos">
          {this.state.datos.map((item, idx) => (
            <li className="item-video" key={item.id + idx}>
              <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt={item.title || item.name} />
              <div className="nombre-video">{item.title || item.name}</div>
            </li>
          ))}
        </ul>
        <div className="acciones-videos">
          <button className="boton-cargar" onClick={this.cargarMas}>Ver todas</button>
        </div>
      </>
    );
  }
}

export default VideosTodas;
