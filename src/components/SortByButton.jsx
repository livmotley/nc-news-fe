import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams } from 'react-router';

function SortByButton() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sort_by');

    function sortButtonLabel() {
        switch (sortBy) {
            case 'date':
                return 'Sort: Date';
            case 'votes':
                return 'Sort: Votes';
            case 'comment_count':
                return 'Sort: Comments';
            default:
                return 'Sort & Filter';
        }
    }
    
    function handleSort(sortOption) {
        searchParams.delete('sort_by');

        if(sortOption === null) {
            searchParams.delete('sort_by');
        } else {
            searchParams.set('sort_by', sortOption);
        }
        setSearchParams(searchParams);
    }

      return (
        <Dropdown>
            <Dropdown.Toggle as="button" className="buttons-and-links">
                {sortButtonLabel()}
            </Dropdown.Toggle>
            <Dropdown.Menu className="sort-menu">
                <Dropdown.Item className="sort-option" onClick={() => handleSort(null)} >Remove Sorting</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('date')} >Date</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('comment_count')} >Comments</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('votes')} >Votes</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      );
    }

export default SortByButton;