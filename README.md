# Design Engineering 2026 🚀

> **Bridging the gap between Design (Figma) and Engineering (Code).**

My personal monorepo documenting the journey from UI designer to **Design Engineer** — building real, shippable interfaces while learning the stack behind them.

## 🎯 Goal

Build production-ready user interfaces that match the design pixel-for-pixel and function flawlessly.
**Target stack:** Figma · React · TypeScript · Tailwind CSS

## 🗺 Roadmap & Progress

### ✅ Completed — Vanilla Fundamentals (2026 Q1)

| Sprint | Project | Tech Focus | Status |
| :--- | :--- | :--- | :--- |
| [W01-02](./week01-02-jins-card) | **JINS Product Card** | Semantic HTML, Flexbox/Grid, CSS Variables, a11y | ✅ Done |
| [W03-04](./week03-04-js-dom-manipulation) | **JINS Product Detail Page** | DOM manipulation, event handling, UI logic | ✅ Done |
| [W05-06](./week05-06-toast-notification) | **PDP v2: Data-Driven Rendering** | Central state object, render functions, localStorage, Toast | ✅ Done |
| — | [**Translate Card App**](./translate-card-app) | fetch / async-await, Flask API, JSON, SQLite | ✅ Done |

> **Key takeaway from this phase:** rebuilt the PDP twice — first with direct DOM manipulation, then with a central state object driving all rendering (`state → render`). Hand-building this pattern in vanilla JS is exactly why React makes sense.

### 🔄 In Progress — React & The Modern Stack (2026 Q2–Q3)

| Phase | Weeks | Project | Tech Focus | Status |
| :--- | :--- | :--- | :--- | :--- |
| **R** | 1–4 | **JINS PDP, rebuilt in React** | Components, props, `useState`, `useEffect`, lifting state | 🔨 In progress |
| **T** | 5–8 | **PDP → TypeScript + Tailwind** | Typing props/state/data, utility-first styling | ⏳ Planned |
| **D** | 9–14 | **Mini design system** | Component library, Storybook, design tokens, a11y | ⏳ Planned |
| **P** | 15–20 | **Portfolio & case studies** | Astro blog write-ups, applications | ⏳ Planned |

## 🌟 Featured Project: JINS Product Detail Page

A product detail page for eyewear — frame color picker, lens selector, live price calculation, cart with localStorage persistence, and toast notifications. Built three times, on purpose:

1. **v1 — DOM manipulation** ([W03-04](./week03-04-js-dom-manipulation)): query elements, mutate them directly.
2. **v2 — data-driven** ([W05-06](./week05-06-toast-notification)): one `currentOrder` state object; the UI is always re-rendered from state.
3. **v3 — React** (Phase R, in progress): same data layer, components and hooks replace hand-written render functions.

The same app evolving across paradigms is the throughline of this repo — each rewrite isolates *what the framework actually solves*.

## 🛠 Tech Stack & Tools

* **Design:** Figma (Auto Layout, Components, Variables)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), React, TypeScript *(learning)*, Tailwind CSS *(learning)*
* **Backend basics:** Python, Flask, SQLite
* **Infra:** Git & GitHub, GitHub Actions → personal VPS, Vercel

## 👤 Author

**Kevin Xie** — UI designer → design engineer, based in Osaka, Japan.
4 years in UI design · trilingual (ZH / JA / EN) · currently building in public.

---
*Started 2026. Rebuilt, not restarted.* 🚀
