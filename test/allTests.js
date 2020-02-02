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
module.paths.unshift(path.join(__dirname, "..", "node_modules"))
var it_will = global

describe("using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("checking for dependencies..", function() { 

		cache.start()

		var base_path = path.join(__dirname, "..", "node_modules", "brace_document")
		var package = require(path.join(base_path, "package.json"))
		var source_path = path.join(base_path, package.main)

		it("the brace_document module is install on the system", function(done) {
			it_will.stop = true 
			expect((function() { try { require("brace_document"); return true }catch(e){ return e} })(), "brace_document was not found on system").to.be.true
			expect(fs.existsSync(source_path), "could not find the  brace_document source program").to.be.true
			expect(source_path, "the expected path of the brace_document source is not a dependency of the project.").to.equal(require.resolve("brace_document"))
			it_will.stop = false 
			done()
		})

		cache.dump()
	})

	describe("the script functions appropriately when", function() {

		var parser, opt, document_parse
		beforeEach(function(done) {
			parser = null
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
			document_parse = requirejs("brace_document")
			opt = { 
				pluginPath: path.join(__dirname, "..", "node_modules"), 
				link: null,
				pluginRegex: "^brace_document_link$", 
				input: path.join("test", "example") 
			}
			done()
		})
		afterEach(cache.dump.bind(cache))

		var err_cb = function(error) { expect(false, error).to.be.true; done() }

		it("no option data is provided to it", function(done) {
			parser = document_parse(opt, function(msg) {
			}, function(msg) {
				expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkPath option value.")
				expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkDest option value.")
				done()
			})
		})
		it("when only one of the paths are passed in to it", function(done) {
			opt.linkDest = "docs"
			parser = document_parse(opt, function() {
			}, function(msg) {
				expect(msg.toString()).to.include("The brace_document_link plugin did not receive a linkPath option value.")
				done()
			})
		})
		it("when two valid links paths are supplied the proper link is created using a backup directory", function(done) {

			fs.unlink("test/example/docs_another/the_link.md", function(error) {
				fs.stat("test/example/docs_another/the_link.md", function(err) {

					expect(err, "Unable to remove link before test was administered.").to.not.be.null

					opt.linkPath = "first_page.md"
					opt.linkDest = "docs_another/the_link.md"
					opt.backup = path.join(opt.input, "docs_another")
					parser = document_parse(opt, function() {
						fs.stat("test/example/docs_another/the_link.md", function(err) {
							expect(err, "A link was not created.").to.be.null
							done()
						})
					}, err_cb) 
				})
			})
		})
		it("when two valid links paths are supplied the proper link is created", function(done) {

			fs.unlink("test/example/another.md", function(error) {
				fs.stat("test/example/another.md", function(err) {

					expect(err, "Unable to remove link before test was administered.").to.be.not.null

					opt.linkPath = "first_page.md"
					opt.linkDest = "another.md"
					parser = document_parse(opt, function() {
						fs.stat("test/example/another.md", function(err) {

							expect(err, "The link was not created.").to.be.null
							done()
						})
					}, err_cb) 
				})
			})
		})
		it("when absolute paths are used", function(done) {

			opt.linkPath = "first_page.md"
			opt.linkDest = "/nope/another.md"
			parser = document_parse(opt, function() {
			}, function(msg) {
				expect(msg.toString()).to.include("The linkDest parameter")
				expect(msg.toString()).to.include("must be relative")
				done()
			})
		})
		it("when a link is attempted to be created in a non-existant directory location", function(done) {

			opt.linkPath = "first_page.md"
			opt.linkDest = "nope/another.md"
			parser = document_parse(opt, function() {
			}, function(msg) {
				expect(msg.toString()).to.include("The link could not be created")
				expect(msg.toString()).to.include("no such file or directory")
				done()
			})
		})
	})
})

