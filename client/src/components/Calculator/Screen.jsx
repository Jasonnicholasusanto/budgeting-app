import { Textfit } from "react-textfit";

const Screen = ({ value }) => {
  return (
    <Textfit className="calculatorScreen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;