const { generateSchemeTable } = require("./generateSchemeTable")

module.exports.generateSchemeTable = generateSchemeTable

module.exports.generateSchemes = (apis) => {
    let files_content = []
    for(let api of apis)
    {
        if (api.use === "TABLE" && api.useDitail)
        {
            files_content.push([generateSchemeTable(api.useDitail), `Table${api.useDitail.title}Scheme`]) 
        }
    }
    return files_content
}