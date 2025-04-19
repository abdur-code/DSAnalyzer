# DSAnalyzer

## Description
DSAnalyzer is a powerful web application designed to help developers analyze and improve their Data Structures and Algorithms code. It provides real-time code analysis, suggestions for improvements, and detailed feedback on various aspects of code quality including time complexity, space complexity, and code structure.

## Features
- **Multi-language Support**: Write and analyze code in multiple programming languages including JavaScript, Python, Java, and C++
- **Real-time Code Analysis**: Get instant feedback on your code's performance and structure
- **Detailed Evaluation**: Receive comprehensive analysis on:
  - Time Complexity
  - Space Complexity
  - Edge Case Handling
  - Code Structure
  - Variable Naming
  - Readability
  - Algorithm Choice
  - Problem Understanding
- **AI-Powered Suggestions**: Get intelligent recommendations for code improvements
- **Problem Description Integration**: Link your code to specific problem descriptions for better context
- **Modern UI**: Clean and intuitive interface with syntax highlighting and code suggestions

## Tech Stack
- **Frontend**: 
  - React.js
  - Monaco Editor (VS Code's editor)
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
- **AI Integration**:
  - Google Gemini API
- **Development Tools**:
  - Vite
  - npm
  - Git

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdur-code/DSAnalyzer.git
   cd DSAnalyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production
To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details. 