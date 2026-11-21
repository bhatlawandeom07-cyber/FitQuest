# FitQuest Design & Typography Rules

## 1. Universal Typography Standard (MANDATORY)
**All typography across the website now and in all future pages/components MUST strictly use the Apple macOS / iOS San Francisco font stack.**

- **Sans & Display Font Family**:
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.015em;
  ```
- **Monospace & Telemetry Font Family**:
  ```css
  font-family: "SF Mono", "JetBrains Mono", Menlo, Monaco, Consolas, monospace;
  ```
- **Tailwind Config Mapping**:
  - `font-sans`: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", system-ui, sans-serif`
  - `font-display`: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "SF Pro", system-ui, sans-serif`
  - `font-mono`: `"SF Mono", "JetBrains Mono", Menlo, monospace`

## 2. Aesthetics & Design Tokens
- **Theme**: Pure Minimal Black (`#000000`)
- **Card/Border Accents**: Glass borders with `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.12)`
- **Interactive Buttons**: `LiquidButton` from `@/components/ui/liquid-glass-button` with glass refraction and specular rim highlights.
- **Hero Reveal**: WebGL `FlashlightTextReveal` with bold San Francisco tracking.
