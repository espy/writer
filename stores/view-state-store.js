/*

A store to handle view state.

Listens to:

emit('viewstate:add',{
  key: 'theme',
  value: 'could be anything'
})

Adds the passed object to `state.viewstate[object.key]`

emit('viewstate:remove', stateKey)

Removes the key and object specified by `stateKey`

*/

module.exports = function (state, emitter) {
  state.viewstate = {}

  emitter.on('viewstate:add', onAddViewState)

  function onAddViewState (newState) {
    state.viewstate[newState.key] = newState.value
    emitter.emit('render')
  }

  emitter.on('viewstate:remove', onRemoveViewState)

  function onRemoveViewState (stateKey) {
    delete state.viewstate[stateKey]
    emitter.emit('render')
  }
}
