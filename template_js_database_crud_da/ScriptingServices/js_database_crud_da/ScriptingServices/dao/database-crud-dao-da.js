/* globals $ */
/* eslint-env node, dirigible */

var orm = {
    dbName: "${tableName}",
    properties: [
#foreach ($tableColumn in $tableColumns)
		{
			name: '$tableColumn.name.toLowerCase()',
			dbName: '$tableColumn.name.toUpperCase()',
#if ($tableColumn.key)
			id: true,
			required: true,
#end
#if ($tableColumn.type == $INTEGER)
			type: 'Int'
#elseif ($tableColumn.type == $VARCHAR)
    		type: 'String',
    		size: 255
#elseif ($tableColumn.type == $CHAR)
			type: 'String',
			size: 20
#elseif ($tableColumn.type == $BIGINT)
			type: 'Long'
#elseif ($tableColumn.type == $SMALLINT)
			type: 'Short'
#elseif ($tableColumn.type == $FLOAT)
			type: 'Float'
#elseif ($tableColumn.type == $DOUBLE)
			type: 'Double'
#elseif ($tableColumn.type == $DATE)
			type: 'Date'
#elseif ($tableColumn.type == $TIME)
			type: 'Time'
#elseif ($tableColumn.type == $TIMESTAMP)
			type: 'Timestamp'
#else
 			type: 'Unknown'
#end
		},
#end
    ]
};

exports.get = function() {
	var dao = require('daoism/dao').get(orm);
	return dao;
};

