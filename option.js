module.exports = [
	{ 
		"usage": ` Creates a hard link given both options are provided to it. It uses the project root as a relative base directory.`
	},
	{
		"flag": "--link-path <path>", 
		"help": "The location and file name of the file to link. The directory can be absolute or else it will be relative to the project root. No action " +
"is taken if this is not supplied.",
		"default": ""
	},
	{
		"flag": "--link-dest <path>", 
		"help": "The directory and/or name of the link destination. No action is taken if this is not supplied.",
		"default": ""
	},
]

