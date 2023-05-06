const getResponseModel = (name) => `response_model=Table${name}Scheme`

module.exports.parseReplaceableElementsOptions = function(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "route_option")
	{
		let options = ""
		if(api.use === "TABLE" && api.useDitail)
		{
			options = options + ", " + getResponseModel(api.useDitail.title)
		}
		return options
	}
	return undefined
}

module.exports.parseReplaceableInputData = function(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "input_data")
	{
		console.log(api, "p0")
		let options = ""
		if(api.use === "TABLE_BUTTON" && api.useDitail?.value === "$index")
		{
			options = options + "index:int, "
		}
		return options
	}
	return undefined
}

module.exports.parseReplaceableElementsModule = function(replaceableElements, module) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "module" && splitElement[1] === "name")
		return (module.name)
	return undefined
}

module.exports.parseReplaceableElementsAPI = function(replaceableElements, api) {
	const replaceableElements2 = replaceableElements.slice(0, replaceableElements.length - 2)
	const splitElement = replaceableElements2.split(".")
	if(splitElement[0] === "api" && splitElement[1] === "name")
		return (api.name)
	if(splitElement[0] === "api" && splitElement[1] === "url")
		return (api.url)
	if(splitElement[0] === "api" && splitElement[1] === "type")
	{
		if (api.type === "POST")
			return "post"
		else
			return "get"
	}
	return undefined
}

module.exports.replaceTemplates = function(content, callback) {
	let splitContent = content.split("%{")
	for(let i = 0; i < splitContent.length; i++)
	{
		if(splitContent[i].search("}%") < 0)
			continue
		const replaceableElements = splitContent[i].substring(0, splitContent[i].search("}%") + 2)
		if(typeof(callback) === "function")
		{
			let res = callback(replaceableElements)
			if(res === undefined)
				continue
			splitContent[i] = splitContent[i].replace(replaceableElements, res)
		}
	}
	return splitContent.join("")
}