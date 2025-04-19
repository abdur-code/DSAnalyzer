import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import { evaluateCode } from '../api/gemini';
import './CodeEditor.css';

const languages = [
  { 
    value: 'javascript', 
    label: 'JavaScript',
    defaultCode: '// Write your JavaScript code here\nfunction example() {\n  console.log("Hello World");\n}'
  },
  { 
    value: 'python', 
    label: 'Python',
    defaultCode: '# Write your Python code here\ndef example():\n    print("Hello World")'
  },
  { 
    value: 'java', 
    label: 'Java',
    defaultCode: '// Write your Java code here\npublic class Example {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}'
  },
  { 
    value: 'cpp', 
    label: 'C++',
    defaultCode: '// Write your C++ code here\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}'
  }
];

const CodeEditor = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(languages[0].defaultCode);
  const [language, setLanguage] = useState('javascript');
  const [problemDescription, setProblemDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    const lang = languages.find(l => l.value === newLanguage);
    if (lang) {
      setCode(lang.defaultCode);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await evaluateCode(code, problemDescription);
      // Navigate to results page with the analysis data
      navigate('/results', { state: { analysis: result } });
    } catch (err) {
      setError('Failed to analyze code. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="welcome-section">
        <h1 className="gradient-text">Welcome to DSAnalyzer</h1>
        <p className="subtitle">Your AI-powered code analysis tool</p>
        <div className="instructions">
          <h2>How to use:</h2>
          <ol>
            <li>Select your programming language from the dropdown</li>
            <li>Write or paste your code in the editor</li>
            <li>Optionally describe your problem or algorithm</li>
            <li>Click "Analyze Code" to get insights</li>
          </ol>
        </div>
      </div>

      <div className="problem-description">
        <h2>Problem Description</h2>
        <p className="description-hint">Describe your problem or algorithm here to get better analysis</p>
        <textarea
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
          placeholder="Example: I'm trying to implement a binary search algorithm that finds the first occurrence of a target value in a sorted array..."
          rows={8}
        />
      </div>

      <div className="editor-section">
        <div className="editor-controls">
          <div className="language-selector-container">
            <label htmlFor="language-select">Select Language:</label>
            <select 
              id="language-select"
              value={language} 
              onChange={handleLanguageChange}
              className="language-selector"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <button 
            onClick={handleSubmit}
            className="submit-button"
            disabled={loading}
          >
            <span className="button-text">
              {loading ? 'Analyzing...' : 'Analyze Code'}
            </span>
            <span className="button-icon">→</span>
          </button>
        </div>
        <div className="editor-wrapper">
          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={setCode}
            theme="vs-dark"
            options={{
              fontSize: 14,
              lineNumbers: 'on',
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              suggest: { enabled: true },
              quickSuggestions: true,
              parameterHints: { enabled: true }
            }}
          />
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;