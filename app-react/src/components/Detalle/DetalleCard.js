import React, { Component } from 'react';
import "./styles.css"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

class DetalleCard extends Component {

  modificarFavoritos(item){
    let favoritos = JSON.parse(localStorage.getItem('favoritos'))
    let existe = favoritos.find(fav => fav.id === item.id)
    let nuevosFavoritos = existe? favoritos.filter(fav=> fav.id !== item.id) : [...favoritos, item]
    this.setState({favoritos: nuevosFavoritos})
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
    console.log(nuevosFavoritos)
  }

  estaEnFavoritos(item){
    let favoritos = JSON.parse(localStorage.getItem('favoritos'))
    let existe = favoritos.find(fav => fav.id === item.id)
    return existe
  }

  render() {
    const { datos, imgBase, tipo } = this.props;

    return (
      <div className="detalle-card">
        <h2 className='detalle-titulo'>{datos.title}</h2>
        <img className="detalle-imagen" src={imgBase + datos.poster_path} alt={datos.title} />
        <div className='detalle-info'>
          <p><strong>Calificación:</strong> {datos.vote_average}</p>
          <p><strong>Fecha de estreno:</strong> {datos.release_date || datos.first_air_date}</p>
          {tipo === 'peliculas' && datos.runtime && (
            <p><strong>Duración:</strong> {datos.runtime} min</p>
          )}
          <p><strong>Sinopsis:</strong> {datos.overview}</p>
          <p>
            <strong>Géneros: </strong>
            {datos.genres && datos.genres.length > 0 ? ( datos.genres.map((genero, idx) => idx < datos.genres.length - 1 
                    ? genero.name + ', ' : genero.name)) : 'Sin información'}
          </p>
        </div>
        <button className='favoritos-video'  onClick={()=> this.modificarFavoritos(datos)}>
                  {this.estaEnFavoritos(datos) ? <React.Fragment><AiFillHeart className='icono-corazon rojo'/> <p className='texto-favs'>Quitar de Favoritos</p></React.Fragment> : <React.Fragment><AiOutlineHeart className='icono-corazon'/> <p className='texto-favs'>Agregar a Favoritos</p></React.Fragment>}

        </button>
      </div>
    );
  }
}

export default DetalleCard;