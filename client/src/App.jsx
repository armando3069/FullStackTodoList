import { useState } from "react";
import './App.css'
//import Modal from "./components/modal/modal";
//import TodoWrapper from "./components/todoWrapper";
import TodoWrapperAxios from './components/todoWrapperAxios';


function App() {
  const bnt1 = {
    backgroundColor: "pink",
    padding: "8px 30px",
    color: "white",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  };

  const [open, setOpen] = useState(false);

  const App = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    //filter: open ? 'blur(4px)': 'none',
  };

  return (
    <div  className="App">
      <div className="container">
        {/* {!open ? (
          <>
            <h3>Open the modal</h3>
            <button
              style={bnt1}
              onClick={() => {
                setOpen(true);
              }}
            >
              Open
            </button>
          </>
        ) : null}

        {open && <Modal CloseModal={setOpen} />} */}
        {/* <TodoWrapper /> */}
        <TodoWrapperAxios/>
      
      </div>
    </div>
  );
}

export default App;

// rafc command line
