import React from 'react';
function Detalle(props){
    const id = props.match.params.id;
    return (
        <div>
            <h2></h2>
            <p>El id de la película es: {id}</p>
        </div>
    );
}
export default Detalle;


