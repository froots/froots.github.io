---
layout: post
title:  Your mobile mileage may vary
comments: true
description: Before you jump in and buy the same mobile devices for testing as everyone else, take some time to do your own research and work out what devices are likely to be representative for your target audience.
---

If 2012 is definitely, finally, absolutely going to be the year that mobile web takes off, then it seems to have made a good start, with lots of people talking about buying physical devices for testing.

All this was started by [Peter Paul Koch's](http://www.quirksmode.org) excellent [summary on A List Apart](http://www.alistapart.com/articles/smartphone-browser-landscape/) and Stephanie Rieger's [timely reminder](http://stephanierieger.com/a-plea-for-progressive-enhancement/) that mobile device emulators are no match for testing on real devices, illustrated by [Mr. Obama's](http://www.barackobama.com/) magical disappearing navigation. This prompted me to ask for shopping advice on the [Yahoo Mobile Web group](http://tech.groups.yahoo.com/group/mobile-web/message/820), which in turn inspired Brad Frost to post a very handy [breakdown of some suggested devices](http://bradfrostweb.com/blog/mobile/test-on-real-mobile-devices-without-breaking-the-bank/) on his blog.

Brad's list is great, but [conversations on Twitter](http://storify.com/stephaniehobson/if-you-were-buying-5-devices-to-do-mobile-testing?awesm=sfy.co_U2g&utm_campaign=&utm_medium=sfy.co-twitter&utm_source=t.co&utm_content=storify-pingback%5D), [Bagcheck lists](http://bagcheck.com/blog/22-mobile-device-testing-the-gear) and [Stuart Robson's newly forged Tumblr](http://mytestsuite.tumblr.com/) show that everyone's test device collection is different. What is suitable for you will depend on the projects you work on and their intended audience.

## Do your own research

Before you jump in and buy an arbitrarily list of devices, take some time to find out what your target audience are using. Check your own site analytics, look at the [StatCounter](http://gs.statcounter.com/) figures for the relevant regions, and see if there is other geographically focused research available. For example, in the UK, [Tecmark](http://www.tecmark.co.uk/uk-mobile-stats-2011) publish some figures about mobile web twice yearly.

As an example of regional differences, compare StatCounter's figures for BlackBerry market share in the [US](http://gs.statcounter.com/#mobile_os-US-monthly-201110-201112-bar) (8%) and the [UK](http://gs.statcounter.com/#mobile_os-GB-monthly-201110-201112-bar) (32%) for October to December 2011. You might decide that, for a UK audience, it is more important to test with BlackBerry devices than a site which is primarily aimed at the US market. On the other hand, the [latest Tecmark report](http://www.tecmark.co.uk/wp-content/uploads/2011/08/Mobile-and-UK-Web-Traffic-August-2011.pdf) (PDF link) for the UK indicates that BlackBerry devices are only responsible for 3.5% of mobile web traffic, and around 0.5% of all web traffic, belying their apparent market share.

A little more digging around will give you some rough figures for penetration of individual OS versions, which is also useful in understanding which test devices will be representative. For example, here is a [breakdown of BlackBerry subscribers by OS version](http://us.blackberry.com/developers/choosingtargetos.jsp) as of August 2011. Google Analytics will give you a breakdown of OS version usage figures for Android and Windows Phone (but not other platforms), and there are some handy up-to-date [global figures on the Android developer site](http://developer.android.com/resources/dashboard/platform-versions.html). iOS version penetration figures are harder to come by as Apple don't publish figures themselves, but Chitika do publish [occasional iOS version penetration stats](http://insights.chitika.com/2011/iphone-ipad-users-front-runners-in-ios5-update/), although their methodology is not clear.

## Finding out about devices

Market share and analytics will start to give you an idea of where you need to focus your testing efforts. However, it is all very well getting an idea of which OS versions and platforms are likely to be used to access your site. Unless you know the mobile device market inside out, you won't know which phones run which exact version of OS, and at what point in the version history significant changes where made to the built-in browser.

Fortunately, much of this knowledge is available too, in various places:

* DeviceAtlas has a very handy tool for filtering devices based on various properties, including OS version, form factor, and even feature support. This will allow you to see which HTC devices run [Android 2.2 with a 320 x 240 screen](http://deviceatlas.com/resourcecentre/Explore+DeviceAtlas+Data/Data+Explorer#_/filter/877430/1787644/true/0/877430/877437/2.2/1/19/21/240/0/19/20/320/0), for example, although the data is not always fully complete and up to date.

* I also find [Wikipedia](http://wikipedia.org) to be pretty detailed and as well as the usual specifications, [device pages](http://en.wikipedia.org/wiki/Htc_hero) contain information about when and where devices were marketed, predecessor and successor models, model variations and other esoteric information that is hard to find elsewhere.

* The device manufacturers themselves have varying degrees of info. [Nokia's developer site](http://www.developer.nokia.com/Devices/Device_specifications) has a particularly good model breakdown, for example. I won't name names, but some other manufacturers' sites are, well, not so good.

* [When Can I Use](http://caniuse.com) and PPK's [Quirksmode](http://www.quirksmode.org/) both have browser capability charts so you can see which phones are likely to support which fancy new HTML5 API.

## Shopping

This is one for those based in the UK.

We are fortunate enough to have an extremely fluid second-hand mobile market in the UK. There are many unlocked phones, and pay-as-you-go data-only SIMs can be obtained from providers like [GiffGaff](http://giffgaff.com/) for free if you need them.

Buying second phones here is pretty easy, and not that expensive, especially when looking for older models. January is also a great time to buy as people are offloading their old phones after Christmas, so prices go down by about 10-20%.

Because of this, [eBay](http://www.ebay.co.uk/) is chock full of phones to buy, and with the new pricing trends tools is a pretty handy research tool in its own right. Hours can be lost.

There are also the dedicated second-hand shops such as [I Need a Mobile](http://www.ineedamobile.com/), who sell phones according to a quality grade, tend to be a bit more expensive than the eBay going rate, and don't provide chargers.

It's worth taking a look at the high street shops, such as [Carphone Warehouse](http://www.carphonewarehouse.com/), just to see if there are any special deals on newer sim-free phones, and to get an idea on pricing. Finally, there are the classified ad sites such as [Preloved](http://www.preloved.co.uk/) and [GumTree](http://www.gumtree.com/), both of which have plenty of second hand listings.

## Conclusion

If you want to boost your mobile and responsive web design testing process, then real devices will make a big difference, not only for catching bugs, but to gain exposure to different design approaches, input methods and form factors. It pays to spend some time researching what would make a representative collection of devices that reflects your target audience, but also appropriately samples from these variations.

## Massive disclaimer

I'm new to all this myself. I recently started focusing more on mobile web development, and I have never been a huge mobile phone fanatic in the past. Until recently, my own collection was limited to an iPhone 3GS and an old Nokia 3210 that I found at the bottom of a drawer. Please, comment if you have anything to add.
