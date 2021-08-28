const path = require('path')

const config = (id, name = id) => {
  const createPath = suffix => {
    let parts = [ id ]

    if(suffix)
      parts.push(suffix)
    
    parts.push('js')
    
    return path.join(__dirname, 'dist', parts.join('.') )
  }

  return {
    input: path.join('src', id + '.js'),
    output: [
      {
        file: createPath(),
        name,
        format: 'umd'
      },
      {
        file: createPath('module'),
        format: 'es'
      }
    ]
  }
}

module.exports = [
  config('asar'),
  config('openAsar')
]