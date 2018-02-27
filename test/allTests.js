/* Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

	Brace Document link resides under the MIT licensed.

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

  Brace Document Navlink is module to automatically add markdown page navigation links.

  this file is a part of Brace Document link  

 Author: Robert Steckroth, Bust0ut, <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	maybe = require("brace_maybe"),
	utils = require("bracket_utils")

var cache = utils.cacheManager(require)
module.paths.unshift(path.join(__dirname, "..", ".."))
var it_will = global

describe("using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("checking for dependencies..", function() { 

		it("requirejs in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true}catch(e) {return e}})(), "unable to find the requirejs module").to.be.true
			it_will.stop = false 
			done()
		})

		it("brace_document in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("brace_document"); return true}catch(e) {return e}})(), "unable to find the brace_document module").to.be.true
			it_will.stop = false 
			done()
		})

	})

	describe("the script functions appropriately when", function() {

		var requirejs, parser
		beforeEach(function(done) {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			requirejs(["brace_document"], function(doc) { 
				parser = doc 
				done()
			})
		})
		afterEach(cache.dump.bind(cache))

		it("no option data is provided to it", function(done) {
			requirejs(["./brace_document_link"], function(link) { 

				parser({}, function() {
					var l = link(this)
					l.runThrough(null, null, () => {
						done()
					}, (msg) => {
						expect(msg.toString()).to.include("The brace_document_link plugin did not receive a")
					})
				}, function(error) { expect(false, error).to.be.true; done() })
			}, function(error) { expect(false, error).to.be.true; done() })
		})

		it.skip("when relative paths are passed in to it", function(done) {
			requirejs(["./brace_document_link"], function(link) { 

				var l = link({linkDest: "docs", linkPath: "placeHolder"})
				l.runThrough(null, null, () => {
					done()
				}, (msg) => {
					expect(msg.toString()).to.include("The brace_document_link plugin did not receive a")
				})

			}, function(error) { expect(false, error).to.be.true; done() })
		})
	})
})

