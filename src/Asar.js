import openAsar from './openAsar'

const crawlHeader = function self(files, dirname) {
  const prefix = itemName =>
    (dirname ? dirname + '/' : '') + itemName

  let children = []

  for(const filename in files) {
    const extraFiles = files[filename].files
    
    if(extraFiles) {
      const extra = self(extraFiles, filename)

      children = children.concat(extra)
    }
  
    children.push(filename)
  }

  return children.map(prefix)
}

/**
 * These paths must be absolute and posix-style, without a leading forward slash.
 * @typedef {String} ArchivePath
 */

/**
 * An Asar archive
 * @class
 * @param {ArrayBuffer} archive The archive to open
 */
class Asar {
  constructor(archive) {
    const { header, buffer } = openAsar(archive)

    this.header = header
    this.buffer = buffer
    this.contents = crawlHeader(header)
  }

  /**
   * Retrieves information on a directory or file from the archive's header
   * @param {ArchivePath} path The path to the dirent
   * @returns {Object}
   */
  find(path) {
    const navigate = (currentItem, navigateTo) => {
      if(currentItem.files) {
        const nextItem = currentItem.files[navigateTo]

        if(!nextItem) {
          if(path == '/') // This breaks it lol
            return this.header
          
          throw new PathError(path, `${navigateTo} could not be found.`)
        }

        return nextItem
      } else {        
        throw new PathError(path, `${navigateTo} is not a directory.`)
      }
    }

    return path
      .split('/')
      .reduce(navigate, this.header)
  }

  /**
   * Open a file in the archive
   * @param {ArchivePath} path The path to the file
   * @returns {ArrayBuffer} The file's contents
   */
  get(path) {
    const { offset, size } = this.find(path),
          offsetInt = parseInt(offset)

    return this.buffer.slice(offsetInt, offsetInt + size)
  }
}

class PathError extends Error {
  constructor(path, message) {
    super(`Invalid path "${path}": ${message}`)

    this.name = "PathError"
  }
}

export default Asar