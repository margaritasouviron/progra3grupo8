import React from "react";
import { Link } from 'react-router-dom'
function BoxVideo(props){
    let idx = props.key;
    let item = props.item;
    const IMG_BASE_W342 = 'https://image.tmdb.org/t/p/w342';
    const mostrarDescripcion = props.mostrarDescripcion;
    const expandirInfo = props.expandirInfo;
    

    return (
        <li className="item-video" key={item.id + idx}>
            <img className="poster-video" src={IMG_BASE_W342 + item.poster_path} alt={item.title || item.name} />
            <div className="nombre-video">{item.title || item.name}</div>
            <Link className='botonDetalle' to={'/detalle/'+item.id}>ir al detalle</Link>
            <button onClick={()=> mostrarDescripcion(item.id)}>
            {expandirInfo === item.id ? 'Ocultar Descripcion' : 'Mostrar Descripcion'}
            </button>
            {expandirInfo === item.id ? 
            <p>
            {item.overview}
            </p>
            : null}
        
        </li>
    )
}
export default BoxVideo;
