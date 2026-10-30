import InteractiveDemo from "../../../components/interactive-demo/interactive-demo.js";
import HistogramsScrollytelling from "./histograms/histograms-scrollytelling.js";
import HistogramsInteractive from "./histograms/interactive/histograms-interactive.js";
import KernelDensityEstimationScrollytelling from "./kernel-density-estimation/kernel-density-estimation-scrollytelling.js";
import KernelDensityEstimationInteractive from "./kernel-density-estimation/interactive/kernel-density-estimation-interactive.js";
import KNNDensityEstimationScrollytelling from "./knn-density-estimation/knn-density-estimation-scrollytelling.js";
import KNearestNeighbourDensityEstimation from "./knn-density-estimation/interactive/knn-density-estimation.js";
import latexFormula from "../../../utils/latex-formula.js";
import PageCard from "../../../components/page-card/page-card.js";
import IntroductionCardNonParametricMethods from "./introduction-card/introduction-card-non-parametric-methods.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function NonParametricMethods() {
  return (
    <>
      <IntroductionCardNonParametricMethods />
      <PageCard>
        <HistogramsScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which will cause a probability density estimation. Play with the
            bin width {latexFormula("\\Delta_i")} and observe how it affects the quality of the density estimation:
          </div>
          <HistogramsInteractive svgWidth={800} svgHeight={600} />
        </InteractiveDemo>

        <KernelDensityEstimationScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which will cause a probability density estimation. Play with the
            bandwidth {latexFormula("h")} and observe how it affects the quality of the density estimation:
          </div>
          <KernelDensityEstimationInteractive svgWidth={800} svgHeight={600} />
        </InteractiveDemo>

        <KNNDensityEstimationScrollytelling />

        <InteractiveDemo>
          <div className="interactive-demo-description">
            Try it out yourself by adding data points which will cause a probability density estimation. Play with the
            number of nearest neighbors {latexFormula("k")} and observe how it affects the quality of the density
            estimation:
          </div>
          <KNearestNeighbourDensityEstimation svgWidth={800} svgHeight={600} />
        </InteractiveDemo>
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/classification-and-regression/linear-discriminants"
        nextSectionName="Linear Discriminants"
        sources={[
          {
            title: "Nonparametric Methods [All]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Nonparametric Methods 2.5"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
        ]}
      />
    </>
  );
}
