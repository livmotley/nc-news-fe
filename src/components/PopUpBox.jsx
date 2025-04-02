import Popup from "reactjs-popup";

function PopUp({ open, setOpen, handleYes}) {

    function closeModal() {
        setOpen(false);
    }

    function handleConfirmation() {
        handleYes();
        setOpen(false);
    }

    return (
        <div>
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
            <a className="close" onClick={closeModal}>
                &times;
            </a>
            <p>ARE YOU SURE YOU WANT TO
                DELETE?</p>
            <div className="button-container">
                <button className="pop-up-button" onClick={handleConfirmation}>Yes</button>
                <button className="pop-up-button" onClick={closeModal}>No</button>
            </div>
            </div>
        </Popup>
        </div>
    )
}

export default PopUp;