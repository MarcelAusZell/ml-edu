import React from "react";
import Scrollytelling from "../../../../components/scrollytelling/scrollytelling";
import Visual from "./visual/visual";
import Text1 from "./textual/text-1";
import Text2 from "./textual/text-2";
import Text3 from "./textual/text-3";
import Text4 from "./textual/text-4";
import Text5 from "./textual/text-5";

const steps = [1, 2, 3, 4, 5];
const textComponents = [<Text1 />, <Text2 />, <Text3 />, <Text4 />, <Text5 />];

const MultivariateGaussianScrollytelling = () => (
  <Scrollytelling
    steps={steps}
    textComponents={textComponents}
    Visual={Visual}
    heading="Multivariate Normal Distribution"
  />
);

export default MultivariateGaussianScrollytelling;
