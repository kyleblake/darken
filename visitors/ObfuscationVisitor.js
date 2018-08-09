const {
  RenameVisitor
} = require('./RenameVisitor');

const {
  OutputVisitor
} = require('./OutputVisitor');

const replaceNode = parent => originalNode => newNode => {
  for (let prop in parent) {
    if (parent[prop] === originalNode) {
      parent[prop] = newNode;
      break;
    } else if (Array.isArray(parent[prop])) {
      for (let index in parent[prop]) {
        if (parent[prop][index] === originalNode) {
          parent[prop][index] = newNode;
          break
        }
      }
    }
  }
};

const shouldRename = (renamed, {name}) => {
  const {dst} = renamed.find(({src})=>src===name) || {};
  return !(dst && dst === name);
};

const viableLetters = ['I','1', '_', 'O', '0'];
const toRandomString = length => {
  return Array.from({length}).map(()=>{
    return viableLetters[Math.floor((Math.random() * viableLetters.length))];
  }).join('');
};

const toNewName = renamed => {
  const name = `_${toRandomString(12)}`

  return renamed.find(({dst})=>dst===name) 
              ? toNewName(renamed)
              : name;                
};

const renameDeclaration = ({node: {id, type}, scope:{rename}}, {renamed})=>{
  if (shouldRename(renamed, id)) {
    const newRename = rename(id, `${toNewName(renamed)}`); //rename(id, `${id.name}2`);//
    renamed.push(newRename);
  }
};

const renameLiteral = ({node: {value}, scope: {rename}}, {renamed}) => {
  const name = value.replace(/\"/g, '');
  if (shouldRename(renamed, {name})) {
    const newRename = rename({name}, `${toNewName(renamed)}`);
    renamed.push(newRename);
  }
};

const toBooleanAssignmentExpression = value => {
  return {
    "expression": {
      "left": {
        "type": "Literal",
        "raw": "1",
        "value": "1"
      },
      "operator": {
        "type": "EQUAL"
      },
      "right": {
        "type": "Literal",
        "raw": value=='true'?'1':'2',
        "value": value=='true'?'1':'2'
      },
      "type": "LogicExpression"
    },
    "type": "ParenthesisExpression"
  };
};

const toCallCharExpression = code => {
  return {
    "args": {
      "type": "Arguments",
      "param": {
        "type": "Literal",
        "raw": `${code}`,
        "value": `${code}`
      }
    },
    "callee": {
      "asType": "",
      "type": "Identifier",
      "name": "Chr"
    },
    "type": "CallExpression"
  };
}

const toCharReplacement = value => {
  const withoutQuotes = value.replace(/"/g, '');
  if (withoutQuotes.length == 0) return toCallCharExpression(0);
  const [left, ...rights] = [...withoutQuotes].map(c=>{
    const code = Math.random()>.5 
                      ? `&H${c.charCodeAt(0).toString(16)}`
                      : c.charCodeAt(0);

    return toCallCharExpression(code);
  });

  const operators = rights.map(()=>{
    return {
      "type": "OP_PLUS"
    }
  });

  return {
    "expression": {
      "type": "AdditionExpression",
      "operator": operators,
      "left": left,
      "right": rights
    },
    "type": "ParenthesisExpression"
  };
}

const toNewLiteral = value => {
  if (value === "true" || value === "false") return toBooleanAssignmentExpression(value);
  if (value.includes('"')) return toCharReplacement(value);
  return value;
};

const outputVisitor = new OutputVisitor()
class ObfuscationVisitor {
  constructor() {
  }
  AdditionExpression(path, state) {
  }
  Arguments(path, state) {
  }
  ArrayElement(path, state) {
  }
  ArrayExpression(path, state) {
  }
  AssignmentExpression({get}, state) {
    const {
      syntax: leftSyntax = ''
    } = get('left').traverse(outputVisitor) || {};

    if (leftSyntax.match(/functionName/i)) {
      get('right').traverse({
        Literal: (p, s) => {
          renameLiteral(p, state);
        }
      })
      return false;
    }
  }
  BlockStatement(path, state) {
  }
  CallExpression({get}, state) {
    const {
      syntax
    } = get('callee').traverse(outputVisitor) || {};

    if (syntax.match(/observeField/i)) {
      get('args').traverse({
        Literal: (p, s) => {
          const { idx } = p;
          if ( idx ) renameLiteral(p, state);
        }
      })
    }
  }
  Comment(path, state) {
    // path.traverse({
    //   PERIOD: (path, state) => {
    //     debugger;
    //   }
    // })
    return false;
  }
  DotMemberExpression(path, state) {
  }
  ElseStatement(path, state) {
  }
  ElseIfStatement(path, state) {
  }
  EmptyStatement(path, state) {
  }
  FunctionDeclaration(path, state) {
    const {node} = path;
    node.ReturnType = undefined;
    renameDeclaration(path, state);
  }
  FunctionExpression(path, {renamed}) {
  }
  Identifier(path, state) {
  }
  IfStatement(path, state) {
  }
  Literal(path, state) {
    const {node, parent} = path;
    //if (node.value == '"left"') debugger;
    const newNode = toNewLiteral(node.value);
    if (node.value != newNode) {
      replaceNode(parent)(node)(newNode);
    }
    return false;
  }
  LogicExpression(path, state) {
  }
  MemberExpression(path, state) {
  }
  ObjectExpression(path, state) {
  }
  Parameter(path, state) {
    const {node} = path;
    node.TypeAnnotation = undefined;
  }
  ParameterList(path, state) {
    const {get, node:{args}, scope:{rename}} = path;
    const locallyRenamed = [];
    const gArgs = get('args').traverse({
      Parameter: ({node: {name}}, state) => {
        const newRename = rename(name, `${toNewName(locallyRenamed)}`);
        locallyRenamed.push(newRename);
      }
    });
  }
  ParenthesisExpression(path, state) {
  }
  PrintStatement(path, state) {
  }
  Program(path, state) {
  }
  Property(path, state) {
  }
  RelationExpression(path, state) {
  }
  ReturnStatement(path, state) {
  }
  SubDeclaration(path, state) {
    renameDeclaration(path, state);
  }
  SubDeclarationPost(path, state) {
  }
  TypeAnnotation(path, state) {
  }
  UnaryExpression(path, state) {
  }
  UnTypedIdentifier(path, state) {
  }
}
exports.ObfuscationVisitor = ObfuscationVisitor;