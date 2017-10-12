import React from 'react';
import PropTypes from 'prop-types';
import Contact from './contact';


class ContactGrid extends React.Component{
  render(){
    if (this.props.loading) {
      return <div><p>LOADING</p></div>;
    }

    return (
      <div className='grid'>
        {this.props.contacts.map((details, i) => <Contact details={details} key={details.id} />)}
    </div>
    )
  }
}

ContactGrid.propTypes = {
  contacts: PropTypes.array.isRequired
}

export default ContactGrid;
