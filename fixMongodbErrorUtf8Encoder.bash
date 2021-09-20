#!/bin/bash
# Fix error when trying to put a mongodb api online through nodejs
# Error returned: const utf8Encoder = new TextEncoder();

# To fix:
# 1. Put this file in the project root folder, next to teh node_modules folder;
# 2. Run the file through the terminal;
# 3. After running the file, you can delete it.

correction="
const util = require('util');\r
const utf8Encoder = new util.TextEncoder();\r
const utf8Decoder = new util.TextDecoder('utf-8', { ignoreBOM: true });\r
\r
function utf8Encode(string) {\r
return utf8Encoder.encode(string);\r
}\r
\r
function utf8DecodeWithoutBOM(bytes) {\r
return utf8Decoder.decode(bytes);\r
}\r
\r
module.exports = {
  utf8Encode,\r
  utf8DecodeWithoutBOM,\r
};
"

echo -e $correction > node_modules/whatwg-url/dist/encoding.js;
