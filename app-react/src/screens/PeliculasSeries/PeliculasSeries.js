import React from 'react';

function PeliculasSeries(props){
  const { tipo } = props; // 'peliculas' | 'series'

  return (
    <main className="contenido">
      <h2>{tipo === 'peliculas' ? 'Películas' : 'Series'}</h2>
      <p>Listado de {tipo}</p>
    </main>
  )
}

export default PeliculasSeries;


