function chenMatchesPattern(pattern, allowPartial,t) {
  if (!this.isMemberExpression()) return false;

  var parts = pattern.split(".");
  var search = [this.node];
  var i = 0;

  //name===parts[i]
  function matches(name) {
    var part = parts[i];
    return part === "*" || name === part;
  }
  while (search.length) {
    let iAdd=false
    var node = search.shift();
    if (allowPartial && i === parts.length) {
      return true;
    }
    if (t.isIdentifier(node)) {
      if (!matches(node.name)){
        return false;
      } else{
        iAdd=true
      }
    }
    else if (t.isLiteral(node)) {
      if (!matches(node.value)){
        return false;
      }
      else{
        iAdd=true
      }
    }
    else if (t.isMemberExpression(node)) {
      //是否是计算式
      if (node.computed && !t.isLiteral(node.property)) {
        return false;
      } else {
        search.unshift(node.property);
        search.unshift(node.object);
        continue;
      }
    } else if (t.isThisExpression(node)) {
      if (!matches("this")){ return false;}
      else{
        iAdd=true
      }
    } else {
      return false;
    }
    if (++i > parts.length) {
      return false;
    }
    //loop again
  }

  return i === parts.length;
}

module.exports = function ({types:t}) {
  return {
    name:'chen-babel-plugin-transform-remove-console',
    visitor: {
      CallExpression(path, {opts}) {
        const calleePath = path.get('callee')
        const excludeArray=opts.exclude
        if (opts &&  excludeArray instanceof Array) {
          const hasTarget = excludeArray.some(type => {
            return chenMatchesPattern.call(calleePath,"console." + type,false,t)
          })

          if (hasTarget) {return}
        }
        if (chenMatchesPattern.call(calleePath,"console", true,t)) {
          path.remove()
        }
      }
    }
  }
}
