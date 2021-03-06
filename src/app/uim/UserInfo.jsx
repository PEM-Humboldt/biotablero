import React from 'react';
import PropTypes from 'prop-types';

import AppContext from 'app/AppContext';

const UserInfo = ({ logoutHandler }) => (
  <AppContext.Consumer>
    {({ user }) => (
      <div className="user_info">
        <b>Usuario</b>
        <br />
        {user.name}
        <button
          className="logoutbtn"
          title="Salir"
          type="button"
          onClick={logoutHandler}
        >
          Cerrar Sesión
        </button>
      </div>
    )}
  </AppContext.Consumer>
);

UserInfo.propTypes = {
  logoutHandler: PropTypes.func,
};

UserInfo.defaultProps = {
  logoutHandler: () => {},
};

export default UserInfo;
