const moment = require('moment')
const path = window.require('path')
const fs = window.require('fs-extra')

module.exports = function (state, emitter) {
  state.texts = []
  state.currentText = {
    text: 'No text loaded',
    date: undefined
  }
  const textsPath = path.join(state.paths.userData, 'texts')
  const today = moment().format('DD-MM-YYYY')
  const welcomeText = 'Welcome to the daily writer. This might be the central challenge of our time, being, as we are, on the cusp of any number of major systems reaching inflection points, from global climate and temperature to the cost of solar power to the capacity of batteries to the possibilities of genetic engineering to the capabilities of AI, whatever your opinions of that may be. Truths that have been held for centuries are wobbling, huge dominoes forged of decades of assumptions and certainties are about to topple and kick off chains of events that will change human life on this planet so significantly we’ll all have trouble keeping up.'

  function firstRun () {
    fs.ensureDirSync(textsPath)
    fs.writeFile(path.join(textsPath, `${today}.txt`), welcomeText, (err) => {
      if (err) {
        console.log('error writing welcome text to the userdata folder:', err)
      }
      emitter.emit('texts:available', textsPath)
    })
  }

  fs.readdir(state.paths.userData, (err, items) => {
    if (items.indexOf('texts') === -1) {
      console.log('No texts folder in user folder')
      firstRun()
    } else {
      fs.readdir(textsPath, (err, items) => {
        if (items.length === 0) {
          console.log('No texts in user’s texts folder')
          firstRun()
        } else {
          emitter.emit('texts:available', textsPath)
        }
        if (err) {
          console.log('error checking out the userdata folder:', err)
        }
      })
    }
    if (err) {
      console.log('error checking out the userdata folder:', err)
    }
  })

  emitter.on('texts:available', onTextAvailable)

  function onTextAvailable (path) {
    if (path) {
      fs.readdir(path, function (err, items) {
        console.log('available texts: ', items)
        state.texts = items.map((item) => {
          return item.split('.')[0]
        })
        emitter.emit('render')
        if (err) {
          console.log('error loading user texts:', err)
        }
      })
    }
  }

  emitter.on('text:update', updateText)

  function updateText (updatedText) {
    // TODO: this needs to debounce writes, I think
    fs.writeFile(path.join(textsPath, `${updatedText.date}.txt`), updatedText.text, (err) => {
      if (err) {
        console.log(`error writing ${updatedText.date} text to the userdata folder:`, err)
      }
    })
  }

  emitter.on('navigate', onNavigate)

  function onNavigate () {
    // Timeout because of https://github.com/choojs/choo/issues/463
    setTimeout(() => {
      // Check whether we need to do anything
      if (state.params.date && state.route === '/day/:date') {
        fs.readFile(path.join(textsPath, `${state.params.date}.txt`), 'utf8', (err, data) => {
          if (err) {
            console.log('error loading user text', state.params.date, err)
          }
          state.currentText = {
            text: data,
            date: state.params.date
          }
          console.log('text loaded render')
          emitter.emit('render')
        })
      }
    }, 100)
  }
}
