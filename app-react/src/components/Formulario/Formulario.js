import React, {Component} from "react";

class Formulario extends Component{
    constructor(props){
        super(props)
        this.state ={
            busqueda: ''
        };
    }

    prevenirRecarga(event){
        event.preventDefault()
        this.props.push('/search-results/busqueda/?'+this.state.busqueda)
    }

    controlarCambios (event){
        this.setState({
            busqueda: event.target.value
        } 
        );
    }




    render(){
        return(
            <div className="buscador">
                    <form onSubmit={(event)=> this.prevenirRecarga(event)} action={'/resultados-busqueda/:?busqueda'} method="GET" >
                        <input 
                        type="text" 
                        name="busqueda" 
                        placeholder="Buscar..." 
                        required 
                        value={this.state.busqueda} 
                        onChange={(event)=>this.controlarCambios(event)}>

                        </input>
                        <button type="submit">Buscar</button>
                    </form>
        </div>
        )
    }
}

export default Formulario;
