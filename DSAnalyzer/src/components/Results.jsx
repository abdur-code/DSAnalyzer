import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Results.css';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis } = location.state || {};

  if (!analysis) {
    return (
      <div className="results-container">
        <div className="error-message">
          No analysis data found. Please go back and analyze your code.
        </div>
        <button onClick={() => navigate('/')} className="back-button">
          Go Back
        </button>
      </div>
    );
  }

  const ScoreRing = ({ score, label, size = 'normal' }) => {
    const radius = size === 'large' ? 60 : 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 10) * circumference;

    return (
      <div className={`score-ring-container ${size}`}>
        <svg className="score-ring" width={radius * 2 + 20} height={radius * 2 + 20}>
          <circle
            className="score-ring-background"
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            strokeWidth="8"
          />
          <circle
            className="score-ring-progress"
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="score-text">
          <span className="score-value">{score}</span>
          <span className="score-label">{label}</span>
        </div>
      </div>
    );
  };

  const ScoreCard = ({ title, score, explanation, isOverall = false }) => (
    <div className={`score-card ${isOverall ? 'overall' : ''}`}>
      <h3>{title}</h3>
      <ScoreRing score={score} label="Score" size={isOverall ? 'large' : 'normal'} />
      {explanation && <p>{explanation}</p>}
    </div>
  );

  return (
    <div className="results-container">
      <div className="results-header">
        <h1 className="gradient-text">Analysis Results</h1>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Editor
        </button>
      </div>

      <div className="overall-score-card">
        <ScoreCard
          title="Overall Score"
          score={analysis.overallScore}
          explanation={analysis.summary}
          isOverall={true}
        />
      </div>

      <div className="scores-grid">
        <ScoreCard
          title="Time Complexity"
          score={analysis.timeComplexity.score}
          explanation={analysis.timeComplexity.explanation}
        />
        <ScoreCard
          title="Space Complexity"
          score={analysis.spaceComplexity.score}
          explanation={analysis.spaceComplexity.explanation}
        />
        <ScoreCard
          title="Edge Cases"
          score={analysis.edgeCases.score}
          explanation={analysis.edgeCases.explanation}
        />
        <ScoreCard
          title="Code Structure"
          score={analysis.codeStructure.score}
          explanation={analysis.codeStructure.explanation}
        />
        <ScoreCard
          title="Variable Naming"
          score={analysis.variableNaming.score}
          explanation={analysis.variableNaming.explanation}
        />
        <ScoreCard
          title="Readability"
          score={analysis.readability.score}
          explanation={analysis.readability.explanation}
        />
        <ScoreCard
          title="Algorithm Choice"
          score={analysis.algorithmChoice.score}
          explanation={analysis.algorithmChoice.explanation}
        />
        <ScoreCard
          title="Problem Understanding"
          score={analysis.problemUnderstanding.score}
          explanation={analysis.problemUnderstanding.explanation}
        />
      </div>

      <div className="suggestions-section">
        <h2>Suggested Improvements</h2>
        <div className="suggested-code">
          <h3>Improved Code</h3>
          <pre>{analysis.suggestedImprovements.code}</pre>
        </div>
        <div className="improvement-explanation">
          <h3>Explanation</h3>
          <p>{analysis.suggestedImprovements.explanation}</p>
        </div>
      </div>
    </div>
  );
};

export default Results; 