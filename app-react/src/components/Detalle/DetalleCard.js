import React, { Component } from 'react';

class DetalleCard extends Component {
  render() {
    const { datos, imgBase, tipo } = this.props;

    return (
      <div className="detalle-card">
        <img src={imgBase + datos.poster_path} alt={datos.title || datos.name} />
        <h2>{datos.title || datos.name}</h2>
        <p><strong>Calificación:</strong> {datos.vote_average}</p>
        <p><strong>Fecha de estreno:</strong> {datos.release_date || datos.first_air_date}</p>
        {tipo === 'peliculas' && datos.runtime && (
          <p><strong>Duración:</strong> {datos.runtime} min</p>
        )}
        <p><strong>Sinopsis:</strong> {datos.overview}</p>
        <p>
          <strong>Géneros:</strong>{" "}
          {datos.genres && datos.genres.length > 0 ? (
            datos.genres.map((genero, idx) => (
              <span key={idx}>
                {genero.name}{idx < datos.genres.length - 1 ? ', ' : ''}
              </span>
            ))
          ) : (
            'Sin información'
          )}
        </p>
      </div>
    );
  }
}

export default DetalleCard;
