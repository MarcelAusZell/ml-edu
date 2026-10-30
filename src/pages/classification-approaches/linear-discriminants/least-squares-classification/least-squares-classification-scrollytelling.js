import React from "react";
import Scrollytelling from "../../../../components/scrollytelling/scrollytelling";
import Visual from "./visual/visual";
import Text1 from "./textual/text-1";
import Text2 from "./textual/text-2";
import Text3 from "./textual/text-3";
import Text4 from "./textual/text-4";
import Text5 from "./textual/text-5";
import Text6 from "./textual/text-6";
import Text7 from "./textual/text-7";
import Text8 from "./textual/text-8";
import Text9 from "./textual/text-9";
import Text10 from "./textual/text-10";
import Text11 from "./textual/text-11";

const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const textComponents = [
  <Text1 />,
  <Text2 />,
  <Text3 />,
  <Text4 />,
  <Text5 />,
  <Text6 />,
  <Text7 />,
  <Text8 />,
  <Text9 />,
  <Text10 />,
  <Text11 />,
];

const LeastSquaresClassificationScrollytelling = () => (
  <Scrollytelling
    steps={steps}
    textComponents={textComponents}
    Visual={Visual}
    heading="Least Squares Classification"
  />
);

export default LeastSquaresClassificationScrollytelling;
