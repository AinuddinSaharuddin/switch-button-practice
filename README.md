# 🎮 Joy-Con Button Trainer

A small browser practice app for learning the Nintendo Switch right Joy-Con face-button layout: `X`, `Y`, `B`, and `A`.

The app shows a target button and lets you answer with arrow keys or by clicking the on-screen Joy-Con buttons. It tracks score, streak, and best streak so you can build muscle memory over time.

## ✨ Features

- 🧠 Practice the right Joy-Con layout: `X` up, `Y` left, `A` right, `B` down
- ⌨️ Keyboard controls using arrow keys
- 🕹️ Clickable right Joy-Con display
- 🔥 Score, streak, and best-streak tracking
- ⚡ Speed mode with a short timeout
- 👁️ Hide/show the Joy-Con display
- 🚩 Toggleable clue signs on the target letters
- 📦 No build step or dependencies

## 🎯 Controls

| Input | Button |
| --- | --- |
| Up arrow | X |
| Left arrow | Y |
| Right arrow | A |
| Down arrow | B |

You can also click the matching button on the Joy-Con display.

## 🚀 How to Run

Open `index.html` in any modern browser.

Because this is a static site, there is no install command and no development server required.

## 📁 Files

- `index.html` - Page structure and controls
- `styles.css` - Layout, Joy-Con art, button styling, and clue visuals
- `script.js` - Quiz logic, scoring, keyboard controls, and toggles

## 📝 Notes

Best streak and clue preference are saved in `localStorage`, so they persist after refreshing the page.
