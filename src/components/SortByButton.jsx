import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams } from 'react-router';

function SortByButton() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');

    function sortButtonLabel() {
        if(!sortBy) {
             return 'Sort & Filter';
        }

        const labelMap = {
            created_at: 'Date',
            votes: 'Votes',
            comment_count: 'Comments'
        };

        return `Sort: ${labelMap[sortBy]}`;
    }
    
    function handleSort(sortOption, sortOrder) {
        const newParams = new URLSearchParams(searchParams);

        if(!sortOption) {
            newParams.delete('sort_by');
            newParams.delete('order');
        } else {
            newParams.set('sort_by', sortOption);
            newParams.set('order', sortOrder);
        }
        setSearchParams(newParams);
    }

      return (
        <Dropdown>
            <Dropdown.Toggle as="button" className="buttons-and-links">
                {sortButtonLabel()}
            </Dropdown.Toggle>
            <Dropdown.Menu className="sort-menu">
                <Dropdown.Item className="sort-option" onClick={() => handleSort(null, null)} >Remove Sorting</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('created_at', 'desc')} >Date: Latest First</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('created_at', 'asc')} >Date: Oldest First</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('comment_count', 'desc')} >Comments: Most to Least</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('comment_count', 'asc')} >Comments: Least to Most</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('votes', 'desc')} >Votes: Most to Least</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('votes', 'asc')} >Votes: Least to Most</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      );
    }

export default SortByButton;