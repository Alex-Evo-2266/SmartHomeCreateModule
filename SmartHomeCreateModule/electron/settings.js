console.log(process.platform)

let TEMPLATES_PATH = "/"

if(process.platform === "linux")
    TEMPLATES_PATH = "/usr/share/SHCreateModule/templates"

module.exports.TEMPLATES_PATH = TEMPLATES_PATH