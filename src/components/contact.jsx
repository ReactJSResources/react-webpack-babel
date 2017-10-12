import React from 'react';
import PropTypes from 'prop-types';

const Contact = (props) => (
  <div className='contact'>
    <p>{props.name}</p>
  </div>
)

Contact.propTypes = {
  name: PropTypes.string.isRequired
}

export default Contact;
