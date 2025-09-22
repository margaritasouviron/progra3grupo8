import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";


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
      favoritos: JSON.parse(localStorage.getItem('favoritos')) || []
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

  mostrarDescripcion(id){
    this.setState(({
      expandirInfo: this.state.expandirInfo === id? null: id
    }))
  }

  modificarFavoritos(item){
    let favoritos = this.state.favoritos
    let existe = favoritos.find(fav => fav.id === item.id)
    let nuevosFavoritos = existe? favoritos.filter(fav=> fav.id !== item.id) : [...favoritos, item]
    this.setState({favoritos: nuevosFavoritos})
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
    console.log(nuevosFavoritos)
  }

  estaEnFavoritos(item){
    let favoritos = this.state.favoritos
    let existe = favoritos.find(fav => fav.id === item.id)
    return existe
  }

  render(){
    const titulo = this.props.tipo === 'series' ? 'Series' : 'Películas';
    return (
      <>
        <div className="buscador-videos">
          <form onSubmit={(event) => this.evitarSubmit(event)}> 
            <input 
              type="text" onChange={(event) => this.controlarCambios(event)} value={this.state.busqueda} placeholder="Buscar..." />
          </form>
        </div>

        <h2 className="titulo-videos">{titulo}</h2>
        {this.state.datos.length === 0 ? 
          <h3>Cargando...</h3> 
          : 
          <ul className="grid-videos">
            {this.state.datos.map((item, idx) => (
              <li className="item-video" key={item.id + idx}>
              <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt=''/>
              <div className="nombre-video">{item.title || item.name}</div>
              <div className='links-fondo'>
                <button className='descrip' onClick={()=> this.mostrarDescripcion(item.id)}>
                  {this.state.expandirInfo === item.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
                </button>
                {this.state.expandirInfo === item.id ? <p className='descrip-texto'>{item.overview}</p> : null}
                <button className='favoritos-video'  onClick={()=> this.modificarFavoritos(item)}>
                  {this.estaEnFavoritos(item) ? <React.Fragment><AiFillHeart className='icono-corazon rojo'/> <p className='texto-favs'>Quitar de Favoritos</p></React.Fragment> : <React.Fragment><AiOutlineHeart className='icono-corazon'/> <p className='texto-favs'>Agregar a Favoritos</p></React.Fragment>}
                </button>
                <Link className="link-detalle" to={`/detalle/${item.title ? 'peliculas' : 'series'}/${item.id}`}>Ir al detalle</Link>
              </div>
            </li>
            ))}
          </ul>
        }
        {this.state.nextPage && (
          <div className="acciones-videos">
            <button className="boton-cargar" onClick={this.botonCargarMas}>Cargar más</button>
          </div>
        )}
      </>
    );
  }
}

export default VideosTodas;
