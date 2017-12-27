# writer
A very cute app

A writing app that encourages regular writing, tracks word count goals and regularity, includes an english thesaurus and can provide writing excercise prompts.

There is a file browsing shelf on the left side, which is basically a calendar. Highligting a file will preview it in the main pane on the right.

## Roadmap
- [ ] Calendarised file menu in the sidebar, you select days, not actual files.
  - [ ] File previews show stats (wordcount, date)
- [x] Themeable with hundredrabbits `.thm` files, per drag and drop, with preview
  - [ ] Once file storage is implemented, add a theme management pane
- [x] Character, word and line count
- [ ] Synonym suggestions on <key>tab</key>
  - [x] Basic implementation
  - [ ] Better dictionary
  - [ ] Use stemmer to find word stems
  - [ ] Support more languages
- [ ] Electronise the app!
  - [ ] Store all files (texts and themes) on disk

## Routes
Route              | File               | Description                     |
-------------------|--------------------|---------------------------------|
`/`              | `views/main.js`  | The main view
`/*`             | `views/404.js`   | Display unhandled routes

## Commands
Command                | Description                                      |
-----------------------|--------------------------------------------------|
`$ npm start`        | Start the development server
`$ npm test`         | Lint, validate deps & run tests
`$ npm run build`    | Compile all files into `dist/`
`$ npm run inspect`  | Inspect the bundle's dependencies
