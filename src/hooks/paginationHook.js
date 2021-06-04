import { useContext } from 'react';
import { SiteContext } from '../context/site.js';

const usePagination = (action) => {

  const context = useContext(SiteContext);
  // console.log(context.pages);
  const dataLimit = 5 ;
  
  function goToNextPage() {
    context.setCurrentPage(context.currentPage + 1);
  }

  function goToPreviousPage() {
    context.setCurrentPage(context.currentPage - 1);
  }

  function changePage(value) {
    // console.log('inside changePage;', value);
    context.setCurrentPage(value);
  }

  const getPaginatedData = (data) => {
    // console.log('inside paginatedData:', data);
    const startIndex = context.currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    // console.log(data.slice(startIndex, endIndex));
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
