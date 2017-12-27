/* global FileReader */

/*

Handles all files dropped onto the body element.
Will emit a `${fileType}:load` event, where fileType is the…
file type, such as `thm` or `json`.
Unsupported file types will just be ignored since nothing
will handle their events.

*/

module.exports = function (state, emitter) {
  emitter.on('drop', onDrop)

  function onDrop (e) {
    e.stopPropagation()
    e.preventDefault()

    const files = e.dataTransfer.files
    const file = files[0]

    const path = file.path ? file.path : file.name
    const reader = new FileReader()
    reader.onload = function (e) {
      const fileType = path.split('.').pop()
      emitter.emit(`${fileType}:load`, path, e.target.result)
    }
    reader.readAsText(file)
  }
}
