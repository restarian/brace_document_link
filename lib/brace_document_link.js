/*  Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com> -- MIT license

Brace Document Link resides under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

  this file is a part of Brace Document Link

  Brace Document Link is plugin for Brace Document which created links to pages. 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

var path = require("path")
var fs = require("fs")

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["bracket_print"], function(print) {
	
	return function(parser, up, cb, err) {

		// The simplest way to determine if the argument is of the bracket_print type.
		if ( up && up.parent && (up instanceof up.parent) ) 
			this.up = up = up.spawn(up.log_title+" -> ") 
		else {
			if ( typeof up === "function" ) {
				err = cb 
				cb = up
			}
			this.up = up = print({level: 1, title: true, title_stamp: false})
		}
		up.log_title = up.log_title + "brace_document_link"
		var up_err = this.up_err = up.spawn({level: 2, log_title: up.log_title+" - ERROR"})	

		cb = typeof cb === "function" && cb || function(){}
		// Create the error callback which will transfer the logger from this method into the calling method error callback.
		var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) }

		parser.addPlugin(this)

		this.runThrough = function(structure, data, cb, err) {
			
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) }

			var e_msg = up_err.spawn().s(), r
			if ( !this.option.linkPath )
				e_msg.s("The brace_document_link plugin did not receive a linkPath option value.")
			else {
				r = (path.posix.parse(this.option.linkPath).root || path.win32.parse(this.option.linkPath).root).replace(/^\\\\/, "")
				if ( r )
					e_msg.s("The linkPath parameter", this.option.linkPath, "must be relative (not contain a root). Found", r, "as the root.")
			}

			if ( !this.option.linkDest )
				e_msg.s("The brace_document_link plugin did not receive a linkDest option value.")
			else {
				r = (path.posix.parse(this.option.linkDest).root || path.win32.parse(this.option.linkDest).root).replace(/^\\\\/, "")
				if ( r )
					e_msg.s("The linkDest parameter", this.option.linkDest, "must be relative (not contain a root). Found", r, "as the root.")
			}

			if ( e_msg.toString().length )
				return err_cb(e_msg.log())

			if ( parser.option.dryRun )
				return up.log_true("Skipping the un(link)ing process because --dry-run is set as an option") && cb()

			var dest = parser.makeFullPath(this.option.linkDest)
			var current = parser.makeFullPath(this.option.linkPath)

			fs.unlink(dest, function() {
				fs.link(current, dest, function(error) {

					if ( error ) return err_cb(up_err.log("The link could not be created.", error))
					cb()
				})
			})
		}
		return this
	}
})
