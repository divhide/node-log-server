
# Log server

A simple server that received text and dumps that into a file. Also you can view the available
logs from the server.

## Example

log-server -p 8000 -d ./

curl -X POST --data-binary @file.txt http://localhost:8000/log --header "Content-Type:text/plain"


## Authors

**Oscar Brito**

+ [github/aetheon](https://github.com/aetheon)
+ [twitter/aetheon](http://twitter.com/aetheon)

## License
Copyright (c) 2014 Oscar Brito, contributors.
Released under the  license
