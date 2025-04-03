function PageNav({currentPage, setCurrentPage, total}) {

  function handlePageSelection(event) {
    event.target.value === 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  }

  return (
    <section className='page-bar'>
      <button 
        value={'previous'} 
        onClick={currentPage > 1 ? handlePageSelection : null}
        disabled={currentPage <= 1}>Go Back</button>
      <button 
        value={'next'} 
        onClick={currentPage < Math.ceil(total / 10) ? handlePageSelection : null}
        disabled={currentPage >= Math.ceil(total / 10)}>Next Page</button>
    </section>
  )
}

export default PageNav;
