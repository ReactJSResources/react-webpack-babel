import React, { Fragment } from 'react'
import dog from '../assets/images/dog.png'

const About = () => (
  <Fragment>
    <p>The main contributors are alicoding
    (<a href="https://github.com/alicoding" rel="noopener noreferrer" target="_blank">https://github.com/alicoding</a>)
      and pgerochi
      (<a href="https://github.com/pgerochi" rel="noopener noreferrer" target="_blank">https://github.com/pgerochi)</a></p>
    Random photo of my dog. <img src={dog} className="small-img"/>
  </Fragment>
)

export default About
