---
title:      Git config shortcuts for GitHub
layout:     post
comments:   true
description: Some neat Git config tricks to provide command-line shortcuts for GitHub and Heroku.
---

[Sam Elliott](http://lenary.co.uk) has posted some neat Git config tricks that allow some nice shortcuts for GitHub and Heroku:

<script src="https://gist.github.com/833086.js?file=gitconfig.ini"> </script>

This allows you to use shortcuts for cloning repositories:

{% highlight bash %}
$ git clone github:lenary/guides.git
{% endhighlight %}

and gists:

{% highlight bash %}
$ git clone gist:806037
{% endhighlight %}

I'm off to put these in my <code>.gitconfig</code> now.