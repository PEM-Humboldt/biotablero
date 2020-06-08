import React from 'react';
import PropTypes from 'prop-types';
import DownloadIcon from '@material-ui/icons/Save';
import BarGraph from './BarGraph';
import DotsGraph from './DotsGraph';
import DotInfo from './DotInfo';
import LargeBarStackGraph from './LargeBarStackGraph';
import SmallBarStackGraph from './SmallBarStackGraph';
import MultiLinesGraph from './MultiLinesGraph';

const GraphLoader = (props) => {
  const {
    graphType,
    data,
    graphTitle,
    colors,
    labelX,
    labelY,
    width,
    height,
    elementOnClick,
    activeBiome,
    showOnlyTitle,
    units,
    withLeyends, // TODO: use withLeyends to control if labels in x are showed in the axis X
    padding,
    onClickHandler,
    markers,
  } = props;

  // While data is being retrieved from server
  let errorMessage = null;
  // (data === null) while waiting for API response
  if (data === null) errorMessage = 'Cargando información...';
  // (!data) if API doesn't respond
  else if (!data) errorMessage = 'Información no disponible';
  // (data.length <= 0) if API response in not object
  else if (data.length <= 0) errorMessage = 'Información no disponible';
  if (errorMessage) {
    // TODO: ask Cesar to make this message nicer
    return (
      <div className="errorData">
        {errorMessage}
      </div>
    );
  }

  switch (graphType) {
    case 'LargeBarStackGraph':
      return (
        <LargeBarStackGraph
          data={data}
          labelX={labelX}
          labelY={labelY}
          height={150}
          colors={colors}
          padding={padding}
        />
      );
    case 'SmallBarStackGraph':
      return (
        <SmallBarStackGraph
          data={data}
          height={30}
          colors={colors}
          units={units}
        />
      );
    case 'BarVertical':
      return (
        <BarGraph
          dataJSON={data}
          colors={colors}
          graphTitle={graphTitle}
          labelX={labelX}
          labelY={labelY}
          width={width}
          height={height}
          units={units}
          withLeyends={withLeyends}
        />
      );
    case 'Dots':
      return (
        // TODO: Move this custom content to src/compesation/Drawer
        <div className="graphcard pb">
          <h2>
            <DownloadIcon className="icondown" />
            Ecosistemas Equivalentes
          </h2>
          { !showOnlyTitle && (
            <div>
              <p className="legcomp">
                Agrega uno o varios Biomas a tus opciones de compensación
                <br />
                FC
                <b>
                  Alto
                </b>
                <i>
                  Medio
                </i>
                <em>
                  Bajo
                </em>
                y cantidad de area afectada
              </p>
              <DotsGraph
                activeBiome={activeBiome}
                colors={colors}
                dataJSON={data}
                elementOnClick={elementOnClick}
                graphTitle={graphTitle}
                labelX={labelX}
                labelY={labelY}
                height="280"
                units={units}
                width={width}
              />
            </div>
          )}
        </div>
      );
    case 'DotInfo':
      return (
        <DotInfo
          data={data}
          width={width}
          height="100"
        />
      );
    case 'MultiLinesGraph':
      return (
        <MultiLinesGraph
          onClickHandler={onClickHandler}
          colors={colors}
          data={data}
          markers={markers}
          height="490px"
        />
      );
    default:
      return '';
  }
};

GraphLoader.propTypes = {
  graphType: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired, // Array or object, depending on graphType
  graphTitle: PropTypes.string,
  activeBiome: PropTypes.string,
  labelX: PropTypes.string,
  labelY: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  showOnlyTitle: PropTypes.bool,
  units: PropTypes.string,
  withLeyends: PropTypes.bool,
  elementOnClick: PropTypes.func,
  colors: PropTypes.func,
  padding: PropTypes.number,
  onClickHandler: PropTypes.func,
  markers: PropTypes.arrayOf(PropTypes.shape({
    axis: PropTypes.string,
    value: PropTypes.number,
    type: PropTypes.string,
    legendPosition: PropTypes.string,
  })),
};

GraphLoader.defaultProps = {
  graphTitle: '',
  activeBiome: '',
  labelX: '',
  labelY: '',
  width: '100%',
  height: 250,
  showOnlyTitle: false,
  units: 'ha',
  withLeyends: false,
  elementOnClick: () => {},
  colors: () => {},
  padding: 0.25,
  onClickHandler: () => {},
  markers: [],
};

export default GraphLoader;
