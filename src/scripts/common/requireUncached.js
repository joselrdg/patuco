function requireUncached(_module){
  var l = module.children.length;
  for (var i = 0; i < l; i++)
  {
      if (module.children[i].id === require.resolve(_module))
      {
          module.children.splice(i, 1);
          break;
      }
  }
  delete require.cache[require.resolve(_module)];
  return require(_module)
}

// function requireUncached(module) {
//   delete require.cache[require.resolve(module)];
//   return require(module);
// }

module.exports = requireUncached;

