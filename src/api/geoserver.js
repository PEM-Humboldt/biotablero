/** eslint verified */
import axios from 'axios';

class GeoServerAPI {
  /**
   * Request the GEB layers, all projects or by project ID
   */
  static requestProjectsGEB(projectName) {
    if (projectName) return GeoServerAPI.requestWFSBiotablero('User_GEB_projects', `CQL_FILTER=NOM_GEN='${projectName}'`);
    const response = GeoServerAPI.requestWFSBiotablero('User_GEB_projects');
    return response;
  }

  /**
   * Request the layer for 'Sogamoso'
   */
  static requestSogamoso() {
    return GeoServerAPI.requestWFSBiotablero('Sogamoso_84');
  }

  /**
   * Request the layer for 'Corpoboyaca'
   */
  static requestCorpoboyaca() {
    return GeoServerAPI.requestWFSBiotablero('Corpoboyaca-Biomas-IaVH-1');
  }

  /**
   * Request the layer for 'Jurisdicciones'
   */
  static requestJurisdicciones() {
    return GeoServerAPI.requestWFSBiotablero('jurisdicciones_low');
  }

  /**
   * Request the layer for 'Sogamoso_Biomas'
   */
  static requestBiomasSogamoso() {
    return GeoServerAPI.requestWFSBiotablero('Sogamoso_Biomas');
  }

  /**
   * Make the request with all common parameters for subtypes on 'Biotablero'
   *
   * @param {string} subType subtype name
   */
  static requestWFSBiotablero(subType, params) {
    if (params) {
      return GeoServerAPI.makeRequest(
        `geoserver/Biotablero/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Biotablero:${subType}&${params}&outputFormat=application%2Fjson`,
      );
    }
    return GeoServerAPI.makeRequest(
      `/geoserver/Biotablero/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=Biotablero:${subType}&outputFormat=application%2Fjson`,
    );
  }

  /**
   * Request the base layer 'Regiones_geb'
   */
  static getRequestURL() {
    const port = process.env.REACT_APP_GEOSERVER_PORT ? `:${process.env.REACT_APP_GEOSERVER_PORT}` : '';
    return `${process.env.REACT_APP_GEOSERVER_HOST}${port}`;
  }

  /**
   * Request an endpoint to the geoserver server
   *
   * @param {String} url endpoint url
   * @param {Object} requestBody JSON object with the request body
   */
  static makeRequest(endpoint) {
    return axios.get(`${this.getRequestURL()}/${endpoint}`)
      .then(res => res.data);
  }
}

export default GeoServerAPI;
