# ResumeCraft AI — Premium Resume Builder

An advanced, responsive single-page web application that empowers users to design high-impact, recruiter-optimized resumes in real time. It balances high-end graphic design templates, local template-based fallbacks, live Google Gemini Generative AI optimizations, and direct pixel-perfect PDF vector exporting.

Developed as a core assignment project reflecting standard executive engineering principles.

---

## 👨‍💻 Author Credits & Ownership

- **Developer**: Bhoompally Kalyan Reddy
- **Email Contact**: [prsnlkalyan@gmail.com](mailto:prsnlkalyan@gmail.com)
- **GitHub Repository**: [kalyan-1845/Resume-Builder](https://github.com/kalyan-1845/Resume-Builder)
- **Copyright License**: MIT License (c) 2026

If you wish to reuse, reference, or credit this application, please maintain the authorship credentials above.

---

## 🌟 Key Features

1. **Simulated Paper Canvas (Live Preview)**:
   - Split-screen workspace layout providing real-time paper rendering on the right.
   - **Active Section Focus**: Focus states in the form editor dynamically isolate and highlight the targeted section in the preview while softening and dimming non-focused content.

2. **Four Bespoke Designer Templates**:
   - **Modern Slate**: Asymmetric double-column design optimized for general corporate roles.
   - **Emerald Creative**: Split side-panel with rich deep forest accents, circular capabilities meters, and timeline nodes.
   - **Developer Tech**: Code-inspired technical syntax, tag grids, and monospaced properties labels.
   - **Editorial Minimal**: Spacious typographic layout utilizing elegant editorial serif structures.

3. **Advanced Dual-Mode AI Engines**:
   - **Local Fallback Systems**: Built-in template algorithms to create summaries and polish action verb descriptions instantly without internet or configuration dependencies.
   - **Google Gemini API Integration**: Direct client-side hookups to `gemini-2.5-flash` using custom settings. Provides professional summary compilation and X-Y-Z experience enhancers.
   - **AI Scorecard Dashboard**: Reviews resume data, calculates a grading score (0 to 100) rendered in radial SVG gauges, and provides specific strengths and actionable recommendations.

4. **Direct Vector PDF Exporting**: Meticulously structured print-media stylesheets preventing column orphans or timeline clipping, exporting high-fidelity vector document copies cleanly via `html2pdf.js`.

---

## 🛠️ Technology Stack

- **Core Framework**: React 19 + TypeScript + Vite
- **Styling system**: Vanilla CSS (CSS Grid, HSL custom variables, glassmorphic layout panel)
- **Iconography**: Lucide React
- **PDF Renderer**: html2pdf.js

---

## 🚀 Setup & Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- NPM (v9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:kalyan-1845/Resume-Builder.git
   cd Resume-Builder
   ```
2. Install all core packages:
   ```bash
   npm install
   ```
3. Run the development server locally:
   ```bash
   npm run dev
   ```
4. Access the portal at `http://localhost:5173`.

### Compile Check
To build the project for production verify:
```bash
npm run build
```
