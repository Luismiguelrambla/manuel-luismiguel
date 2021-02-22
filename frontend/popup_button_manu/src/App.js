import React, { useState } from "react";
import { Modal, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px 16px",
    top: "10rem",
    left: "33rem",
    transform: "translate (-50%, -50%)",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

function App() {
  const styles = useStyles();

  const [modal, setModal] = useState(false);

  const abrirCerrarModal = () => {
    setModal(!modal);
  };

  const body = (
    <div className={styles.modal}>
      <div align="center">
        <h1>You are about to logout!</h1>
        <h2> Are you sure?</h2>
      </div>
      {/* {<TextField label="Nombre" className={styles.textfield} />
      <br />
      <TextField label="Apellidos" className={styles.textfield} />
      <br />
      <TextField label="E-mail" className={styles.textfield} />
      <div align="center"></div>} */}
      <br />
      <div align="center">
        <Button color="primary">Yes</Button>
        <Button onClick={() => abrirCerrarModal()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <br />
      <Button onClick={() => abrirCerrarModal()}>Logout</Button>
      <Modal open={modal} onClose={abrirCerrarModal}>
        {body}
      </Modal>
    </div>
  );
}

export default App;
