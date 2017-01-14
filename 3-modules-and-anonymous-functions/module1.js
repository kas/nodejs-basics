function myFunction() {
  console.log('myFunction!!!');
}

var myString = 'String!';

// each file has its own 'modules' object
module.exports.myFunction = myFunction;
module.exports.myString = myString;
