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
      <Route  path='/favoritas' component={Favoritas}/>
      <Route  path='/detalle/id/:id' component={Detalle}/>
      <Route  path='/peliculas' component={Peliculas}/>
      <Route  path='/series' component={Series}/>
      <Route  path='/resultados/:busqueda' component={ResultadosBusqueda}/>
      <Route  path='' component={NotFound}/>
    </Switch>
    <Footer />
  </React.Fragment>
)
}

export default App;
