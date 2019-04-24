/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Chip from '@material-ui/core/Chip';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const ITEM_HEIGHT = 22;
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 150,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      autoFocus: true,
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
      '-webkit-flex': '1 0 66%',
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      autoFocus: true,
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontSize: 12,
      fontFamily: 'Roboto, sans-serif',
      padding: 0,
      width: '100px',
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
      autoFocus: true,
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});

function SelectWrapped(props) {
  const { classes, ...other } = props;
  return (
    <Select
      noResultsText="Sin resultados"
      arrowRenderer={arrowProps => (
        arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      )}
      clearRenderer={() => <ClearIcon />}
      valueComponent={(valueProps) => {
        const { value, children, onRemove } = valueProps;

        const onDelete = (event) => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return (
          <div className="Select-value">
            {children}
          </div>
        );
      }}
      {...other}
    />
  );
}

SelectWrapped.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multiLabel: null,
    };
  }

  handleChange = name => (value) => {
    this.setState({
      [name]: value,
    });
    const { valueSelected } = this.props;
    if (valueSelected) valueSelected(value);
  };

  render() {
    const { classes, data, label } = this.props;
    const { multiLabel } = this.state;
    const elements = data.map(element => ({
      value: element.value || element.name || element.id,
      label: element.label || element.name,
    }));
    return (
      <div className={classes.root}>
        <TextField
          fullWidth
          value={multiLabel}
          onChange={this.handleChange('multiLabel')}
          placeholder="Seleccionar..."
          name="react-select-chip-label"
          label={label}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: SelectWrapped,
            inputProps: {
              classes,
              multi: true,
              instanceId: 'react-select-chip-label',
              id: `react-select-chip-label-${Math.random()}`,
              simpleValue: true,
              options: elements,
            },
          }}
        />
      </div>
    );
  }
}

Autocomplete.propTypes = {
  valueSelected: PropTypes.func.isRequired,
  classes: PropTypes.object,
  data: PropTypes.array,
  label: PropTypes.string,
};

Autocomplete.defaultProps = {
  classes: '',
  label: 'Escriba el nombre a buscar',
  data: [],
};

export default withStyles(styles)(Autocomplete);
