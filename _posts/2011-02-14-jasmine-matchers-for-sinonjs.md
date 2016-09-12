---
layout:   post
title:    Jasmine matchers for Sinon.JS
comments: true
description: Introducing a small plugin for the Jasmine BDD JavaScript testing framework to allow for better matchers when using the Sinon.JS spying, stubbing and mocking library.
---

I have written a [small plugin](https://github.com/froots/jasmine-sinon) for the [Jasmine BDD JavaScript testing framework](http://pivotal.github.com/jasmine/) to allow for better integration with the [Sinon.JS](http://sinonjs.org/) spying, stubbing and mocking library.

Using Sinon.JS with Jasmine means you end up writing slightly unhelpful expectations. Here is a simple spec involving a Sinon spy:

{% highlight javascript %}
expect(spy.calledWith('foo')).toBeTruthy();
{% endhighlight %}

The _jasmine-sinon_ plugin creates custom matchers for Jasmine, so that you can do this instead:

{% highlight javascript %}
expect(spy).toHaveBeenCalledWith('foo');
{% endhighlight %}

This means that your specs read better, but you also get better failure output from the Jasmine spec runner. Instead of:

```
Expected false to be truthy.
```

the output is:

```
Expected Function to have been called with 'foo'.
```

The plugin is at version 0.1, and needs some further testing. It is also missing any exception matchers. Please fork at will.

[Jasmine-sinon plugin](https://github.com/froots/jasmine-sinon) on Github.
