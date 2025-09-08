import React from 'react';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from './screens/Home/Home';
import Detalle from './screens/Detalle/Detalle';
import Favoritas from './screens/Favoritas/Favoritas';
import ResultadosBusqueda from './screens/ResultadosBusqueda/ResultadosBusqueda';
import Peliculas from './screens/Peliculas/Peliculas';
import Series from './screens/Series/Series';
import NotFound from './screens/NotFound/NotFound';

import {Route, Switch} from "react-router-dom";

function App() {
  return (
  <React.Fragment>
    <Header />
    <Switch>
      <Route  path='/' exact={true} component={Home}/>
      <Route  path='/favoritas' exact={true} component={Favoritas}/>
      <Route  path='/detalle/:id' exact={true} component={Detalle}/>
      <Route  path='/peliculas' exact={true} component={Peliculas}/>
      <Route  path='/series' exact={true} component={Series}/>
      <Route  path='/ResultadosBusqueda/:?busqueda' exact={true} component={ResultadosBusqueda}/>
      <Route  path='' component={NotFound}/>
    </Switch>
    <Footer />
  </React.Fragment>
)
}

export default App;
