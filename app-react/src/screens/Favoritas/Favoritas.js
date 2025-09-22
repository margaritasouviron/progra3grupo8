import React from 'react';
import Videos from '../../components/Videos/Videos';
import './styles.css'
import "../../components/Videos/styles.css"
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';


class Favoritas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peliculasFav: [],
            seriesFav: [],
            expandirInfo: null,
        };
    }

    componentDidMount() {

        let peliculasFav = JSON.parse(localStorage.getItem('peliculasFav')) || []
        let seriesFav = JSON.parse(localStorage.getItem('seriesFav')) || []
        this.setState({ peliculasFav: peliculasFav, seriesFav: seriesFav })
    }

    mostrarDescripcion(id) {
        this.setState(({
            expandirInfo: this.state.expandirInfo === id ? null : id
        }))
    }

    modificarFavoritos(item) {
        let favoritos = item.title ? this.state.peliculasFav : this.state.seriesFav
        let existe = favoritos.find(fav => fav.id === item.id)
        let nuevosFavoritos = existe ? favoritos.filter(fav => fav.id !== item.id) : [...favoritos, item]

        if (item.title) {
            this.setState({ peliculasFav: nuevosFavoritos })
            localStorage.setItem('peliculasFav', JSON.stringify(nuevosFavoritos))
        } else {
            this.setState({ seriesFav: nuevosFavoritos })
            localStorage.setItem('seriesFav', JSON.stringify(nuevosFavoritos))
        }
        
        console.log(nuevosFavoritos)
    }

    estaEnFavoritos(item) {
        let favoritos = item.title ? this.state.peliculasFav : this.state.seriesFav
        let existe = favoritos.find(fav => fav.id === item.id)
        return existe
    }
    
    render() {
        return (

            <div className="body">
                {this.state.peliculasFav.length === 0 ? <h3 className='no-hay'>  No hay Peliculas favoritas</h3> :

                    <ul className="grid-videos"> {
                        this.state.peliculasFav.map((pelicula, idx) => (
                            <li className="item-video" key={pelicula.id + idx}>
                                <img className="poster-video" src={IMG_BASE_W342 + pelicula.poster_path} alt='' />
                                <div className="nombre-video">{pelicula.title || pelicula.name}</div>
                                <div className='links-fondo'>
                                    <button className='descrip' onClick={() => this.mostrarDescripcion(pelicula.id)}>
                                        {this.state.expandirInfo === pelicula.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
                                    </button>
                                    {this.state.expandirInfo === pelicula.id ? <p className='descrip-texto'>{pelicula.overview}</p> : null}
                                    <button className='favoritos-video' onClick={() => this.modificarFavoritos(pelicula)}>
                                        {this.estaEnFavoritos(pelicula) ? <React.Fragment><AiFillHeart className='icono-corazon rojo' /> <p className='texto-favs'>Quitar de Favoritos</p></React.Fragment> : <React.Fragment><AiOutlineHeart className='icono-corazon' /> <p className='texto-favs'>Agregar a Favoritos</p></React.Fragment>}
                                    </button>
                                    <Link className="link-detalle" to={`/detalle/${pelicula.title ? 'peliculas' : 'series'}/${pelicula.id}`}>Ir al detalle</Link>
                                </div>
                            </li>
                        ))

                    } </ul>

                }

                {this.state.seriesFav.length === 0 ? <h3 className='no-hay'>   No hay series favoritas</h3>
                    :
                    <ul className="grid-videos">
                        {
                            this.state.seriesFav.map((serie, idx) => (
                                <li className="item-video" key={serie.id + idx}>
                                    <img className="poster-video" src={IMG_BASE_W342 + serie.poster_path} alt='' />
                                    <div className="nombre-video">{serie.title || serie.name}</div>
                                    <div className='links-fondo'>
                                        <button className='descrip' onClick={() => this.mostrarDescripcion(serie.id)}>
                                            {this.state.expandirInfo === serie.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
                                        </button>
                                        {this.state.expandirInfo === serie.id ? <p className='descrip-texto'>{serie.overview}</p> : null}
                                        <button className='favoritos-video' onClick={() => this.modificarFavoritos(serie)}>
                                            {this.estaEnFavoritos(serie) ? <React.Fragment><AiFillHeart className='icono-corazon rojo' /> <p className='texto-favs'>Quitar de Favoritos</p></React.Fragment> : <React.Fragment><AiOutlineHeart className='icono-corazon' /> <p className='texto-favs'>Agregar a Favoritos</p></React.Fragment>}
                                        </button>
                                        <Link className="link-detalle" to={`/detalle/${serie.title ? 'peliculas' : 'series'}/${serie.id}`}>Ir al detalle</Link>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>


                }
            </div>
        );

    }

}



export default Favoritas;