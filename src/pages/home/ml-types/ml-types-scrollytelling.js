import React from "react";
import Scrollytelling from "../../../components/scrollytelling/scrollytelling";
import Visual from "./visual/visual";
import Text1 from "./textual/text-1";
import Text2 from "./textual/text-2";
import Text3 from "./textual/text-3";
import Text4 from "./textual/text-4";
import Text5 from "./textual/text-5";
import Text6 from "./textual/text-6";
import Text7 from "./textual/text-7";

const steps = [1, 2, 3, 4, 5, 6, 7];
const textComponents = [<Text1 />, <Text2 />, <Text3 />, <Text4 />, <Text5 />, <Text6 />, <Text7 />];

const MLTypesScrollytelling = () => (
  <Scrollytelling
    steps={steps}
    textComponents={textComponents}
    Visual={Visual}
    heading="Supervised vs. Unsupervised Learning"
  />
);

export default MLTypesScrollytelling;
