const { TEMPLATES_PATH } = require("../../settings")
const fs = require('fs')

const SCHEME_HEADER = "\
from pydantic import BaseModel \n\
from typing import Optional, List, Dict\n\n\
"
const getTableItemScheme = (name) => `\
\nclass Table${name}ItemScheme(BaseModel):\n\
`

const getTableScheme = (name) => `\
\nclass Table${name}Scheme(BaseModel):\n\
\titems:List[Table${name}ItemScheme]\n\
`


module.exports.generateSchemeTable = (apiTableDitail) => {
	let SchemeFile = SCHEME_HEADER
	SchemeFile = SchemeFile + getItemTableScheme(apiTableDitail)
	SchemeFile = SchemeFile + getTableScheme(apiTableDitail.title ?? "noname")
	return SchemeFile
}


function getItemTableScheme(apiTableDitail) {
	const cols = apiTableDitail.cols
	if(!cols || !Array.isArray(cols) || !cols[0].title)
		return undefined
	let Scheme = getTableItemScheme(apiTableDitail.title ?? "noname")
	console.log(cols)
	for(let col of cols){
		let field = "\t" + col.name + ": "
		if(col.type === "btn")
			continue
		else if(col.type === "icon")
			field = field + "str\n"
		else if(col.type === "btn-icon")
			continue
		else
			field = field + "str\n"
		Scheme = Scheme + field
	}
	return Scheme
}