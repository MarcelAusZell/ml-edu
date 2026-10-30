import { useNavigate } from "react-router-dom";
import "./refferal-to-next-action.scss";
import { useEffect } from "react";

export default function RefferalToNextAction({ nextSectionUrl, nextSectionName, sources }) {
  const navigate = useNavigate();
  const hasSources = sources && sources.length > 0;
  const hasNextSection = nextSectionUrl && nextSectionName;

  const handleNavigation = (url) => {
    navigate(url);
    window.scrollTo(0, 0);
  };



  return (
    <>
      <div className="refferal-sources-container">
        {hasNextSection && (
          <div className="refferal-to-next-action">
            <button onClick={() => handleNavigation(nextSectionUrl)}>
              <div className="icon-heading">{nextSectionName}</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="referral-icon"
                viewBox="0 0 16 16"
              >
                <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>{" "}
            </button>
          </div>
        )}

        {hasSources && (
          <div className="sources-collapse">
            <button
              className="button-sources-collapse"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSources"
              aria-expanded="false"
              aria-controls="collapseSources"
            >
              <div className="icon-heading">
                Sources <br />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="sources-icon" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
              </svg>{" "}
            </button>
          </div>
        )}
      </div>

      {hasSources && (
        <div className="collapse" id="collapseSources">
          <div className="sources-collapsed-container">
            {sources.map((source, index) => (
              <div className="source-element" key={index}>
                <div className="source-title">{source.title}</div>

                {Array.isArray(source.description) ? (
                  <ul className="source-descriptions">
                    {source.description.map((desc, descIndex) => (
                      <li key={descIndex}>{desc}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="source-description">{source.description}</div>
                )}

                {source.pages && source.pages.length > 0 && (
                  <ul className="source-pages">
                    {source.pages.map((page, pageIndex) => (
                      <li key={pageIndex}>{page}</li>
                    ))}
                  </ul>
                )}

                {Array.isArray(source.link) ? (
                  <ul className="source-links">
                    {source.link.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a className="source-link" href={link} target="_blank" rel="noopener noreferrer">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <a className="source-link" href={source.link} target="_blank" rel="noopener noreferrer">
                    {source.link}
                  </a>
                )}
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
