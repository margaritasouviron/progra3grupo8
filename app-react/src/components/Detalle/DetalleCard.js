import React, { Component } from 'react';
import "./styles.css"

class DetalleCard extends Component {
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
      </div>
    );
  }
}

export default DetalleCard;