# asar-peeker
A lightweight, browser-friendly library for reading Asar files.

## Overview
asar-lite is split among two diffent utilities.
### [openAsar.js](dist/openAsar.js) `~.3kb`
Exposes the [openAsar](#openAsar) function which simply breaks up the archive into it's header and file contents. Great for lazy people who want granular control.
### [Asar.js](dist/asar.js) `~1kb`
This provides the [Asar](#Asar) class which acts as a basic interface to retrieve files from the archive, easily extensible!

## Documentation
<!---jsdoc start-->
### Classes

<dl>
<dt><a href="#Asar">Asar</a></dt>
<dd><p>An Asar archive</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#openAsar">openAsar(archive)</a> ⇒ <code><a href="#ArchiveData">ArchiveData</a></code></dt>
<dd></dd>
</dl>

### Typedefs

<dl>
<dt><a href="#ArchivePath">ArchivePath</a> : <code>String</code></dt>
<dd><p>These paths must be absolute and posix-style, without a leading forward slash.</p>
</dd>
<dt><a href="#ArchiveData">ArchiveData</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Asar"></a>

### Asar
An Asar archive

**Kind**: global class  

* [Asar](#Asar)
    * [new Asar(archive)](#new_Asar_new)
    * [.find(path)](#Asar+find) ⇒ <code>Object</code>
    * [.get(path)](#Asar+get) ⇒ <code>ArrayBuffer</code>

<a name="new_Asar_new"></a>

#### new Asar(archive)

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>ArrayBuffer</code> | The archive to open |

<a name="Asar+find"></a>

#### asar.find(path) ⇒ <code>Object</code>
Retrieves information on a directory or file from the archive's header

**Kind**: instance method of [<code>Asar</code>](#Asar)  

| Param | Type | Description |
| --- | --- | --- |
| path | [<code>ArchivePath</code>](#ArchivePath) | The path to the dirent |

<a name="Asar+get"></a>

#### asar.get(path) ⇒ <code>ArrayBuffer</code>
Open a file in the archive

**Kind**: instance method of [<code>Asar</code>](#Asar)  
**Returns**: <code>ArrayBuffer</code> - The file's contents  

| Param | Type | Description |
| --- | --- | --- |
| path | [<code>ArchivePath</code>](#ArchivePath) | The path to the file |

<a name="openAsar"></a>

### openAsar(archive) ⇒ [<code>ArchiveData</code>](#ArchiveData)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>ArrayBuffer</code> | Asar archive to open |

<a name="ArchivePath"></a>

### ArchivePath : <code>String</code>
These paths must be absolute and posix-style, without a leading forward slash.

**Kind**: global typedef  
<a name="ArchiveData"></a>

### ArchiveData : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| header | <code>Object</code> | The asar file's manifest, containing the pointers to each index's files in the buffer |
| buffer | <code>ArrayBuffer</code> | The contents of the archive, concatenated together. |

<!---jsdoc end-->