module.exports = function (state, emitter) {
  state.viewstate = {}

  emitter.on('viewstate:add', onAddViewState)

  function onAddViewState (newState) {
    state.viewstate[newState.key] = newState.value
    emitter.emit('render')
  }

  emitter.on('viewstate:remove', onRemoveViewState)

  function onRemoveViewState (stateType) {
    delete state.viewstate[stateType]
    emitter.emit('render')
  }
}
