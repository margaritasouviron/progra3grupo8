import React from 'react';
import Listado from './Listado';
import './styles.css';

function Home(){
    return (
        <div className="buscador">
                    <form action={'/resultados-busqueda/:?busqueda'} method="GET" >
                        <input type="text" name="busqueda" placeholder="Buscar..." required></input>
                        <button type="submit">Buscar</button>
                    </form>
        </div>
    )
}

export default Home;
