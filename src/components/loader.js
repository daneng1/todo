import React, { useContext } from 'react';
// import context from 'react-bootstrap/esm/AccordionContext';
import { When } from 'react-if';
import { SiteContext } from '../context/site.js';
import './loader.scss';

export default function Loader() {
  const context = useContext(SiteContext);

  return (
    <When condition={context.loading === true}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </When>
  )
}
