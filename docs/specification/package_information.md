
---
### Brace Document Link pages
* [Synopsis](https://github.com/restarian/brace_document_link/blob/master/docs/synopsis.md)
* Specification
  * [License information](https://github.com/restarian/brace_document_link/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_document_link/blob/master/docs/specification/package_information.md)
  * **Package information**
  * [Unit test output](https://github.com/restarian/brace_document_link/blob/master/docs/specification/unit_test_output.md)
  * [Unit test output](https://github.com/restarian/brace_document_link/blob/master/docs/specification/unit_test_output.md)
 
 
**Version**: 0.1.1

**Description**: A plugin for Brace document which creates a hard link relative to the project root.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [amdefine](https://npmjs.org/package/amdefine) [bracket_print](https://npmjs.org/package/bracket_print)

**Development dependencies**: [requirejs](https://npmjs.org/package/requirejs) [brace_maybe](https://npmjs.org/package/brace_maybe) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha) [brace_document](https://npmjs.org/package/brace_document)

**Optional Dependencies**: [batten_document_specification](https://npmjs.org/package/batten_document_specification) [batten_document_mocha](https://npmjs.org/package/batten_document_mocha) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink) [brace_document_link](https://npmjs.org/package/brace_document_link)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document --link --link-dest README.md --link-path docs/synopsis.md --navlink -i docs -r --force-title --title "Brace Document Link pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs --silent -- --specification --mocha``` |

**Technologies used in development**:
  * [VIM](https://vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage