import { Popper } from "../popper";

export const Tooltips = (props) => {
  const { children, ...reset } = props;

  return (
    <Popper
      {...reset}
      offsetHeight={5}
      floatingArrowProps={{ fill: "bg-black" }}
    >
      <div className="px-2 py-1 rounded-md bg-black text-white">{children}</div>
    </Popper>
  );
};
