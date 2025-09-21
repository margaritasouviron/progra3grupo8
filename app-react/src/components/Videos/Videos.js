import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const API_BASE = 'https://api.themoviedb.org/3';
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNhYmEwODRhYmY2ODcwZWI5YzE1NDkxMjM1MjZlYiIsIm5iZiI6MTc1NzM0MjI1Ny4xNjIsInN1YiI6IjY4YmVlYTMxNWM3NzQ4MzBiMjFmNTViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zd8wb7Lae7vk0cn6zw4rcHRIESSfMIn2tWDcyG2CE_E';
const options = { 
    method: 'GET',
    headers: { 
        accept: 'application/json',
        Authorization: 'Bearer ' + API_TOKEN } 
  };
        

class Videos extends Component {
  constructor(props){
    super(props);
    this.state = { 
        datos: props.datos || [], 
        expandirInfo: null,
        favoritos: JSON.parse(localStorage.getItem('favoritos')) || [],
        boton: props.boton
    };
  }

  componentDidMount(){
    let datosLength = this.props.datos? this.props.datos.length : 0
    if (datosLength !==0) {
      this.setState({datos:this.props.datos})
    }else{
      const tipo = this.props.tipo === 'series' ? '/tv/popular' : '/movie/popular';
      const url = API_BASE + tipo + '?language=es-ES&page=1';
      fetch(url, options)
        .then(res => res.json())
        .then(data => {
          this.setState({ datos: data.results.slice(0,this.props.limite) });
        })
      .catch(error=> console.log(error));
    }

    const favoritosLocal = JSON.parse(localStorage.getItem('favoritos' )) || []
    this.setState({favoritos: favoritosLocal})
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
    return (
      <>
        <h2 className="titulo-videos">{this.props.tipo === 'series' ? 'Series' : 'Películas'}</h2>
        {this.state.datos.length === 0 ? 
          <h3>Cargando...</h3> : 
          <ul className="grid-videos">
            {this.state.datos.map((item, idx) => (
              <li className="item-video" key={item.id + idx}>
                <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt=''/>
                <div className="nombre-video">{item.title || item.name}</div>
                <button className='descrip' onClick={()=> this.mostrarDescripcion(item.id)}>
                {this.state.expandirInfo === item.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
                </button>
                {this.state.expandirInfo === item.id ? 
                <p className='descrip-texto'>
                {item.overview}
                </p>
                : null}
                
                <button className='favoritos-video'  onClick={()=> this.modificarFavoritos(item)}>
                  {this.estaEnFavoritos(item) ? <React.Fragment><AiFillHeart className='icono-corazon rojo'/> <p className='texto-favs'>Quitar de Favoritos</p></React.Fragment> : <React.Fragment><AiOutlineHeart className='icono-corazon'/> <p className='texto-favs'>Agregar a Favoritos</p></React.Fragment>}

                </button>

                <Link className="link-detalle" to={`/detalle/${item.title ? 'peliculas' : 'series'}/${item.id}`}>Ir al detalle</Link>
                
              </li>
            ))}
          </ul>
        }

        {this.state.boton? null: 
        <div className="acciones-videos">
        <Link className="boton-cargar" to={this.props.tipo === 'series' ? '/series' : '/peliculas'}>
          Ver todas
        </Link>
        </div>
        }
        
      </>
    );
  }
}

export default Videos;


