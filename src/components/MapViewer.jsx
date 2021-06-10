import { Map, TileLayer, WMSTileLayer } from 'react-leaflet';
import { Modal } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import React from 'react';

import 'leaflet/dist/leaflet.css';

const config = {};
config.params = {
  center: [5.2500, -74.9167], // Location: Mariquita-Tolima
};

class MapViewer extends React.Component {
  /**
   * Construct an object with just one value corresponding to a desired attribute
   *
   * @param {object} layers layers from props,
   *  this param is to make the function callable from getDerivedStateFromProps
   * @param {string} key attribute to choose,
   *  see attributes of layers inner objects in Search and Compensation.
   */
  static infoFromLayers = (layers, key) => {
    const responseObj = {};
    Object.keys(layers).forEach((layerKey) => {
      responseObj[layerKey] = layers[layerKey][key];
    });

    return responseObj;
  }

  constructor(props) {
    super(props);
    this.state = {
      layers: {},
      activeLayers: [],
      update: false,
      openErrorModal: true,
    };

    this.mapRef = React.createRef();
  }

  // Se invoca antes del render inicial o alguna actualización
  // Debes devolver un objeto para actualizar el estado, o null para no actualizar nada.
  static getDerivedStateFromProps(nextProps, prevState) {
    let newActiveLayers = MapViewer.infoFromLayers(nextProps.layers, 'active');
    newActiveLayers = Object.keys(newActiveLayers).filter((name) => newActiveLayers[name]);
    const { layers: oldLayers, activeLayers } = prevState;
    if (newActiveLayers.sort().join() === activeLayers.sort().join()) {
      return { update: false };
    }

    const layers = MapViewer.infoFromLayers(nextProps.layers, 'layer');
    Object.keys(oldLayers).forEach((name) => {
      if (layers[name] !== oldLayers[name]) {
        oldLayers[name].remove();
      }
    });
    return { layers, activeLayers: newActiveLayers, update: true };
  }

  // Se invoca inmediatamente después de que la actualización ocurra.
  // Este método no es llamado para el renderizador inicial
  componentDidUpdate() {
    const { layers, activeLayers, update } = this.state;
    const { loadingLayer } = this.props;
    if (update) {
      Object.keys(layers).forEach((layerName) => {
        if (activeLayers.includes(layerName)) this.showLayer(layers[layerName], true);
        else this.showLayer(layers[layerName], false);
      });
    }
    const countActiveLayers = Object.values(activeLayers).filter(Boolean).length;
    if (countActiveLayers === 0 && !loadingLayer) {
      this.mapRef.current.leafletElement.setView(config.params.center, 5);
    }
  }

  /**
   *  Defines what layer to show and actions derivate from the selection
   *
   * @param {Object} layer receives leaflet object and e.target as the layer
   * @param {Boolean} state if it's false, then the layer should be hidden
   */
  showLayer = (layer, state) => {
    let fitBounds = true;
    if (layer.options.fitBounds === false) fitBounds = false;

    if (state === false) {
      this.mapRef.current.leafletElement.removeLayer(layer);
    } else {
      this.mapRef.current.leafletElement.addLayer(layer);
      if (fitBounds) {
        this.mapRef.current.leafletElement.fitBounds(layer.getBounds());
      }
    }
  }

  render() {
    const {
      geoServerUrl,
      loadingLayer,
      layerError,
      WMSLayer,
    } = this.props;
    const { openErrorModal } = this.state;
    return (
      <Map ref={this.mapRef} center={config.params.center} zoom={5} onClick={this.onMapClick}>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={loadingLayer}
          disableAutoFocus
          container={this}
          style={{ position: 'absolute' }}
          BackdropProps={{ style: { position: 'absolute' } }}
        >
          <div className="generalAlarm">
            <h2>
              <b>Cargando</b>
              <div className="load-wrapp">
                <div className="load-1">
                  <div className="line" />
                  <div className="line" />
                  <div className="line" />
                </div>
              </div>
            </h2>
          </div>
        </Modal>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={layerError && openErrorModal}
          onClose={() => { this.setState({ openErrorModal: false }); }}
          container={this}
          style={{ position: 'absolute' }}
          BackdropProps={{ style: { position: 'absolute' } }}
          disableBackdropClick={false}
        >
          <div className="generalAlarm">
            <h2>
              <b>Capa no disponible actualmente</b>
            </h2>
            <button
              type="button"
              className="closebtn"
              style={{ position: 'absolute' }}
              onClick={() => { this.setState({ openErrorModal: false }); }}
              title="Cerrar"
            >
              <CloseIcon />
            </button>
          </div>
        </Modal>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        {WMSLayer && (
          <WMSTileLayer
            layers={WMSLayer.layer}
            styles={WMSLayer.style}
            format="image/png"
            url={`${geoServerUrl}/Biotablero/wms?service=WMS`}
            opacity={0.4}
            transparent
          />
        )}
      </Map>
    );
  }
}

MapViewer.propTypes = {
  geoServerUrl: PropTypes.string.isRequired,
  loadingLayer: PropTypes.bool,
  layers: PropTypes.object.isRequired,
  layerError: PropTypes.bool,
  WMSLayer: PropTypes.object,
};

MapViewer.defaultProps = {
  loadingLayer: false,
  layerError: false,
  WMSLayer: null,
};

export default MapViewer;
