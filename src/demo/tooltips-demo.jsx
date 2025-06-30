import { Button } from "../components/button";
import { Tooltips } from "../components/tooltips";

export const TooltipsDemo = () => {
  return (
    <>
      <h2>Tooltips</h2>
      <div>
        <Tooltips
          trigger={
            <a>
              <Button>nihao</Button>
            </a>
          }
          arrow
          placement="right"
        >
          floating
        </Tooltips>
      </div>
    </>
  );
};
