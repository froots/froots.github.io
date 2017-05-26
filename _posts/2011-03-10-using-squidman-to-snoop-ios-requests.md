---
layout:     post
title:      Using SquidMan to snoop iOS HTTP requests
comments:   true
description: If you need to inspect HTTP requests made by iPhone or iPad applications, a simple approach is to use SquidMan on your Mac to log the requests made by these devices.
redirect_from:
  - /2011/03/10/using-squidman-to-snoop-ios-requests.html
---

If you need to inspect HTTP requests made by iPhone or iPad applications, a simple approach is to use [SquidMan](http://squidman.net/squidman/) on your Mac.

The basic approach is as follows:

1. Run SquidMan on your Mac
1. Change the proxy settings on your iOS device to point to the SquidMan server
1. Start tailing the Squid logs on your Mac
1. Use the application you want to inspect
1. Watch as requests appear in the log
1. Save the logs if needed

In order for this to work, you'll need a Mac and your iPhone or iPad to be connected to the same wireless network.

## Install and run SquidMan

SquidMan is a simple <abbr title="Graphical User Interface">GUI</abbr> front-end for the Squid caching proxy server. [Download](http://squidman.net/squidman/) the latest version and install it as you would any other OS X application.

When you first run SquidMan, the Preferences panel will be displayed. You only need to do two little tasks in here.

Firstly, take a note of the <abbr title="HyperText Transfer Protocol">HTTP</abbr> port number that Squid uses. You may need to change this port if you're already using it somewhere else on your system.

![SquidMan preference panel](/images/posts/2011-03-10/squidman-preferences.jpg)

Secondly, you'll need to provide proxy services for your iOS device. To do this follow these steps:

1. On your iPad or iPhone, launch the *Settings* application and select the <kbd>Wi-Fi</kbd> section.
1. Under the *Choose a Network...* section you should see your wireless network listed. Touch the blue arrow to the right of the entry.
1. If the <abbr title="Dynamic Host Configuration Protocol">DHCP</abbr> tab is selected, you'll see an <abbr title="Internet Protocol">IP</abbr> address listed. Make a note of this.
1. Back in the SquidMan preferences, choose the <kbd>Clients</kbd> tab.
1. Click the <kbd>New</kbd> button to add a host
1. Enter the IP address you noted from the iOS device settings and click <kbd>Save</kbd>.

![iPad proxy settings](/images/posts/2011-03-10/ipad-proxy-settings2.jpg)

Close the preferences pane and click the <kbd>Start Squid</kbd> button to get going. SquidMan should inform you that Squid is now running.

![SquidMan GUI when running](/images/posts/2011-03-10/squidman.jpg)

### Change iPhone or iPad proxy settings

You first need to make a note of your Mac's IP address on the wireless network.

1. Open the <kbd>Network</kbd> panel under <kbd>System Preferences</kbd>
1. Open either the <kbd>Ethernet</kbd> or <kbd>AirPort</kbd> section depending on how your Mac connects to the network.
1. The IP address should be listed there. For the sake of example, we'll use <code>192.168.0.102</code>.

![Mac OS X Network preference pane](/images/posts/2011-03-10/network-preferences.jpg)

You should have an IP address and a port for the proxy server. You can now tell your iPhone or iPad to use this proxy server when it accesses the internet using your wireless network.

1. Back on your iPhone or iPad with your Wi-Fi settings page still open you should see an *HTTP Proxy* section.
1. Select the <kbd>Manual</kbd> tab. You should now see form fields for the Server and Port.
1. Enter the IP address of your Mac into the <kbd>Server</kbd> field
1. Enter the SquidMan port value you noted earlier into the <kbd>Port</kbd> field
1. Exit the Settings application

At this point you can check that internet access is still working by launching Mobile Safari. If you are getting access denied messages, you need to make sure that Squid is set up to provide access to each device.

## Tail Squid logs

There are two ways you can inspect Squid logs: from within SquidMan, or through the Terminal.

### In SquidMan

1. Simply open the <kbd>SquidMan | Tools</kbd> menu option or hit <kbd>[COMMAND]-T</kbd>.
1. Click the <kbd>Access Log</kbd> button. You'll need to click this again to manually refresh the logs.

The example below shows a sample log from the BBC News app. They appear to have code-named the project 'Moira', most likely as a dedication to newsreader [Moira Stewart](http://en.wikipedia.org/wiki/Moira_Stuart)...

![Access log in SquidMan](/images/posts/2011-03-10/squid-logs.jpg)

### In Terminal

You can easily tail the Squid request logs to see what requests are being made through the proxy as soon as they are made.

To do this, open a Terminal window and run the following:

{% highlight bash %}
$ tail -200f ~/Library/Logs/squid/squid-access.log
{% endhighlight %}

Whilst the logs will not give you more than the basic details of the request and response, it is enough in most cases to see what is going on behind the scenes of a typical iOS application.
