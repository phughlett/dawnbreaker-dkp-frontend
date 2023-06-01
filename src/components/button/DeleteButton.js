import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import LedgerItemDialog from "../modal/LedgerItemDialog";

export default function DeleteButton({ buttonAction, dialogInfo }) {
  const [open, setOpen] = useState(false);

  let { postDelete } = buttonAction;

  let title = "Delete Item";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const actionButton = () => <Button onClick={() => postDelete(dialogInfo)}>Confirm</Button>;

  return (
    <>
      <Button
        color="error"
        size="small"
        sx={{ ml: ".25rem" }}
        variant="contained"
        onClick={() => handleClickOpen()}
      >
        Delete Entry
      </Button>
      <LedgerItemDialog
        modalControl={{ open, setOpen }}
        dialogData={{ title, dialogInfo }}
        button={{actionButton}}
      />
    </>
  );
}
