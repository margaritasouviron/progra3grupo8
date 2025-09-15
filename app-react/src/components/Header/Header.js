import React from "react"
import { Link } from "react-router-dom"
import "./styles.css"

function Header() {
    const elementos = [
        { nombre: "Home", path: "/" },
        { nombre: "Películas", path: "/peliculas" },
        { nombre: "Series", path: "/series" },
        { nombre: "Favoritas", path: "/favoritas" }
    ]

    return(
        <header>
            <h1 className="title">UdeSA Movies</h1>
            <nav className="nav-bar">
                <ul className="nav-links">
                    {elementos.map((elemento, idx) => (
                    <li key={elemento.path + idx}>
                        <Link to={elemento.path}>{elemento.nombre}</Link>
                    </li>
                    ))}
                </ul>
                
            </nav>
        </header>
    );
}

export default Header;