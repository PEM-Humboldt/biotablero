import React from 'react';
import Drawer from './Drawer';
import BackIcon from '@material-ui/icons/FirstPage';

class Informer extends React.Component {
  render() {
    return (
      <div className="informer">
      {/* TODO: Cambiar el zoom en el mapa para ver todo el país*/}
      <button className="compbtn" onClick={() => this.props.verMenu("Selector")}>
        <BackIcon />
      </button>
          <h1> {this.props.geocerca} / {this.props.nombre} <br></br> <b>{this.props.bioma}</b></h1>
          <Drawer />
      </div>
    );
  }
}

export default Informer;
