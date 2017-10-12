import React from 'react';
import PropTypes from 'prop-types';
import EmojiOne from 'emojione';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
  render(){
    const { name, photo, id } = this.props.details;
    const emoji = EmojiOne.shortnameToImage(photo)
    console.log(emoji);
    return(
      // TODO - add route for single contact
      <Link to={`/contact/${id}`}>
        <div className='contact-item'>
            <p className='contact-name'>{name}</p>
            <div className='emoji-container' dangerouslySetInnerHTML={{__html: emoji}}></div>
        </div>
      </Link>
    )
  }
}

Contact.propTypes = {
  details: PropTypes.object
}

export default Contact;
