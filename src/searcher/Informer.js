import React from 'react';
import Drawer from './Drawer';
import BackIcon from '@material-ui/icons/FirstPage';

class Informer extends React.Component {
  render() {
    return (
      <div className="informer">
      {/* TODO: Cambiar el zoom en el mapa para ver todo el país*/}
      <button className="geobtn"
        onClick={() => this.props.verMenu("Selector")}>
        <BackIcon />
      </button>
          <h1> {this.props.geocerca} / {this.props.nombre} <br></br> <b>{this.props.bioma}</b></h1>
          <Drawer
            subArea={this.props.bioma}
            actualizarBiomaActivo={this.props.actualizarBiomaActivo}/>
      </div>
    );
  }
}

export default Informer;
