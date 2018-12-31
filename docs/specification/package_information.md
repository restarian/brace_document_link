 
 
**Version**: 0.0.4

**Description**: A plugin for Brace document which creates a hard link relative to the project root.

**Author**: [Robert Steckroth](mailto:RobertSteckroth@gmail.com)

**Dependencies**: [amdefine](https://npmjs.org/package/amdefine) [bracket_print](https://npmjs.org/package/bracket_print)

**Development dependencies**: [requirejs](https://npmjs.org/package/requirejs) [brace_maybe](https://npmjs.org/package/brace_maybe) [bracket_utils](https://npmjs.org/package/bracket_utils) [chai](https://npmjs.org/package/chai) [mocha](https://npmjs.org/package/mocha)

**Optional Dependencies**: [@restarian/batten_document_mocha](https://npmjs.org/package/@restarian/batten_document_mocha) [@restarian/batten_document_specification](https://npmjs.org/package/@restarian/batten_document_specification) [brace_document](https://npmjs.org/package/brace_document) [brace_document_navlink](https://npmjs.org/package/brace_document_navlink)

**Package scripts**:

| Name | Action |
| ---- | ------ |
 | test | ```mocha``` |
 | make_docs | ```brace_document -i docs --link-dest README.md --link-path docs/synopsis.md --force-title --title "Brace document link pages" --sort depth``` |
 | make_docs_extra | ```npm run make_docs -- --specification --mocha``` |

**Technologies used in development**:
  * [VIM](https://vim.org) As an IDE
  * [Windows 10](https://www.microsoft.com/en-us/software-download/windows10) For unit testing and as the base operating system
  * [Git](https://git-scm.com) For repository management
  * [Github](https://github.com) For repository storage
  * [NPM](https://npmjs.org) For module storage