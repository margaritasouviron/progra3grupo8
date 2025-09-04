import React from "react"
import "./styles.css"

function Header() {
    const elementos = [
        {
            nombre: "Home",
            path: "/"
        },
        {
            nombre: "Películas",
            path: "/peliculas"
        },
        {
            nombre: "Series",
            path: "/series"
        },
        {
            nombre: "Favoritas",
            path: "/favoritas"
        },
    ]

    return(
        <header>
            <h1 className="title">UdeSA Movies</h1>
            <nav className="nav-bar">
                <ul className="nav-links">
                    {elementos.map((elemento, idx) => 
                    <li key={elemento + idx}>
                        <a href={elemento.path}>{elemento.nombre}</a>
                    </li>)}
                </ul>
                <div className="buscador">
                    <form action={'/resultados-busqueda/:?busqueda'} method="GET" >
                        <input type="text" name="busqueda" placeholder="Buscar..." required></input>
                        <button type="submit">Buscar</button>
                    </form>
                </div>
            </nav>
        </header>
    );
}

export default Header;