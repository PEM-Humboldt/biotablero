import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import React from 'react';

import CompensationFactor from './CompensationFactor';
import HumanFootprint from './HumanFootprint';
import LandscapeAccordion from './LandscapeAccordion';
import SearchContext from '../SearchContext';

class Landscape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedLevel1: null,
      expandedLevel2: null,
    };
  }

  componentDidMount() {
    const { handlerSwitchLayer } = this.props;
    const { areaId } = this.context;
    this.setState({ expandedLevel2: 'hfCurrent' });
    if (areaId === 'ea') {
      this.setState({ expandedLevel1: 'fc' });
      handlerSwitchLayer('fc');
    } else {
      this.setState({ expandedLevel1: 'hf' });
      handlerSwitchLayer('hfCurrent');
    }
  }

  /**
   * Transform data to fit in the graph structure
   *
   * @param {string} level accordion level
   * @param {string} expandedTab accordion tab to be expanded or hidden
   *
   */
  handlerAccordionGeometry = (level, expandedTab) => {
    const { handlerSwitchLayer } = this.props;
    const { expandedLevel1, expandedLevel2 } = this.state;

    switch (level) {
      case '1':
        this.setState({ expandedLevel1: expandedTab });
        if (expandedTab === 'hf') {
          handlerSwitchLayer(expandedLevel2);
        } else {
          handlerSwitchLayer(expandedTab);
        }
        break;
      case '2':
        this.setState({ expandedLevel2: expandedTab });
        if (expandedTab === null) {
          handlerSwitchLayer(expandedLevel1);
        } else {
          handlerSwitchLayer(expandedTab);
        }
        break;
      default:
        handlerSwitchLayer(null);
    }
  }

  render() {
    const {
      geofenceId,
      matchColor,
      handlerClickOnGraph,
    } = this.props;
    const { areaId } = this.context;

    const componentsArray = [
      {
        label: {
          id: 'fc',
          name: 'FC y Biomas',
          disabled: areaId !== 'ea',
          expandIcon: <AddIcon />,
          detailId: 'Factor de compensación en área de consulta',
          description: 'Representa el coeficiente de relación entre BiomasIAvH y regiones bióticas',
        },
        component: <CompensationFactor
          geofenceId={geofenceId}
          matchColor={matchColor}
        />,
      },
      {
        label: {
          id: 'hf',
          name: 'Huella humana',
          disabled: false,
          expandIcon: <AddIcon />,
          detailId: 'Huella humana en el área',
          description: 'Representa diferentes análisis de huella humana en esta área de consulta',
        },
        component: (
          <HumanFootprint
            geofenceId={geofenceId}
            handlerClickOnGraph={handlerClickOnGraph}
            handlerAccordionGeometry={this.handlerAccordionGeometry}
          />
        ),
      },
    ];
    return (
      <LandscapeAccordion
        componentsArray={componentsArray}
        classNameDefault="m0b"
        classNameSelected="m0b selector-expanded"
        handlerAccordionGeometry={this.handlerAccordionGeometry}
        level="1"
      />
    );
  }
}

Landscape.propTypes = {
  geofenceId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  matchColor: PropTypes.func,
  handlerSwitchLayer: PropTypes.func,
  handlerClickOnGraph: PropTypes.func,
};

Landscape.defaultProps = {
  matchColor: () => {},
  handlerSwitchLayer: () => {},
  handlerClickOnGraph: () => {},
};

export default Landscape;

Landscape.contextType = SearchContext;
