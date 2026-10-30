import { useState, useEffect } from "react";
import { Scrollama, Step } from "react-scrollama";
import "./scrollytelling.scss";

const MOBILE_WIDTH = 768;
const OFFSET_MOBILE = 0.7;
const OFFSET_DESKTOP = 0.55;
const DEBUG_MODE = false;

// The outer scrollytelling container is only for deactivating the inner scrollytelling more responsivly on section exit

export default function Scrollytelling({ steps, textComponents, Visual, heading = "" }) {
  const [currentStep, setCurrentStep] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [offset, setOffset] = useState(window.innerWidth < MOBILE_WIDTH ? OFFSET_MOBILE : OFFSET_DESKTOP);
  const [isOuterActive, setIsOuterActive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOffset(window.innerWidth < MOBILE_WIDTH ? OFFSET_MOBILE : OFFSET_DESKTOP);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onOuterStepEnter = () => {
    setIsOuterActive(true);
  };

  const onOuterStepExit = ({ direction }) => {
    if (direction === "up" || direction === "down") {
      setIsOuterActive(false);
      setCurrentStep(null);
    }
  };

  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };

  const onStepExit = ({ data, direction }) => {
    const isFirstStep = data === steps[0];
    const isLastStep = data === steps[steps.length - 1];

    if (direction === "up" && isFirstStep) {
      setCurrentStep(null);
    } else if (direction === "down" && isLastStep) {
      setCurrentStep(null);
    }
  };

  const onStepProgress = ({ progress }) => {
    setScrollProgress(progress);
  };

  return (
    <Scrollama onStepEnter={onOuterStepEnter} onStepExit={onOuterStepExit} offset={offset} debug={DEBUG_MODE}>
      <Step>
        <div className={`outer-scrollytelling-container ${isOuterActive ? "active" : "inactive"}`}>
          <div className={`scroll-indicator ${isOuterActive ? "visible" : "hidden"}`}>
            <div className="arrow">&#8592;</div>
          </div>

          <div className="scrollytelling-container">
            <div className="visuals">
              <Visual currentStep={currentStep} scrollProgress={scrollProgress} />
            </div>
            <div className="textuals">
              <div className={currentStep !== null ? "active-step" : "inactive-step"}>
                <h3>{heading}</h3>

                <Scrollama
                  onStepEnter={onStepEnter}
                  onStepExit={onStepExit}
                  progress
                  onStepProgress={onStepProgress}
                  offset={offset}
                  debug={DEBUG_MODE}
                >
                  {steps.map((innerValue) => (
                    <Step key={innerValue} data={innerValue}>
                      <div className="text-subsection">
                        <div
                          className={
                            currentStep === null
                              ? "inactive-text-subsection"
                              : currentStep === innerValue
                              ? "active-text-subsection"
                              : "inactive-text-subsection"
                          }
                        >
                          {textComponents[innerValue - 1]}
                        </div>
                        {innerValue === steps[steps.length - 1] && <div style={{ height: "50vh" }} />}
                      </div>
                    </Step>
                  ))}
                </Scrollama>
              </div>
            </div>
          </div>
        </div>
      </Step>
    </Scrollama>
  );
}
