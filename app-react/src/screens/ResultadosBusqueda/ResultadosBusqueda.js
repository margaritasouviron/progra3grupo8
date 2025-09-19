import React from 'react';

function ResultdosBusqueda(props){
    const busqueda = props.match.params.busqueda.toLowerCase();
    return(<p>{busqueda}</p>)
}
export default ResultdosBusqueda;