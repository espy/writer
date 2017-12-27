const moment = require('moment')

module.exports = function (state, emitter) {
  state.texts = []
  const today = moment().format('DD-MM-YYYY')
  const yesterday = moment().subtract(1, 'day').format('DD-MM-YYYY')
  // If there’s no data, generate a default item
  state.texts.push({
    date: today,
    name: 'Welcome to dailies',
    text: 'This might be the central challenge of our time, being, as we are, on the cusp of any number of major systems reaching inflection points, from global climate and temperature to the cost of solar power to the capacity of batteries to the possibilities of genetic engineering to the capabilities of AI, whatever your opinions of that may be. Truths that have been held for centuries are wobbling, huge dominoes forged of decades of assumptions and certainties are about to topple and kick off chains of events that will change human life on this planet so significantly we’ll all have trouble keeping up.',
    chars: undefined,
    words: undefined,
    selection: [0, 0]
  })
  state.texts.push({
    date: yesterday,
    name: 'Yesterday’s text',
    text: 'Lorem ipsum lah dee dah.',
    chars: 24,
    words: 5,
    selection: [0, 0]
  })

  emitter.on('text:update', updateText)

  function updateText (updatedText) {
    const textIndex = state.texts.findIndex((text) => {
      return text.date === updatedText.date
    })
    state.texts[textIndex] = updatedText
    emitter.emit('render')
  }
}
