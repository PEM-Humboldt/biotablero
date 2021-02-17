import React from 'react';
import PropTypes from 'prop-types';
import logohumboldt from 'images/logohumboldt.png';
import logosiac from 'images/logosiac.png';
import nasa from 'images/nasa.png';
import temple from 'images/temple.png';

const Footer = (
  {
    showLogos,
  },
) => (
  <footer>
    {
    (showLogos) ? (
      <div className="footerflex">
        <div>
          <a href="http://www.humboldt.org.co/es/">
            <img src={logohumboldt} alt="" />
          </a>
        </div>
        <div className="colaboradores">
          <h4>
            Colaboradores
          </h4>
          <a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer">
            <img src={nasa} alt="" />
          </a>
          <a href="https://www.temple.edu/" target="_blank" rel="noopener noreferrer">
            <img src={temple} alt="" />
          </a>
          <a href="http://www.siac.gov.co/siac.html" target="_blank" rel="noopener noreferrer">
            <img src={logosiac} alt="" />
          </a>
        </div>
      </div>
    ) : ('')
    }
    <div className="footersm" position="relative">
      <a href="http://www.humboldt.org.co/es/">
        Instituto de Investigación de Recursos Biológicos
        <br />
        <b>
          Alexander von Humboldt
        </b>
      </a>
      <h3>
        <a href="mailto:mlondono@humboldt.org.co">
          Contacto
        </a>
      </h3>
    </div>
  </footer>
);

Footer.propTypes = {
  showLogos: PropTypes.bool,
};

Footer.defaultProps = {
  showLogos: false,
};

export default Footer;