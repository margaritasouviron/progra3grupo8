import React from 'react';
import Videos from '../../components/Videos/Videos';


function Favoritas(){
    let favoritas = JSON.parse(localStorage.getItem('favoritos')) || []
    
    if (favoritas.length===0) {
        return(<p>no hay nada favorito</p>)
    }

    let peliculasFav = favoritas.filter(fav => fav.title)
    let seriesFav = favoritas.filter(fav => fav.name)

    return(
        <div className="body">
            {peliculasFav.length!==0? <Videos tipo="peliculas" datos={peliculasFav} boton='no'/>: <p>no hay Peliculas favoritas</p>}
            
            {seriesFav.length!==0? <Videos tipo="series" datos={seriesFav} boton='no'/>: <p>no hay series favoritas</p>}
        </div>
        );
    

    
}



export default Favoritas;