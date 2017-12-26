# writer
A very cute app

A writing app that encourages regular writing, tracks word count goals and regularity, includes an english thesaurus and can provide writing excercise prompts.

There is a file browsing shelf on the left side, which is basically a calendar. Highligting a file will preview it in the main pane on the right.

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
