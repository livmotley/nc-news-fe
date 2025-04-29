import { ArrowLeft, ArrowRight } from "lucide-react";

function PageNav({currentPage, setCurrentPage, total}) {

  function handlePageSelection(event) {
    event.target.value === 'next' ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage - 1);
  }

  return (
    <section className='page-bar'>
      <button 
        value={'previous'}
        className="pagination-button"
        onClick={currentPage > 1 ? handlePageSelection : null}
        disabled={currentPage <= 1}>
          <ArrowLeft size={16}/>
          Go Back
      </button>
      <button 
        value={'next'}
        className="pagination-button"
        onClick={currentPage < Math.ceil(total / 10) ? handlePageSelection : null}
        disabled={currentPage >= Math.ceil(total / 10)}>
          Next Page
          <ArrowRight size={16}/>
      </button>
    </section>
  )
}

export default PageNav;
