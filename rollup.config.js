const path = require('path'),
      { terser } = require('rollup-plugin-terser')

const config = (id, name = id) => {
  const createPath = (...suffix) =>
    path.join(__dirname, 'dist', [ id, ...suffix, 'js' ].join('.') )

  const createOut = (...suffix) => ({
    input: path.join('src', id + '.js'),
    output: [
      {
        file: createPath(...suffix),
        name,
        format: 'umd'
      },
      {
        file: createPath('module', ...suffix),
        format: 'es'
      }
    ]
  })

  console.log(createPath('min'))

  return [
    createOut(),
    Object.assign(
      createOut('min'),
      {
        plugins: [ terser() ]
      }
    )
  ]
}

module.exports = [
  ...config('Asar'),
  ...config('openAsar')
]