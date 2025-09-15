import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const API_BASE = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const options = { method: 'GET', headers: { accept: 'application/json', Authorization: 'Bearer ' + API_TOKEN } };
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';

class VideosTodas extends Component {
  constructor(props){
    super(props);
    this.state = { 
      datos: [], 
      copiaDatos: [],
      busqueda: "",
      nextPage: ""
    };
  }

  componentDidMount(){ this.cargarPagina(1); }

  componentDidUpdate(prevProps, prevState){
    if (prevState.busqueda !== this.state.busqueda) {
      const filtrados = this.state.copiaDatos.filter(item => {
        const titulo = (item.title || item.name).toLowerCase();
        const busquedaLower = this.state.busqueda.toLowerCase();
        return titulo.includes(busquedaLower);
      });
      this.setState({ datos: filtrados });
    }
  }

  endpoint(page){
    const tipo = this.props.tipo === 'series' ? '/tv/popular' : '/movie/popular';
    return API_BASE + tipo + '?language=es-ES&page=' + page;
  }

  cargarPagina(page){
    fetch(this.endpoint(page), options)
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

  botonCargarMas = () => { this.cargarPagina(this.state.nextPage); }

  evitarSubmit = (event) => {
    event.preventDefault();
  }

  controlarCambios = (event) => {
    this.setState({ busqueda: event.target.value });
  }

  render(){
    const titulo = this.props.tipo === 'series' ? 'Series' : 'Películas';
    return (
      <>
        <div className="buscador-videos">
          <form onSubmit={(event) => this.evitarSubmit(event)}>
            <input 
              type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.busqueda} placeholder="Buscar películas o series..." />
          </form>
        </div>
        <h2 className="titulo-videos">{titulo}</h2>
        {this.state.datos.length === 0 ? 
          <h3>Cargando...</h3> : 
          <ul className="grid-videos">
            {this.state.datos.map((item, idx) => (
              <li className="item-video" key={item.id + idx}>
                <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt={item.title || item.name} />
                <div className="nombre-video">{item.title || item.name}</div>
                <Link className="link-detalle" to={`/detalle/id/${item.id}`}>Ir al detalle</Link>
              </li>
            ))}
          </ul>
        }
        {this.state.nextPage && (
          <div className="acciones-videos">
            <button className="boton-cargar" onClick={this.botonCargarMas}>cargar más</button>
          </div>
        )}
      </>
    );
  }
}

export default VideosTodas;
