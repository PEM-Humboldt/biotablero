/** eslint verified */
// TODO: Ajustar evento del Autocompletar sobre el mapa
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import PropTypes from 'prop-types';

import Autocomplete from './Autocomplete';

class Selector extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.new && nextProps.data.length > 0) {
      const { data } = nextProps;
      const expandedId = nextProps.expandedId || 0;
      const expandedByDefault = data[expandedId] || { id: null, label: null };
      return { expanded: expandedByDefault.id, selected: expandedByDefault.id, new: false };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
      subExpanded: null,
      new: true,
    };
  }

  firstLevelChange = panel => (event, expanded) => {
    const { handlers } = this.props;
    const expandedPanel = expanded ? panel : false;
    handlers[0](expandedPanel);
    if (panel === 'addProject') {
      this.setState({
        expanded: null,
      });
    } else {
      this.setState(prevState => ({
        expanded: expandedPanel,
        selected: expanded ? panel : prevState.expanded,
        subExpanded: null,
      }));
    }
    return null;
  };

  secondLevelChange = subPanel => (event, expanded) => {
    const { handlers } = this.props;
    this.setState({
      subExpanded: expanded ? subPanel : false,
    });
    handlers[1](subPanel);
  };

  renderInnerElement = parent => ({
    type, label, name, data, id_project: projectId,
  }) => {
    const { handlers } = this.props;
    switch (type) {
      case 'button':
        return (
          <button
            type="button"
            key={`${type}-${label}`}
            name={name}
            onClick={() => handlers[2](parent, projectId)}
          >
            {label}
          </button>
        );
      case 'autocomplete':
        return (
          <Autocomplete
            valueSelected={value => handlers[2](parent, value)}
            name={name}
            data={data}
            key={`${type}-${label}`}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { description, iconClass } = this.props;
    let { data } = this.props;
    data = data || [];
    const { expanded, selected, subExpanded } = this.state;
    return (
      <div className="selector">
        <div className={iconClass} />
        <div className="description">
          {description}
        </div>
        { (data.length > 0) && (data.map((firstLevel) => {
          const {
            id, label, disabled, expandIcon, detailId, idLabel,
          } = firstLevel;
          const options = firstLevel.options || firstLevel.projectsStates || [];
          return (
            <ExpansionPanel
              className={`m0 ${selected === id ? 'selector-expanded' : ''}`}
              id={idLabel}
              expanded={expanded === id}
              disabled={disabled}
              onChange={this.firstLevelChange(id)}
              key={id}
            >
              <ExpansionPanelSummary expandIcon={expandIcon}>
                {label}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                id={detailId}
              >
                {options.map((secondLevel) => {
                  const {
                    id: subId, label: subLabel, detailClass: subClasses,
                  } = secondLevel;
                  const subOptions = secondLevel.options || secondLevel.projects || [];
                  return (
                    <ExpansionPanel
                      className="m0"
                      id={subId}
                      expanded={subExpanded === subId}
                      onChange={this.secondLevelChange(subId)}
                      key={subId}
                    >
                      <ExpansionPanelSummary expandIcon={expandIcon}>
                        {subLabel}
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={subClasses}>
                        {subOptions.map(this.renderInnerElement(subId))}
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          );
        }))}
      </div>
    );
  }
}

Selector.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    expandIcon: PropTypes.Component,
    detailId: PropTypes.string,
    options: PropTypes.array,
  })),
  handlers: PropTypes.arrayOf(PropTypes.func),
  description: PropTypes.object,
  iconClass: PropTypes.string,
};

Selector.defaultProps = {
  data: [],
  handlers: [],
  description: {},
  iconClass: '',
};

export default Selector;
