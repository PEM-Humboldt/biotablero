/** eslint verified */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import AddProjectIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionSelected: null,
      statusSelected: null,
      newName: null,
      newNameState: null,
    };
  }

  /**
   * Event handler when a region option is selected
   */
  handleChangeRegion = (event, values) => {
    this.setState({
      regionSelected: values ? values.value : '',
      statusSelected: null,
      newName: null,
    });
  }

  /**
   * Return the regions selector and its current value
   */
  listRegions = () => {
    const { regions } = this.props;
    return (
      <Autocomplete
        autoHighlight
        options={regions}
        getOptionLabel={option => option.label}
        onChange={this.handleChangeRegion}
        getOptionSelected={(option, value) => option.label === value.label}
        renderInput={params => (
          <TextField
            {...params}
            placeholder="Región"
            variant="outlined"
          />
        )}
      />
    );
  }

  /**
   * Event handler when a status option is selected
   */
  handleChangeStatus = (event, statusValue) => {
    this.setState({
      statusSelected: statusValue ? statusValue.value : '',
      newNameState: null,
      newName: null,
    });
  }

  /**
   * Return the status selector and its current value
   */
  listStatus = () => {
    const { statusSelected, newNameState } = this.state;
    const { status } = this.props;
    return (
      <div>
        <Autocomplete
          autoHighlight
          options={status}
          getOptionLabel={option => option.label}
          ListboxProps={
            {
              style: {
                border: '0px',
              },
            }
          }
          onChange={this.handleChangeStatus}
          getOptionSelected={(option, value) => option.label === value.label}
          renderInput={params => (
            <TextField
              {...params}
              placeholder="Estado del proyecto"
              variant="outlined"
              maxLength="50"
            />
          )}
        />
        { // TODO: Handle error for new project if the company doesn' have regions and status
          (statusSelected === 'newState') && (<br />) && (
            <input
              className="projectInput"
              type="text"
              value={newNameState || ''}
              placeholder="Nuevo estado"
              onChange={this.handleChangeNameStatus}
              maxLength="50"
            />
          )
        }
      </div>
    );
  }

  /**
   * Event handler when the name is selected
   */
  handleChangeName = (event) => {
    this.setState({
      newName: event.target.value ? event.target.value : '',
    });
  }

  /**
   * Event handler when the name is selected
   */
  handleChangeNameStatus = (event) => {
    this.setState({
      newNameState: event.target.value ? event.target.value : '',
    });
  }

  render() {
    const {
      regionSelected, statusSelected, newName, newNameState,
    } = this.state;
    const { handlers } = this.props;
    return (
      <div className="newProjectModal">
        <div className="newProjectTitle">
          <h2>Nuevo proyecto</h2>
          <button
            type="button"
            className="closebtn"
            onClick={handlers[1]}
            title="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="npcontent">
          {this.listRegions()}
          <br />
          {this.listStatus()}
          <br />
          <input
            className="projectInput"
            type="text"
            value={newName || ''}
            placeholder="Nombre del proyecto"
            onChange={this.handleChangeName}
            maxLength="50"
          />
          { // TODO: Handle error for new project if the company doesn' have regions and status
            regionSelected && (newNameState || statusSelected) && newName && (
            <button
              type="button"
              className="addprjbtn"
              onClick={() => {
                handlers[0](regionSelected, (newNameState || statusSelected), newName.trim());
              }}
              title="Crear proyecto"
            >
              <AddProjectIcon />
            </button>
            )
          }
        </div>
      </div>
    );
  }
}

NewProjectForm.propTypes = {
  regions: PropTypes.array.isRequired,
  status: PropTypes.array.isRequired,
  handlers: PropTypes.array.isRequired,
};

export default NewProjectForm;
