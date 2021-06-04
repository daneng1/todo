import React, { useState } from 'react';

export const SiteContext = React.createContext();

function SiteProvider(props) {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);
  console.log(pages, list.length);
  const state = {
    list,
    setList,
    pages,
    setPages,
    currentPage,
    setCurrentPage
  }
  
  return (
    <SiteContext.Provider value={state}>
      {props.children}
    </SiteContext.Provider>
  )
}

export default SiteProvider;
