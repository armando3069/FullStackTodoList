const Modal = ({ CloseModal }) => {
    const modalStyle = {
      width: "200px",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 1001, // Ensure the modal content is above the semi-transparent background
    };
  
    return (
      <div style={modalStyle}>
        <h2>Modal Title</h2>
        <p>This is a modal</p>
        <button onClick={() => CloseModal(false)}>Close</button>
      </div>
    );
  };
  
  export default Modal;