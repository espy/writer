const html = require('choo/html')
const moment = require('moment')

function view (state, emit) {
  const dateFormat = 'YYYY-MM-DD'
  const today = moment().format(dateFormat)
  const oldestText = state.texts.length > 0 ? state.texts[state.texts.length - 1] : today
  let calendar = [oldestText]
  let doIterate = true
  if (oldestText !== today) {
    while (doIterate) {
      const nextDay = moment(calendar[calendar.length - 1], dateFormat).add(1, 'd').format(dateFormat)
      calendar.push(nextDay)
      if (nextDay === today) {
        doIterate = false
      }
    }
  }
  calendar.reverse()
  if (state.search && state.search.files.length > 0) {
    calendar = calendar.filter((date) => {
      return !!state.search.files.find((file) => {
        return file.fileName.split('/').pop().split('.')[0] === date
      })
    })
  }
  if (state.search && state.search.files.length === 0) {
    calendar = []
  }
  return html`
    <section class='file-browser'>
      <ul class='sidebar__list'>
        ${state.synonyms.synonyms && state.synonyms.synonyms.length > 0
        ? state.synonyms.synonyms.map((synonym, index) =>
          html`<li className=${state.synonyms.currentSynonym === index ? 'active' : ''}>${synonym}</li>`
        )
        : calendar.map((date) => {
          const weekday = moment.weekdays()[moment(date, dateFormat).weekday()]
          const dateString = moment(date).format('DD.MM.YYYY')
          return html`
            <li><a href='#/day/${date}'>${dateString} - ${weekday}</a></li>
          `
        })
        }
      </ul>
    </section>
  `
}

module.exports = view
