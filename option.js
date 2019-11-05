module.exports = [
	{
		"usage": ` Creates a link given that both options are provided to it. It uses the input (or backup if specified) directory as a relative
base directory for both of the paths given.`
	},
	{
		"flag": "--link-path <path>",
		"help": "The location and file name of the file to link. The location must be a relative path to the input (or backup) directory. No action " +
					"is taken if this is not supplied.",
		"default": ""
	},
	{
		"flag": "--link-dest <path>",
		"help": "The location and file name of the file link destination. The location must be a relative path to the input (or backup) directory. No action " +
						"is taken if this is not supplied.",
		"default": ""
	},
]
