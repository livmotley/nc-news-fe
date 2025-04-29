import Dropdown from 'react-bootstrap/Dropdown';
import { useSearchParams } from 'react-router';

function TopicSort() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sort_by');
    const order = searchParams.get('order');

    function sortButtonLabel() {
        if(!sortBy) {
             return 'Sort';
        }

        const labelMap = {
            asc: 'A-Z',
            desc: 'Z-A',
        };

        return `Sort: ${labelMap[order]}`;
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
                <Dropdown.Item className="sort-option" onClick={() => handleSort('slug', 'asc')} >A-Z</Dropdown.Item>
                <Dropdown.Item className="sort-option" onClick={() => handleSort('slug', 'desc')} >Z-A</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      );
    }

export default TopicSort;