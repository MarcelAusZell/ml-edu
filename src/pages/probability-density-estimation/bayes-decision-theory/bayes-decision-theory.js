import PriorAndLikelihood from "./prior-and-lilkelihood/prior-and-likelihood-scrollytelling.js";
import PosterioriProbabilityScrollytelling from "./posteriori-probability/posteriori-probability-scrollytelling.js";
import TopicOutlookScrollytelling from "./topic-outlook/topic-outlook-scrollytelling.js";
import IntroductionCardBayerDecisionTheory from "./introduction-card/introducation-card-bayes.js";
import PageCard from "../../../components/page-card/page-card.js";
import RefferalToNextAction from "../../../components/refferal-to-next-section/refferal-to-next-action.js";

export default function BayesDecisionTheory() {
  return (
    <>
      <IntroductionCardBayerDecisionTheory />
      <PageCard>
        <PriorAndLikelihood />
        <PosterioriProbabilityScrollytelling />

        <TopicOutlookScrollytelling />
      </PageCard>
      <RefferalToNextAction
        nextSectionUrl="/probability-density-estimation/parametric-methods"
        nextSectionName="Parametric Methods"
        sources={[
          {
            title: "Bayes Decision Theory [1 - 11]",
            description: ["Christopher Bishop - Pattern Recognition and Machine Learning"],
            pages: ["Probability Theory 1.2, Decision Theory 1.5"],
            link: "https://www.microsoft.com/en-us/research/uploads/prod/2006/01/Bishop-Pattern-Recognition-and-Machine-Learning-2006.pdf",
          },
          {
            title: "Bayes Decision Theory [1 - 11]",
            description: ["Machine Learning - RWTH Aachen University- Prof. Leibe"],
            pages: ["Bayes Decision Theory p. 32 - 45"],
            link: "https://www.vision.rwth-aachen.de/media/course/SS/2016/machine-learning/ml16-part01-intro.pdf",
          },
        ]}
      />
    </>
  );
}
