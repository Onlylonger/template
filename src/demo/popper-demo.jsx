import { useState } from "react";
import { Popper } from "../components/popper";
import { Button } from "../components/button";

export const PopperDemo = () => {
  const [open, setOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [hoverClickOpen, setHoverClickOpen] = useState(false);

  return (
    <>
      <h2>Popper</h2>
      <div>
        <Popper
          open={open}
          onOpenChange={setOpen}
          trigger={
            <Button onClick={() => setOpen(true)}>Controlled click test</Button>
          }
        >
          <div>floating</div>
        </Popper>
        <Popper
          open={hoverOpen}
          onOpenChange={setHoverOpen}
          click={false}
          hover
          trigger={
            <Button onMouseEnter={() => setHoverOpen(true)}>
              Controlled hover test
            </Button>
          }
        >
          <div>floating</div>
        </Popper>
        <Popper
          open={hoverClickOpen}
          onOpenChange={setHoverClickOpen}
          hover
          trigger={
            <Button onMouseEnter={() => setHoverClickOpen(true)}>
              Controlled click & hover test
            </Button>
          }
        >
          <div>floating</div>
        </Popper>
        <Popper trigger={<Button>Uncontrolled click test</Button>}>
          <div>floating</div>
        </Popper>
        <Popper
          hover
          click={false}
          trigger={<Button>Uncontrolled hover test</Button>}
        >
          <div>floating</div>
        </Popper>
        <Popper
          hover
          trigger={<Button>Uncontrolled click & hover test</Button>}
        >
          <div>floating</div>
        </Popper>
      </div>
    </>
  );
};
