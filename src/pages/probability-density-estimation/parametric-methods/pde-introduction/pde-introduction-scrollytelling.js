import React from "react";
import Scrollytelling from "../../../../components/scrollytelling/scrollytelling";
import Visual from "./visual/visual";
import Text1 from "./textual/text-1";
import Text2 from "./textual/text-2";
import Text3 from "./textual/text-3";

const steps = [1, 2, 3];
const textComponents = [<Text1 />, <Text2 />, <Text3 />];

const PDEIntroductionScrollytelling = () => (
  <Scrollytelling steps={steps} textComponents={textComponents} Visual={Visual}     heading="Probability Density Estimation"
/>
);

export default PDEIntroductionScrollytelling;
