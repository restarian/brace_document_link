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
			expect((function() {try { require("requirejs"); return true }catch(e) { return !!console.log(e) }})(), "unable to find the requirejs module").to.be.true
			it_will.stop = false 
			done()
		})
		it("the brace_document module is install on the system", function(done) {
			it_will.stop = true 
			expect((function() {try { require("brace_document"); return true }catch(e) { return !!console.log(e) }})(), "unable to find the brace_document module").to.be.true
			it_will.stop = false 
			done()
		})

	})

	describe("the script functions appropriately when", function() {

		var requirejs, parser, opt
		beforeEach(function(done) {
			parser = null
			cache.start()
			opt = { 
				pluginPath: path.join(__dirname, "..", ".."), 
				"link": null,
				pluginRegex: "^brace_document_link$", 
				input: path.join("test", "example") 
			}
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			done()
		})
		afterEach(cache.dump.bind(cache))

		var err_cb = function(error) { expect(false, error).to.be.true; done() }

		it("no option data is provided to it", function(done) {
			requirejs(["brace_document"], function(document_parse) { 
				parser = document_parse(opt, function() {
					expect(false, "The plugin should have errored.").to.be.true
					done()
				}, function(msg) {
					expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkPath option value.")
					expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkDest option value.")
					done()
				})
			}, err_cb)
		})
		it("when only one of the paths are passed in to it", function(done) {
			requirejs(["brace_document"], function(document_parse) { 
				opt.linkDest = "docs"
				parser = document_parse(opt, function() {

					expect(false, "The plugin should have errored.").to.be.true
					done()
				}, function(msg) {
					expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkPath option value.")
					done()
				})
			}, err_cb)
		})
		it("when two valid links paths are supplied the poper link is created", function(done) {
			requirejs(["brace_document"], function(document_parse) { 
				fs.unlink("test/example/another.md", function(error) {
					fs.stat("test/example/another.md", function(err) {

						expect(err, "Unable to remove link before test was administered.").to.be.not.null

						opt.linkPath = "first_page.md"
						opt.linkDest = "another.md"
						parser = document_parse(opt, function() {
							fs.stat("test/example/another.md", function(err) {

								expect(err, "The link was not created").to.be.null
								done()
							})
						}, function(error) {
							expect(false, error.toString()).to.be.true
							done()
						})
					})
				})
			}, err_cb)
		})
		it("when absolute paths are used", function(done) {
			requirejs(["brace_document"], function(document_parse) { 
				opt.linkPath = "first_page.md"
				opt.linkDest = "/nope/another.md"
				parser = document_parse(opt, function() {
					expect(false, "The plugin should have errored.").to.be.true
					done()
				}, function(msg) {
					expect(msg.toString()).to.include("The linkDest parameter")
					expect(msg.toString()).to.include("must be relative")
					done()
				})
			}, err_cb)
		})
		it("when a link is attempted to be created in a non-existant directory location", function(done) {
			requirejs(["brace_document"], function(document_parse) { 

				opt.linkPath = "first_page.md"
				opt.linkDest = "nope/another.md"
				parser = document_parse(opt, function() {
					expect(false, "Should error").to.be.true
					done()
				}, function(error) {
					done()
				})
			}, err_cb)
		})
	})
})

