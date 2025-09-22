import React, {Component} from "react";
import { withRouter } from "react-router-dom";

class Formulario extends Component{
    constructor(props){
        super(props)
        this.state ={
            busqueda: '',
            tipo: 'peliculas'
        };
    }

    prevenirRecarga(event){
        event.preventDefault()
        this.props.history.push(`/resultados-busqueda/${this.state.tipo}/${this.state.busqueda}`)
    }

    controlarCambios = (event) => {
        this.setState({
            busqueda: event.target.value
        });
    }

    controlarTipo = (event) => {
        this.setState({
            tipo: event.target.value
        });
    }




    render(){
        return(
            <div className="buscador">
                    <form onSubmit={(event)=> this.prevenirRecarga(event)}>
                        <input 
                        type="text" 
                        name="busqueda" 
                        placeholder="Buscar películas o series..." 
                        required 
                        value={this.state.busqueda} 
                        onChange={(event)=>this.controlarCambios(event)} />
                    
                    <select 
                        value={this.state.tipo} 
                        onChange={(event)=>this.controlarTipo(event)}>
                        <option value="peliculas">Películas</option>
                        <option value="series">Series</option>
                    </select>
                    
                    <button type="submit">Buscar</button>
                    </form>
        </div>
        )
    }
}

export default withRouter(Formulario);
