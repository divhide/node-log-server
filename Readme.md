
# Log server

A simple log server that receive text and dumps it into a file. Every log file will have a daily
representation, meaning that you can easily delete old logs.

Be aware that there's no maximum size on the logs being stored!

Also it provides you a web interface to access the logs directory.

```sh

# log-server will store the current logs on the current folder by default
log-server -p 8000

# set log-server to store the logs on './logs/' folder
log-server -p 8000 -d ./logs/


```

## Use cases

* General remote log submission without the need for a complex log system
* Submit Mobile application logs by username, device, ...


## Example: Log some data

By running the following line you're dumping file.txt into the a log named 'LOGNAME.log'. You can submit
different logs to different files by changing the url.


```

curl -X POST --data-binary @file.txt http://localhost:8000/LOGNAME/log --header "Content-Type:text/plain"

```


## Authors

**Oscar Brito**

+ [github/aetheon](https://github.com/aetheon)
+ [twitter/aetheon](http://twitter.com/aetheon)

## License
Copyright (c) 2014 Oscar Brito, contributors.
Released under the  license
