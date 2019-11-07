# Brace Document Link
## Synopsis

[![Build status](https://ci.appveyor.com/api/projects/status/316uk12umdp68sd2?svg=true)](https://ci.appveyor.com/project/restarian/brace-document-link) [![Downloads](https://img.shields.io/npm/dm/brace_document_link.svg?svg=true)](https://npmjs.org/package/brace_document_link)

| **The [Brace Suite]** | **[Ubuntu on Windows]**   |
|:---------------------:|:-------------------------:|
| ![Brace logo]         | ![Ubuntu on Windows logo] |         |

[Brace Suite]: https://github.com/restarian/restarian/tree/master/brace/
[Ubuntu on Windows]: https://www.microsoft.com/en-us/store/p/ubuntu/9nblggh4msv6?activetab=pivot%3aoverviewtab

[Ubuntu on Windows logo]: https://raw.githubusercontent.com/restarian/restarian/master/doc/image/ubuntu_windows_logo.png
[Brace logo]: https://raw.githubusercontent.com/restarian/restarian/master/brace/doc/image/brace_logo_small.png
---
### Brace Document Link help pages
* [Contributor code of conduct](https://github.com/restarian/brace_document_link/blob/master/docs/contributor_code_of_conduct.md)
* [Guidelines for contributing](https://github.com/restarian/brace_document_link/blob/master/docs/guidelines_for_contributing.md)
* **Synopsis**
* Specification
  * [License information](https://github.com/restarian/brace_document_link/blob/master/docs/specification/license_information.md)
  * [Package information](https://github.com/restarian/brace_document_link/blob/master/docs/specification/package_information.md)
  * [Unit test output](https://github.com/restarian/brace_document_link/blob/master/docs/specification/unit_test_output.md)

---

### Bonuses:
  * Cross-platform design enables using win32 or unix syntax.
  * Unit testing which run remotely on Linux and Windows.
  * Open-sourced under a liberal licensed (MIT)

### What is it
##### A simple plugin for [Brace Document](https://npmjs.org/packages/brace_document) which creates a hard link to another location.

#### How to use the plugin
##### The current and destination paths are relative to the input (or backup) path used. The plugin tense is set to run after all the other plugins and data is written out so that links can be made from documentation points.
