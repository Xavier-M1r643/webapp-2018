// MODULE OUTILS

function hello() {
  console.log('Bonjour JS Module');
}

function quoiDe9() {
  console.log('Quoi de neuf...');
}

const inc = (x) => x + 3;

function isCanvas() {
  var element = document.createElement('canvas');
  return !!(element.getContext && element.getContext('2d'));
}

//function capLettre(str) {
//  // return str.replace(/(^|\s)[a-z]/g, function (x) { return x.toUpperCase(); });
//  // return str.replace(/(^|\s)[a-z]/g, x => x.toUpperCase());
//  return str.replace(/^[a-z]/, x => x.toUpperCase());
//}

const capLettre = (str) => str.replace(/^[a-z]/, x => x.toUpperCase());



export {hello, quoiDe9, inc, isCanvas, capLettre};







