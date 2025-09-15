import React, { Component } from 'react';
import "./styles.css"


class DetalleCard extends Component {
  render() {
    const { datos, imgBase } = this.props;

    return (
      <div className="detalle-card">
        <h1 className="detalle-titulo">{datos.title}</h1>
        {datos.poster_path && (
          <img
            className="detalle-imagen"
            src={imgBase + datos.poster_path}
            alt={datos.title}
          />
        )}
        <div className="detalle-info">
          <p><strong>Fecha de estreno:</strong> {datos.release_date}</p>
          <p><strong>Duración:</strong> {datos.runtime} min</p>
          <p><strong>Géneros:</strong> {datos.genres && datos.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Resumen:</strong> {datos.overview}</p>
          <p><strong>Rating:</strong> {datos.vote_average} / 10</p>
        </div>
      </div>
    );
  }
}

export default DetalleCard;
