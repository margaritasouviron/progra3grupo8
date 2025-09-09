import React, { Component } from 'react'
import './styles.css'

const API_BASE = 'https://api.themoviedb.org/3';
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

  botonCargarMas = () => { this.cargarPagina(this.state.nextPage); }

  controlarCambios = (event) => {
    this.setState({ busqueda: event.target.value });
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
          <button className="boton-cargar" onClick={this.botonCargarMas}>cargar más</button>
        </div>
      </>
    );
  }
}

export default VideosTodas;
