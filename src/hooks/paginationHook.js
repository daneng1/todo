import { useContext } from 'react';
import { SiteContext } from '../context/site.js';

const usePagination = (action) => {

  const context = useContext(SiteContext);
  const dataLimit = 5;
  
  function goToNextPage() {
    context.setCurrentPage(context.currentPage + 1);
  }

  function goToPreviousPage() {
    context.setCurrentPage(context.currentPage - 1);
  }

  function changePage(value) {
    context.setCurrentPage(value);
  }

  const getPaginatedData = (data) => {
    const startIndex = context.currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    context.setPages(Math.ceil(data.length / 5));
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((context.currentPage - 1) / dataLimit) * dataLimit;
    return new Array(context.pages).fill().map((_, idx) => start + idx + 1);
  }; 

  return [
    goToNextPage,
    goToPreviousPage,
    changePage,
    getPaginatedData,
    getPaginationGroup
  ]
}

export default usePagination;
