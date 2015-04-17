portbridge.js
-------------

Portbridge is a simple node.js program that listens to one or more local tcp ports and forwards connections to remote hosts.

Use it like so:

    $ (sudo) node portbridge /path/to/portbridge.conf
    
The configuration file format is line-oriented and simple:

    2210  192.168.150.10  22
    2220  192.168.150.20  22
    
This will have Portbridge listen to 2210 and 2220, forwarding tcp traffic to 192.168.150.10:22 and 192.168.150.20:22 respectively.

Comments are allowed and any text after the target's port number is ignored:

    # ssh
    2210   192.168.150.10  22   web server ssh
    2220   192.168.150.20  22   db server ssh
    
    # web
    80     192.168.150.10  80   web server http
    443    192.168.150.10  443  web server https