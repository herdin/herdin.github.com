// define((require) => {
//   let $ = require('jquery');
//
//   return {
//     genID : () => 'generatedID-' + Math.floor(Math.random()*100000),
//     genTable : (tableHeaders, tableDatas) => {
//
//     },
//   };
// });

define(['jquery'], ($) => {
    return {
      genID : () => 'generatedID-' + Math.floor(Math.random()*100000),
      genTable : (tableHeaders, tableDatas) => {
        console.log('loaded jquery version -> ' +$.fn.jquery);
      },
    };
});
