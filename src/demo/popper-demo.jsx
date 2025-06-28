import { useState } from "react";
import { Popper } from "../components/popper";

export const PopperDemo = () => {
  const [open, setOpen] = useState(false);
  const [hoverOpen, setHoverOpen] = useState(false);
  const [hoverClickOpen, setHoverClickOpen] = useState(false);

  return (
    <>
      <div>
        <Popper
          open={open}
          onOpenChange={setOpen}
          trigger={
            <button onClick={() => setOpen(true)}>Controlled click test</button>
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
            <button onMouseEnter={() => setHoverOpen(true)}>
              Controlled hover test
            </button>
          }
        >
          <div>floating</div>
        </Popper>
        <Popper
          open={hoverClickOpen}
          onOpenChange={setHoverClickOpen}
          hover
          trigger={
            <button onMouseEnter={() => setHoverClickOpen(true)}>
              Controlled click & hover test
            </button>
          }
        >
          <div>floating</div>
        </Popper>
        <Popper trigger={<button>Uncontrolled click test</button>}>
          <div>floating</div>
        </Popper>
        <Popper
          hover
          click={false}
          trigger={<button>Uncontrolled hover test</button>}
        >
          <div>floating</div>
        </Popper>
        <Popper
          hover
          trigger={<button>Uncontrolled click & hover test</button>}
        >
          <div>floating</div>
        </Popper>
      </div>
      <div></div>
    </>
  );
};
