/** eslint verified */
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  componentDidMount() {
    const { componentsArray } = this.props;
    // This will force to open the first level in accordion when it is loaded by first time
    if (Object.keys(componentsArray).length > 0) {
      this.setState({
        expanded: componentsArray[0].label.id,
      });
    }
  }

  render() {
    const {
      componentsArray, // Titles, data and component as the content for each accordion level
      /* Template: [{
      label: {
        id: 'Factor de compensación',
        name: 'Factor de compensación',
        disabled: false,
        expandIcon: <AddIcon />,
        detailId: 'Factor de compensación en área de consulta',
        description: 'Representa el coeficiente de relación entre BiomasIAvH y regiones bióticas',
      },
      component: RenderGraph(distritos, 'Hectáreas', 'Regiones Bióticas', 'BarStackGraph',
        'Regiones Bióticas', colorsRB, handlerInfoGraph, openInfoGraph,
        'muestra las hectáreas por cada región biótica en el área de consulta seleccionada'),
    },
    {
      label: {
        id: 'Huella humana',
        name: 'Huella humana',
        disabled: false,
        expandIcon: <AddIcon />,
        detailId: 'Huella humana en el área',
        description: 'Representa diferentes análisis de huella humana en esta área de consulta',
      },
      component: RenderGraph(distritos, 'Hectáreas', 'Regiones Bióticas', 'BarStackGraph',
        'Regiones Bióticas', colorsRB, handlerInfoGraph, openInfoGraph,
        'muestra las hectáreas por cada región biótica en el área de consulta seleccionada'),
    },
    ];
      */
      classNameSelected,
      classNameDefault,
    } = this.props;
    const { expanded } = this.state;
    return (
      <div>
        {(Object.keys(componentsArray).length > 0)
          && componentsArray.map(counter => (
            <ExpansionPanel
              className={expanded !== counter.label.id ? classNameDefault : classNameSelected}
              disabled={false}
              expanded={expanded === counter.label.id}
              id={counter.label.id}
              key={counter.label.id}
              onChange={() => (this.setState({
                expanded: expanded !== counter.label.id ? counter.label.id : null,
              }))}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              >
                {counter.label.id}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>{counter.component}</ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
      </div>
    );
  }
}

Accordion.propTypes = {
  componentsArray: PropTypes.array,
  classNameDefault: PropTypes.string, // defined in CSS file to default item for this accordion
  classNameSelected: PropTypes.string, // defined in CSS file to selected item this accordion
};

Accordion.defaultProps = {
  componentsArray: [],
  classNameDefault: 'm0',
  classNameSelected: 'm0 selector-expanded',
};

export default Accordion;