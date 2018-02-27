

---
### Document pages
* [Contributer code of conduct](https://github.com/restarian/brace_document_link/blob/master/docs/contributer_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_link/blob/master/docs/guidelines_for_contributing.md)
* [License information](https://github.com/restarian/brace_document_link/blob/master/docs/license_information.md)
* [Synopsis](https://github.com/restarian/brace_document_link/blob/master/docs/synopsis.md)
* Specification
  * **Package specification**
  * [Unit test output](https://github.com/restarian/brace_document_link/blob/master/docs/specification/unit_test_output.md)

---
###  A plugin for Brace document which creates a hard link path relative to the project root.

**Version**: 0.0.3

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [amdefine](https://npmjs.org/package/amdefine) [bracket_print](https://npmjs.org/package/bracket_print)

**Development dependencies**: [brace_document](https://npmjs.org/package/brace_document) [brace_maybe](https://npmjs.org/package/brace_maybe) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | mocha |
 | make_docs | brace_document -i docs_raw -b docs -e --link-dest README.md --link-path docs/synopsis.md --force-title --title 'Brace document navlink' --specification-path package_meta_data.md --sort alphanumeric |

**Technologies used in development**:
  * [VIM](https://vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Ubuntu on Windows](https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6) As the development operating environment
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage