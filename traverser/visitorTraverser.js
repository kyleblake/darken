const _ = require("lodash");
const astTraverse = require("ast-traverse");
const {
  RenameVisitor
} = require('../visitors/RenameVisitor');

const pluck = (...rest) => {
  if (!rest.length) { return undefined; }
  const [
    head,
    ...tail
   ] = rest;

   if (!tail.length) { return o => o[head]; }
  const recurse = pluck(...tail);
  return o => o[head] && recurse(o[head]);
};

const get = node => expression => {
  const subNodes = pluck(expression)(node);

  if (Array.isArray(subNodes)) {
    return toAggPath(node)(subNodes);
  } 

  return toPath(subNodes, node, expression);
};

const toAggPath = parent => nodeList => {
  const nodes = nodeList.map((n, i)=>toPath(n, parent, '', i));

  return {
    traverse : (...args)=>{
      return nodeList.map(traverse).map(tFn=>tFn(...args));
    },
    get: (...args)=>{
      return toAggPath(nodes.reduce((acc, node)=>{
        return [...acc, get(node)(...args)];
      }, []));
    }
  }
};

const toPath = (node, parent, prop, idx) => {
  const path = {
    node, 
    parent, 
    prop, 
    idx,
    scope: {
      rename: (id, newId, state={})=>{
        const {
          renames = []
        } = state; 
        const delta = {src:id.name, dst:newId};
        traverse(parent)(new RenameVisitor(), {renames: [...renames, delta]});
        return delta;
      }
    },
    traverse: traverse(node),
    get: get(node)
  }

  return path;
};

const traverse = ast => (visitor, state={syntax:''}) => {
  astTraverse(ast, {
    pre: (node, parent, prop, idx)=> {
      const fn = visitor[node.type] || visitor[`${node.type}Pre`];
      if (fn) {
        return fn.call(visitor, toPath(node, parent, prop, idx), state);
      } 
      // else {
      //   console.log('missing', node.type)
      // }
    },
    post: (node, parent, prop, idx)=> {
      const fn = visitor[`${node.type}Post`];
      if (fn) {
        return fn.call(visitor, toPath(node, parent, prop, idx), state);
      }
    },
    skipProperty: (prop, node)=> {
      return prop === "tokens";
    }
  });

  return Object.assign({}, state, {
    map: fn=>fn(state),
    join: ()=>state
  });
};


exports.traverse = traverse;