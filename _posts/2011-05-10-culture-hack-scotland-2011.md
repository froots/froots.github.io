---
layout:     post
title:      Culture Hack Scotland 2011
comments:   true
description: I attended an excellent hack day organised by the lovely folk at festivalslab and created a jQuery Mobile app for people attending the Edinburgh International Book Festival.
---

![BookFest in action at Charlotte Square Gardens](/images/posts/2011-05-10/bookfest.jpg)

Last weekend I attended [Culture Hack Scotland](http://culturehackscotland.com/), a fantastic hack day organised by the fine people at [festivalslab](http://festivalslab.com/). The [range of data](http://culturehackscotland.com/about/data) available was impressive, and the [quality of the work](http://culturehackscotland.com/showcase) produced by those attending was phenomenal. Congratulations to [Rohan Gunatillake](http://twitter.com/rohan_21awake) and [Ben Werdmuller](https://twitter.com/benwerd) for a superb event.

For my own hack, I decided to focus on the [Edinburgh International Book Festival](http://www.edbookfest.co.uk/), which I thought might be neglected somewhat given the richness of the [Edinburgh Fringe](http://www.edfringe.com/) data available, and the fact that it didn't have its own dedicated data sets. I wanted to produce a resource for people such as myself who seem to be afflicted by a gnawing insecurity of their own cultural viability. I greatly enjoy books, but I am by no means literary. I read plenty, but I don't take a great interest in the authors themselves. When attending a book event, the author becomes the centre of focus, and so I wanted to produce a tool that would help attendees discover more about the creators of the books that they have been enjoying.

The result of this is [BookFest](http://heroku.bookfest.com), a mobile application for discovering more about the authors at The Edinburgh International Book Festival. The [code is available for mockery, forkery and hackery on GitHub](http://github.com/froots/bookfest).

## Data sources

The listings data for the Book Festival are taken from the [2010 Festival Listings API](http://projects.festivalslab.com/2010/) created by Ben Werdmuller specifically for Culture Hack Scotland. festivalslab are planning on having a live API for the 2011 festivals which I am very much looking forward to.

The listings API provides only event titles and descriptions and does not provide a specific field for authors, so the [Google Books Search API](http://code.google.com/apis/books/) was used to get matching books based on the event title, and a list of unique authors of these books was collated. I then removed any authors that don't appear in the title. This works pretty well for finding the actual authors for an event.

Once I had authors, I could then query the Google Books API again for a proper bibliography. I was hoping to be able to show Google Books previews inline in the app, but there simply are not that many available.

The rest of the hack was spent adding value, and yes, gimmicks. I used the <a href="http://www.guardian.co.uk/open-platform">Guardian Open Platform API</a> to pull Guardian articles relating to or written by the author, added the inevitable <a href="http://dev.twitter.com/">Twitter</a> search, and grabbed photos of the author from the <a href="http://code.google.com/apis/imagesearch/">Google Image Search API</a>. The reason for the latter feature should be clear - few people really know what a particular author actually looks like. One weakness with this approach is that a <a href="http://bookfest.heroku.com/#/images/David%20Mitchell">search for David Mitchell</a> finds a lot of pictures of <a href="http://en.wikipedia.org/wiki/David_Mitchell_(actor)">TV's David Mitchell</a>, and very few of the <a href="http://en.wikipedia.org/wiki/David_Mitchell_(author)">David Mitchell</a> that wrote <a href="http://bookfest.heroku.com/#/books/detail/9780375507250">Cloud Atlas</a> and <a href="http://bookfest.heroku.com/#/books/David%20Mitchell">other brain-melting fiction stonkers</a>.

My favourite feature of all is the <a href="http://bookfest.heroku.com/#/sign/David%20Mitchell">signature facility</a>. If you have forgotten to bring a book by the author and do not wish to buy another copy at the festival book store, you can simply ask them to scribble on your touch-enabled device. For this I used the demo of the [Interact JavaScript library](http://sidelab.github.com/interact/) that consolidates mouse and touch events for different devices. Of course, this feature is ridiculous as there is really no way to get the signature where it should be - in a copy of the author's book. For that, we will have to settle for [Margaret Atwood's LongPen device](http://en.wikipedia.org/wiki/LongPen).

## Technologies

The app is hosted on [Heroku](http://www.heroku.com), and uses the [Sinatra Ruby framework](http://www.sinatrarb.com/) on the back-end. This uses the [rest-client](http://rubygems.org/gems/rest-client) and [google-book](http://rubygems.org/gems/google-book) gems for making API requests. On the front end I have used [jQuery Mobile](http://jquerymobile.com/), which provides a decent mobile-style UI framework and an Ajax page model to give the website a more native application feel. jQuery Mobile is still in alpha, and so some of the rendering and animation feels a little unfinished at the moment, but overall it's useful for getting something working very quickly.

Check out [BookFest at http://bookfest.heroku.com](http://bookfest.heroku.com)
