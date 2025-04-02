import '../unique css/ToggleSwitch.scss'

function ToggleSwitch({ascOrder, setAscOrder}) {

    function handleToggle(event) {
        event.preventDefault();
        const newOrder = ascOrder === 'asc' ? "desc" : "asc";
        setAscOrder(newOrder);
    }
    return (
        <div className="toggle-switch">
        <input
            type="checkbox"
            className="toggle-switch-checkbox"
            name="toggleSwitch"
            id="toggleSwitch"
            checked={ascOrder === 'asc'}
            onChange={handleToggle}
        />
        <label className="toggle-switch-label" htmlFor="toggleSwitch">
            <span className="toggle-switch-inner" />
            <span className="toggle-switch-switch" />
        </label>
        </div>
    )
    
}

export default ToggleSwitch;