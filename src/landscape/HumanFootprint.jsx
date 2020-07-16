import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import LandscapeAccordion from './LandscapeAccordion';
import CurrentFootprint from './humanFootprint/CurrentFootprint';
import TimelineFootprint from './humanFootprint/TimelineFootprint';
import PersistenceFooprint from './humanFootprint/PersistenceFootprint';

const HumanFootprint = (props) => {
  const {
    hfCurrent,
    hfCurrentValue,
    hfPersistence,
    hfTimeline,
    hfTimelineArea,
    handlerClickOnGraph,
    handlerAccordionGeometry,
  } = props;

  const componentsArray = [
    {
      label: {
        id: 'hfCurrent',
        name: 'Actual',
        disabled: false,
        expandIcon: <AddIcon />,
        detailId: 'Huella humana actual en área de consulta',
        description: 'Huella humana identificada en el último año de medición disponible, sobre el área de consulta',
      },
      component: (
        <CurrentFootprint
          data={hfCurrent}
          hfCurrentValue={hfCurrentValue}
          onClickGraphHandler={handlerClickOnGraph}
        />
      ),
    },
    {
      label: {
        id: 'hfTimeline',
        name: 'Histórico y Ecosistémas estratégicos (EE)',
        disabled: false,
        expandIcon: <AddIcon />,
        detailId: 'Huella humana a través del tiempo en el área',
        description: 'Representa diferentes análisis de huella humana en esta área de consulta',
      },
      component: (
        <TimelineFootprint
          data={hfTimeline}
          onClickGraphHandler={handlerClickOnGraph}
          hfTimelineArea={hfTimelineArea}
        />
      ),
    },
    {
      label: {
        id: 'hfPersistence',
        name: 'Persistencia',
        disabled: false,
        expandIcon: <AddIcon />,
        detailId: 'Persistencia de la huella humana en la unidad de consulta',
        description: 'Representa la persistencia desde el origen del muestreo hasta el periodo actual, producto de análisis de huella humana en el tiempo y en esta área de consulta',
      },
      component: (
        <PersistenceFooprint
          data={hfPersistence}
          onClickGraphHandler={handlerClickOnGraph}
        />
      ),
    },
  ];
  return (
    <div>
      <LandscapeAccordion
        componentsArray={componentsArray}
        classNameDefault="m1"
        classNameSelected="m1 accordionSelected"
        handlerAccordionGeometry={handlerAccordionGeometry}
        level="2"
      />
    </div>
  );
};

HumanFootprint.propTypes = {
  hfCurrent: PropTypes.array,
  hfCurrentValue: PropTypes.number,
  hfPersistence: PropTypes.array,
  hfTimeline: PropTypes.array,
  hfTimelineArea: PropTypes.object,
  handlerClickOnGraph: PropTypes.func,
  handlerAccordionGeometry: PropTypes.func,
};

HumanFootprint.defaultProps = {
  hfCurrent: [],
  hfCurrentValue: 0,
  hfPersistence: [],
  hfTimeline: [],
  hfTimelineArea: {},
  handlerClickOnGraph: () => {},
  handlerAccordionGeometry: () => {},
};

export default HumanFootprint;