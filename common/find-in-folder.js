var findInFolder = (what, where, callback) => {
  var exec = require('child_process').exec
  exec(`grep ${what} '${where}' -inr`, (err, stdin, stdout) => {
    if (err) {
      console.error('Couldn’t grep! ', err)
    }
    var list = []
    // Each result is a new line in the format file:linenum:line
    var results = stdin.split('\n')
    // remove last element (it’s an empty line)
    results.pop()
    results.forEach((line) => {
      const lineParts = line.split(':')
      const fileName = lineParts[0]
      // The file might already be in the results list
      const fileAlreadyExistsIndex = list.findIndex((result) => {
        return result.fileName === fileName
      })
      const lineObject = {'line-number': lineParts[1], 'line': lineParts[2]}
      if (fileAlreadyExistsIndex >= 0) {
        list[fileAlreadyExistsIndex].lines.push(lineObject)
      } else {
        list.push({
          fileName: line.split(':')[0],
          lines: [lineObject]
        })
      }
    })
    callback(list)
  })
}

module.exports = findInFolder
