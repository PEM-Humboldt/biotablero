/** eslint verified */
import React from 'react';
import DownloadIcon from '@material-ui/icons/Save';
import InfoIcon from '@material-ui/icons/Info';
import ShortInfo from '../commons/ShortInfo';
import EcosystemBox from './EcosystemBox';
import RestAPI from '../api/RestAPI';
import RenderGraph from '../charts/RenderGraph';

const getPercentage = (part, total) => ((part * 100) / total).toFixed(2);

const getArea = (areaPA) => {
  const local = areaPA ? (areaPA.reduce((total, item) => (total + Number(item.area)), 0)) : '';
  return Number(local).toFixed(2);
};

const arrayWithNoProtectedArea = (general, protectedArea) => {
  const noProtected = (general - Number(protectedArea)).toFixed(2);
  return [
    { type: 'Área protegida', area: protectedArea, percentage: getPercentage(Number(protectedArea), general) / 100 },
    { type: 'No protegida', area: noProtected.toString(), percentage: getPercentage(noProtected, general) / 100 },
  ];
};

const getDetailsBySE = (areaId, geofenceId, name) => {
  console.log((areaId, geofenceId, name));
  Promise.all(
    [RestAPI.requestSENationalPercentage(areaId, geofenceId, name)
      .then(res => res)
      .catch(() => {})],
    [RestAPI.requestSECoverageByGeofence(areaId, geofenceId, name)
      .then(res => res)
      .catch(() => {})],
    [RestAPI.requestSEPAByGeofence(areaId, geofenceId, name)
      .then(res => res)
      .catch(() => 0)],
  ).then(response => response);
};

  /**
   * Return the ecosystems and its content
   */
const listEcosystems = (area, name, percentage,
  handlerInfoGraph, openInfoGraph, areaId, geofenceId) => {
  console.log(areaId, geofenceId);
  const {
    coverageSE, // object
    protectedAreaSE, // object
    nationalPercentage, // value used for label
  } = getDetailsBySE(areaId, geofenceId, name);
  console.log(coverageSE, // object
    protectedAreaSE, // object
    nationalPercentage);
  return (areaId && geofenceId && (
    <EcosystemBox
      key={name}
      name={name}
      percentage={percentage}
      area={area}
      coverage={RestAPI.requestSECoverageByGeofence(areaId, geofenceId, name)
        .then(res => res)
        .catch(() => {})} // TODO: Call coverage for this ee
      areaPA={RestAPI.requestSEPAByGeofence(areaId, geofenceId, name)
        .then(res => res)
        .catch(() => 0)} // TODO: Call areaPA for this ee
      handlerInfoGraph={handlerInfoGraph}
      openInfoGraph={openInfoGraph}
      nationalPercentage={
        RestAPI.requestSENationalPercentage(areaId, geofenceId, name)
          .then(res => res)
          .catch(() => {})
      }
    />
  ));
};

const Overview = (/* TODO: Add all values required */
  areaData, listSE, areaPA, coverage,
  handlerInfoGraph, openInfoGraph,
  areaId, geofenceId, graphTitle, graphDescription,
) => {
  const generalArea = (areaData ? areaData.area : 0);
  const ecosystemsArea = getArea(listSE);
  const protectedArea = getArea(areaPA);
  const areaH = 0;
  return (
    <div className="graphcard">
      <h2>
        <DownloadIcon className="icondown" />
        <InfoIcon
          className="graphinfo"
          data-tooltip
          title="¿Qué significa este gráfico?"
          onClick={() => {
            handlerInfoGraph(graphTitle);
          }}
        />
        <div
          className="graphinfo"
          onClick={() => handlerInfoGraph(graphTitle)}
          onKeyPress={() => handlerInfoGraph(graphTitle)}
          role="button"
          tabIndex="0"
        >
          Área
        </div>
      </h2>
      {openInfoGraph && (openInfoGraph === graphTitle) && (
        <ShortInfo
          name={graphTitle}
          description={graphDescription}
          className="graphinfo2"
          tooltip="¿Qué significa?"
          customButton
        />
      )}
      <div className="graphcontainer pt5">
        <h4>
        hectáreas totales
          <b>{`${generalArea} ha`}</b>
        </h4>
        <div className="ecoest">
          <h4 className="minus20">
          Cobertura
          </h4>
          <h6>
          Natural y Transformada
          </h6>
          <div className="graficaeco">
            {RenderGraph(coverage, 'Tipo de área', 'Comparación', 'SmallBarStackGraph',
              'Cobertura', ['#164f74', '#60bbd4', '#5aa394'], handlerInfoGraph, openInfoGraph,
              'Estado de la cobertura en el área seleccionada', '%')}
          </div>
        </div>
        <h4>
        Áreas protegidas
          <b>{`${protectedArea} ha `}</b>
        </h4>
        <h5>
          {`${getPercentage(protectedArea, generalArea)} %`}
        </h5>
        <div className="graficaeco">
          {RenderGraph(arrayWithNoProtectedArea(generalArea, protectedArea), '', '', 'SmallBarStackGraph',
            'Área protegida', ['#37635a', '#5aa394', '#60bbd4'], handlerInfoGraph, openInfoGraph,
            '', '%')}
          <h6>
          Distribución en área protegida:
          </h6>
          {RenderGraph(areaPA, '', '', 'SmallBarStackGraph',
            'Área protegida', ['#92ba3a', '#e9c948', '#5564a4'], handlerInfoGraph, openInfoGraph,
            '', '%')}
        </div>
        <div className="ecoest">
          <h4 className="minus20">
          Ecosistemas estratégicos
            <b>{`${ecosystemsArea} ha`}</b>
          </h4>
          <h5 className="minusperc">{`${getPercentage(ecosystemsArea, generalArea)} %`}</h5>
          <EcosystemBox
            name="Bosque Seco Tropical"
            percentage="0.40"
            area={60}
            coverage={coverage}
            areaPA={areaPA}
            handlerInfoGraph={handlerInfoGraph}
            openInfoGraph={openInfoGraph}
          />
          {(areaH !== 0) && (
            <EcosystemBox
              name="Humedales"
              percentage="0"
              area={0}
              coverage={coverage}
              areaPA={areaPA}
              handlerInfoGraph={handlerInfoGraph}
              openInfoGraph={openInfoGraph}
            />
          )}
          <EcosystemBox
            name="Páramo"
            percentage="0.15"
            area={10}
            coverage={coverage}
            areaPA={areaPA}
            handlerInfoGraph={handlerInfoGraph}
            openInfoGraph={openInfoGraph}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
