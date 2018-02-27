/* Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

	 Brace document link resides under the MIT licensed.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

   Brace document link is a plugin for the Brace document platform which creates hard linked paths.

	this file is a part of Brace document link

  Author: Robert Steckroth, BustOut, <RobertSteckroth@gmail.com> */

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

			if ( this.option.dryRun )
				return cb(18)

			// Have the directories created if necessary.
			parser.addStructureDirectory(structure, path.dirname(this.option.linkDest))

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
