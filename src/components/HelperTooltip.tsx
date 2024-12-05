import { IoIosHelpCircleOutline } from "react-icons/io";
import { Tooltip } from "./ui/tooltip";

type Props = {
  helperText: string;
};

const HelperTooltip = (props: Props) => {
  return (
    <Tooltip content={props.helperText} positioning={{ placement: "top" }}>
      <span>
        <IoIosHelpCircleOutline size={24} />
      </span>
    </Tooltip>
  );
};

export default HelperTooltip;
