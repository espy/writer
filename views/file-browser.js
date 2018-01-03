const html = require('choo/html')
const moment = require('moment')

function view (state, emit) {
  return html`
    <section class='file-browser'>
      <ul class='sidebar__list'>
        ${state.synonyms.synonyms && state.synonyms.synonyms.length > 0
        ? state.synonyms.synonyms.map((synonym, index) =>
          html`<li className=${state.synonyms.currentSynonym === index ? 'active' : ''}>${synonym}</li>`
        )
        : state.texts.map((text) => {
          const weekday = moment.weekdays()[moment(text, 'DD-MM-YYYY').weekday()]
          return html`
            <li><a href='#/day/${text}'>${weekday}, ${text}</a></li>
          `
        })
        }
      </ul>
    </section>
  `
}

module.exports = view
