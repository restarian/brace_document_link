/* The Batten document specification parser generates a document with the project plugin.json file and source code meta data.
 Copyright (C) 2018 Robert Edward Steckroth II, Bust0ut <RobertSteckroth@gmail.com>, All rights reserved */

var path = require("path")
var fs = require("fs")

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["bracket_print"], function(print) {
	
	return function(parser, up, cb, err) {

		// The simplest way to determine if the argument is of the bracket_print type.
		if ( up && up.parent && (up instanceof up.parent) ) {
			this.up = up = up.spawn(up.log_title+" -> ") 
		}
		else {
			if ( typeof up === "function" ) {
				err = cb 
				cb = up
			}
			this.up = up = print({level: 1, title: true, title_stamp: false})
		}

		up.log_title = up.log_title + "brace_document_specification"
		this.up_err = up.spawn({level: 2, log_title: up.log_title+" - ERROR"})	

		cb = typeof cb === "function" && cb || function(){}
		// Create the error callback which will transfer the logger from this method into the calling method error callback.
		var err_cb = function() {
			if ( typeof err === "function" )
				err.apply(err.prototype, arguments)
		}

		// The option can be a commander instance or a object literal.
		if ( parser.option && (typeof parser.option.parse === "function") ) 
			this.option = parser.option 
		else
			this.option = parser

		this.runThrough = function(structure, data, cb, err) {
			
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			}

			if ( !this.option.linkPath || !this.option.linkDest ) {
				if ( !this.option.linkPath )
					err_cb(up_err.log("The brace_document_link plugin did not receive a linkPath option value."))
				if ( !this.option.linkDest )
					err_cb(up_err.log("The brace_document_link plugin did not receive a linkDest option value."))

				return cb(3)
			}

			// Have the directories created if necessary.
			//parser.addStructureDirectory(structure, path.dirname(this.option.linkDest))
			console.log(222, parser)

			fs.unlink(this.option.linkDest, (error) => {

				fs.link(path.join(parser.project_root, this.option.linkPath), path.join(parser.project_root, this.option.linkDest), (error) => {
					if ( error ) 
						err_cb(up_err.log("The link could not be created.", error))

					cb(18)
				})
			})

		}

		return this
	}
})
