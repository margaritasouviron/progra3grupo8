import React from 'react';
import Videos from '../../components/Videos/Videos';
import './styles.css'


function Favoritas(){
    let favoritas = JSON.parse(localStorage.getItem('favoritos')) || []
    
    if (favoritas.length===0) {
        return(<h3 className='no-hay'>No hay nada seleccionado como favorito</h3>)
    }

    let peliculasFav = favoritas.filter(fav => fav.title)
    let seriesFav = favoritas.filter(fav => fav.name)

    return(
        <div className="body">
            {peliculasFav.length!==0? <Videos tipo="peliculas" datos={peliculasFav} boton='no'/>: <h3 className='no-hay'>  No hay Peliculas favoritas</h3>}
            
            {seriesFav.length!==0? <Videos tipo="series" datos={seriesFav} boton='no'/>: <h3 className='no-hay'>   No hay series favoritas</h3>}
        </div>
        );
    

    
}



export default Favoritas;