import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

import { IconTooltip } from '../../commons/tooltips';
import { persistenceHFText } from '../assets/info_texts';
import GraphLoader from '../../charts/GraphLoader';
import matchColor from '../../commons/matchColor';
import RestAPI from '../../api/RestAPI';
import SearchContext from '../../SearchContext';
import ShortInfo from '../../commons/ShortInfo';

const getLabel = {
  estable_natural: 'Estable Natural',
  dinamica: 'Dinámica',
  estable_alta: 'Estable Alta',
};

class PersistenceFootprint extends React.Component {
  mounted = false;

  constructor(props) {
    super(props);
    this.state = {
      showInfoGraph: false,
      hfPersistence: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    const {
      areaId,
      geofenceId,
    } = this.context;
    RestAPI.requestHFPersistence(areaId, geofenceId)
      .then((res) => {
        if (this.mounted) {
          this.setState({
            hfPersistence: res.map((item) => ({
              ...item,
              label: getLabel[item.key],
            })),
          });
        }
      })
      .catch(() => {});
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  /**
   * Show or hide the detailed information on each graph
   */
  toggleInfoGraph = () => {
    this.setState((prevState) => ({
      showInfoGraph: !prevState.showInfoGraph,
    }));
  };

  render() {
    const { handlerClickOnGraph } = this.context;
    const { showInfoGraph, hfPersistence } = this.state;
    return (
      <div className="graphcontainer pt6">
        <h2>
          <IconTooltip title="Acerca de esta sección">
            <InfoIcon
              className="graphinfo"
              onClick={() => this.toggleInfoGraph()}
            />
          </IconTooltip>
        </h2>
        {(
          showInfoGraph && (
            <ShortInfo
              description={persistenceHFText}
              className="graphinfo2"
              collapseButton={false}
            />
          )
        )}
        <h6>
          Estable natural, Dinámica, Estable alta
        </h6>
        <div>
          <GraphLoader
            graphType="LargeBarStackGraph"
            data={hfPersistence}
            labelX="Hectáreas"
            labelY="Persistencia Huella Humana"
            units="ha"
            colors={matchColor('hfPersistence')}
            padding={0.25}
            onClickGraphHandler={handlerClickOnGraph}
          />
        </div>
      </div>
    );
  }
}

export default PersistenceFootprint;

PersistenceFootprint.contextType = SearchContext;
