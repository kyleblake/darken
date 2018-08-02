const _ = require('lodash');

const toArray = o => Array.isArray(o) ? o : [o];
const manifestParser = ({interface:{field=[], function:fn=[]}, script=[]})=>{
  const fields = toArray(field).map(fo=>{
    const {id='', type=''} = fo;
    return {id, type};
  });

  const fns = toArray(fn).map(fn=>{
    const {name=''} = fn;
    return {id: name, type: 'function'};
  });

  const scripts = toArray(script).map(block=>{
    const {type='', uri=''} = block;

    return {type, uri};
  })
  .filter(({type})=>type==='text/brightscript');

  return {
    fields,
    fns,
    scripts
  };
};

exports.manifestParser = manifestParser;