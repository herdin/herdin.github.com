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

/* pure table usage
<div id="pureTableHere"></div>
<script>
require(['util'], (util) => {
 util.genPureTable(
   'pureTableHere',
   ['Provider', 'Type', 'Configuration Type'],
   [
     ['Kubernetes','Orchestrator','Custom Resource'],
     ['Consul Catalog	Orchestrator','Label'],
     ['Marathon','Orchestrator','Label'],
     ['Rancher','Orchestrator','Label'],
     ['File','Manual','TOML/YAML format'],
   ]
 );
});
</script>
*/
      genPureTable : (table_location_indicator_id, table_headers, table_datas) => {
        const prefix_TABLE = '<table class="pure-table">';
      	const suffix_TABLE = '</table>';
      	const prefix_THEAD = '<thead>';
      	const suffix_THEAD = '</thead>';
      	const prefix_TBODY = '<tbody>';
      	const suffix_TBODY = '</tbody>';
      	const prefix_TR = '<tr>';
      	const suffix_TR = '</tr>';
      	const prefix_TD = '<td>';
      	const suffix_TD = '</td>';
      	let tableTags = '';

      	tableTags += prefix_TABLE;
      	tableTags += prefix_THEAD;
      	tableTags += prefix_TR;
      	for(let colindex in table_headers) {
          tableTags += prefix_TD + table_headers[colindex] + suffix_TD;
      	}
      	tableTags += suffix_TR;
      	tableTags += suffix_THEAD;

      	tableTags += prefix_TBODY;
      	for(let rowindex in table_datas) {
      		tableTags += prefix_TR;
      	  for(let colindex in table_datas[rowindex]) {
      		tableTags += prefix_TD + table_datas[rowindex][colindex] + suffix_TD;
      	  }
      	  tableTags += suffix_TR;
      	}
      	tableTags += suffix_TBODY;
      	tableTags += suffix_TABLE;

      	$('#' + table_location_indicator_id).after(tableTags);

      },
    };
});
