# Installation
TODO

# Usage

Parse the XML files using manifestParser.  `manifestParser` takes parsed XML data and yields an object comprised of the field names, function names, and Brightscript scripts defined in the XML.
```Javascript
const data = XML.parse(String(fs.readFileSync(manifest)));
const {
  fields: publicFields,
  fns: publicFns,
  scripts
} = manifestParser(data);
```

`fields` and `fns` are the public fields and functions and will be used later when traversing the AST with the ObfuscationVisitor.

`scripts` is an array of objects which each have a `uri` property.  They will be used to generate the AST which will be run through the obfuscator.

Once you have the script URIs, the basics steps are as follows:
1. Map each script file to its contents as a String
1. Map each file's contents to a Brightscript AST (@roku-road/bright?)
1. Obfuscate each AST using `traverse`, `ObfuscationVisitor`, `fields` and `fns` from above.
1. Generate new syntax using OutputVisitor

## Map script URI to file contents
For each script, you'll have to read the file based on the `uri` property.  These path names have "no concept of a current working directory or relative paths" ([Roku File System](https://sdkdocs.roku.com/display/sdkdoc/File+System)), so you will need to replace the "device field" portion of the `uri`.
```javascript
const { uri } = script; //script object from manifestParser

// DEVICE_FIELD typically looks like "tmp:", "pkg:", "common:", or "ext1:"
// This will depend on your implementation.
const sourcePath = path.resolve(uri.replace(DEVICE_FIELD, RELATIVE_PARENT_FOLDER));
const content = String(fs.readFileSync(sourcePath));
```

## Map script contents to Brightscript AST
Provide the script content to a Brightscript AST parser ([@roku-road/bright](https://github.com/RokuRoad/bright)).
```javascript
const { ast: toBrightAST } = require('@roku-road/bright');

const ast = toBrightAST(content);
```

## Obfuscate AST using traverse + ObfuscationVisitor
Provide the AST and a new `ObfuscationVisitor` to `traverse` to yield an obfuscated AST. You will also need to provide an object with a "renamed" property along with a new ObfuscationVisitor.  The "renamed" property should contain an array of objects with the following shape: `{src: String, dst: String}`.  The `ObfuscationVisitor` uses this array to help determine if an identifier can be safely renamed during obfuscation.  If `dst` does not exist or if it does and **does not** equal the name of the current identifier being visited, it will be renamed. `publicFields` and `publicFns` pulled out of the `manifestParser` should be included in the `renamed` array so they can be publicly accessed after obfuscation.
```javascript
// setting src and dst to the same value prevents them from being renamed during obfuscation.
const renamed = [...publicFields, publicFns].map( ({id}) => ({src: id, dst: id}));
const { ast: obfuscatedAST } = traverse(ast)(new ObfuscationVisitor, {renamed});
```

## Generate obfuscated syntax using traverse + OutputVisitor
Provide the AST and a new `OutputVisitor` to `traverse` to generate Brightscript syntax from the AST.
```javascript
const { syntax } = traverse(obfuscatedAST)(new OutputVisitor);
```

`syntax` will be a String representation of the obfuscated Brighscript code and can be written out the file system at this point.


## Full Example
```javascript
  const { ast: toBrightAST } = require('@roku-road/bright');

  // Map functions
  const toContents = script => {
    const { uri } = script; //script object from manifestParser

    // DEVICE_FIELD typically looks like "tmp:", "pkg:", "common:", or "ext1:"
    // This will depend on your implementation.
    const sourcePath = path.resolve(uri.replace(DEVICE_FIELD, RELATIVE_PARENT_FOLDER));
    const contents = String(fs.readFileSync(sourcePath));
    return contents;
  };

  const toAST = content => {
    const ast = toBrightAST(content);
    return ast;
  };

  const toObfuscation = (publicFields, publicFns) => ast => {
    // To preserve the names of public API.
    const renamed = [...publicFields, publicFns].map( ({id}) => ({src: id, dst: id}));
    const { ast: obfuscatedAST } = traverse(ast)(new ObfuscationnVisitor, {renamed});
    return obfuscatedAST;
  };

  const toSyntax = ast => {
    const { syntax } = traverse(ast)(new OutputVisitor);
    return syntax;
  };

  // Parse XML files
  const data = XML.parse(String(fs.readFileSync(/*PATH_TO_MANIFEST_FILE*/)));
  const {
    fields: publicFields,
    fns: publicFns,
    scripts
  } = manifestParser(data);

  const obfuscatedScripts = scripts
    .map(toContents)
    .map(toAST)
    .map(toObfuscation(publicFields, publicFns))
    .map(toSyntax);
```
