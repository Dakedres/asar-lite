const jsdoc2md = require('jsdoc-to-markdown'),
      fs = require('fs/promises'),
      path = require('path')

const docsPath = path.join(__dirname, 'README.md'),
      startDocs = `<!---jsdoc start-->`,
      endDocs = `<!---jsdoc end-->`

const writeDocs = async markdown => {
  let readme = await fs.readFile(docsPath, 'utf-8'),
      start = readme.slice(0, readme.indexOf(startDocs) + startDocs.length),
      end = readme.slice( readme.indexOf(endDocs) )

  await fs.writeFile(docsPath, start + `\n${markdown}` + end)

  return 'Done!'
}

jsdoc2md.render({
  files: 'src/*.js',
  'heading-depth': 3
})
  .then(writeDocs)
  .then(console.log)