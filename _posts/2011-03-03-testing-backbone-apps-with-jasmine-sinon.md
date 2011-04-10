---
layout:     default
title:      Testing Backbone applications with Jasmine and Sinon – Part 1
comments:   true
---

[Part 2: Models and Collections](/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html)

### Overview

This is the first in a series of articles demonstrating how to test a [Backbone.js](http://http://documentcloud.github.com/backbone/) application, employing the [Jasmine BDD](http://pivotal.github.com/jasmine/) test framework and the [Sinon.JS](http://sinonjs.org/) spying, stubbing and mocking library.

In this part, we'll take a brief look at Backbone, and then move on to an introduction to some of the features of Jasmine and Sinon.JS. Along the way we'll look at why these tools are a such good fit for testing Backbone applications.

If you have never written any JavaScript tests before, you might like to take a look at Christian Johansen's [recent](http://msdn.microsoft.com/en-us/scriptjunkie/gg655487.aspx) [series](http://msdn.microsoft.com/en-us/scriptjunkie/gg649850.aspx) of [articles](http://msdn.microsoft.com/en-us/scriptjunkie/gg650426.aspx) over at [scriptjunkie](http://msdn.microsoft.com/en-us/scriptjunkie).

### Backbone everywhere

In the last few months, Backbone.js has received a fair bit of exposure, with a number of tutorials and one or two high profile implementations.

Backbone's popularity is understandable. It provides a fairly minimal *model-view-controller* (MVC) structure to help organise all that complex code, but leaves other choices up to the developer. Unlike rich JavaScript UI frameworks such as [Cappuccino](http://cappuccino.org/), it does not provide an UI widgets or themes, but leaves the choice of DOM library up to the developer. Backbone has specific support for [jQuery](http://jquery.com/) or [Zepto](http://zeptojs.com/) if you include them, but it does not preclude the use of other libraries.

Backbone's MVC structure lends itself very nicely to bottom-up unit testing. The separation of concerns into models, collections, views and controllers means that the behaviour of each 'class' (unit) can be tested in isolation, eliminating many bugs up front, and making debugging far simpler. 

This should be very familiar to anyone who has spent any time testing applications developed with MVC frameworks such as [Rails](http://rubyonrails.org/) or [Django](http://www.djangoproject.com/). There are a number of [mature](http://cukes.info/) [libraries](http://relishapp.com/rspec), [tools](https://github.com/thoughtbot/shoulda) and approaches designed for unit testing these applications. You'll need to write JavaScript tests to ensure that your front-end application code is of as high a quality as your server-side code.

### About Jasmine BDD

Jasmine is a behaviour-driven development (<abbr title="Behaviour-Driven Development">BDD</abbr>) testing framework for JavaScript, which has been developed with more than a passing nod to the Ruby library [RSpec](http://relishapp.com/rspec). As with RSpec, Jasmine allows you to write 'specs' (not tests) representing a single example of behaviour that you would like your code to exhibit. 

BDD emphasises shared language amongst developers and stakeholders. The ethos of BDD, and the way that specs are written in RSpec and Jasmine encourage developers to focus on testing the *external behaviour* of their code, rather than its internal details, with specs that are couched in terms of this shared language. This encourages the developer to always consider the beneficial value of the feature being developed, and focus on delivering it.

If you're interested in learning more about BDD, then take a look at [Dan North's original BDD article](http://dannorth.net/introducing-bdd/), or even at the [RSpec Book](http://www.pragprog.com/titles/achbd/the-rspec-book) which has chapters dedicated to the subject, and is more of a BDD bible than an RSpec how-to.

#### Specs

So, let's dig in and take a look at what Jasmine specs look like. Here is a rather simplistic example of a spec for a Backbone model using Jasmine:

{% highlight javascript %}
it("should expose an attribute", function() {
  var episode = new Backbone.Model({
    title: "Hollywood - Part 2"
  });
  expect(episode.get("title"))
    .toEqual("Hollywood - Part 2");
});
{% endhighlight %}

A spec is simply a description of the expected behaviour, the code that will result in that behaviour, and one or more expectations that test the behaviour.

Individual specs should be short and only test one aspect of behaviour. If you find yourself writing a number of different expectations or a spec becomes quite long, then consider breaking it out into other specs. Grouping your specs with suites and using shared set up and teardown functions can help with this.

#### Suites

Specs are grouped into Suites, which are defined using the <code>describe()</code> function. For example, all the specs for the Episode model could be grouped into a suite as follows:

{% highlight javascript %}
describe("Episode model", function() {
  it("should expose an attribute", function() {
  ...
  });
  it("should validate on save", function() {
  ...
  });
});
{% endhighlight %}

Suites can also be nested, which is great when you have a lot of specs, as you can organise them into sets of discrete chunks. I like to use a <code>describe</code> block to wrap specs relating to a particular starting context. This better retains the conversational style of the specs. For example:

{% highlight javascript %}
describe("Episode model", function() {
  describe("when creating a new episode", function() {
    it("should expose the title attribute", function() {
      ...
    });
    it("should have a default parental rating", function() {
      ...
    });
  });
});
{% endhighlight %}

#### *beforeEach()* and *afterEach()*

As in traditional [xUnit](http://en.wikipedia.org/wiki/XUnit) style testing frameworks, you can optionally specify code to run before and after each test. This is great for ensuring consistent conditions for each test, and for setting up variables and objects to be used in your specs. 

The example below uses <code>beforeEach()</code> to create a model instance that will be used in each spec.

{% highlight javascript %}
describe("Episode", function() {
  
  beforeEach(function() {
    this.episode = new Backbone.Model({
      title: "Hollywood - Part 2"
    });
  });
  
  it("should expose an attribute", function() {
    expect(this.episode.get("title"))
      .toEqual("Hollywood - Part 2");
  });
    
  it("should validate on save", function() {
    ...
  });
    
});
{% endhighlight %}

You can provide a <code>beforeEach()</code> and an <code>afterEach()</code> method for each nested describe that you have in your specs, allowing you to have both general and specific setup and teardown methods tailored for each suite of specs. As you'll see in the other parts of this article, this is very handy indeed for reducing repetition and controlling the exact conditions for each spec.

#### The spec runner

This structure results in specs that are pretty easy for other developers to read and interpret directly, largely because of the description for each spec and the format of the expectation matchers. 

Jasmine also provides a simple spec runner, which is simply an HTML page with a script that will run all the specs you provide. The following shows the output from a suite of specs with a single spec failure:

![An example Jasmine spec runner output](/images/posts/2011-03-02/jasmine-spec-runner.png)  

We'll be introducing some other helpful features of Jasmine in the other parts of this article as we need them, including creating fixtures, working with jQuery and creating your own custom expectation matchers. Now, onto Sinon.JS.

### Sinon.JS

Sinon.JS is a library that provides fake objects – spies, stubs and mocks – for testing your JavaScript code. If you don't know what these are, then you aren't alone. The use of these constructs in testing JavaScript code is not something that has really caught on just yet. However, if you are developing a rich, complex application such as you might using Backbone, then fake objects are a very useful part of the testing toolset. 

[Christian Johansen](http://www.cjohansen.no/), the creator of Sinon.JS, explains [why you would want to use fakes](http://msdn.microsoft.com/en-us/scriptjunkie/gg649850.aspx) in another scriptjunkie article. In JavaScript applications, these reasons boil down to:

1. Performance - real DOM manipulation, reliance on timed behaviour and network activity slows tests down
1. Isolation - unit tests should focus on as small a piece of functionality as possible, and be de-coupled from unreliable or slow dependencies

The use of fake objects is a fundamental part of embracing test-driven and behaviour-driven development. They essentially allow code to be tested in isolation from its dependencies. Any <abbr title="Application Programming Interface">API</abbr>s or modules that your code under test depends upon can be faked to respond in the way you need for your test. You can also inspect the faked methods to see exactly how they were called during the course of a test. 

Sinon.JS allows you to provide fakes for almost anything. You can fake parts of your own application, specific behaviours within jQuery, the <code>XmlHttpRequest</code> API itself, or you can even fake JavaScript's timer methods to allow for rapid testing code that has timing dependencies, such as animations and timeouts.

Sinon.JS provides three types of fake object: *spies*, *stubs* and *mocks*. 

#### Spies

Spies are functions that keep track of how and often they were called, and what values were returned. This is phenomenally useful in asynchronous and event-driven applications as you can send a spy function off to keep track of what's going on inside your methods, even if those methods are anonymous or closed off from direct inspection.

Spies can be 'anonymous' or can spy on existing functions.

An anonymous spy is just an empty function with spying features that can be sent off to record how it was used. Like a real spy being sent behind enemy lines with a microphone attached to it's chest, the method under test is none the wiser. Here is an example of a spy testing a simple Backbone custom event binding:

{% highlight javascript %}
it("should fire a callback when 'foo' is triggered", function() {
  // Create an anonymous spy
  var spy = sinon.spy();
  
  // Create a new Backbone 'Episode' model
  var episode = new Episode({
    title: "Hollywood - Part 2"
  });
  
  // Call the anonymous spy method when 'foo' is triggered
  episode.bind('foo', spy); 
  
  // Trigger the foo event
  episode.trigger('foo'); 
  
  // Expect that the spy was called at least once
  expect(spy.called).toBeTruthy(); 
});
{% endhighlight %}


This will pass if the spy was called one or more times, no matter how it was called or what the arguments were. However, Sinon provides a number of methods that allow you to be as strict as you like about the number of invocations, and indeed what each invocation looked like, and what the spy returned.

Spying behaviour can also be attached to an existing method. Hilariously, I like to call these 'moles'. This is useful to check that some piece of functionality is calling another part of the code as expected. For example, you may want to check that a model's <code>save</code> method makes the correct jQuery <code>$.ajax</code> call:

{% highlight javascript %}
it("should make the correct server request", function() {
  
  var episode = new Backbone.Model({
    title: "Hollywood - Part 2",
    url: "/episodes/1"
  });
  
  // Spy on jQuery's ajax method
  var spy = sinon.spy(jQuery, 'ajax');
  
  // Save the model
  episode.save();
  
  // Spy was called
  expect(spy).toHaveBeenCalled();
  // Check url property of first argument
  expect(spy.getCall(0).args[0].url)
    .toEqual("/episodes/1");
  
  // Restore jQuery.ajax to normal
  jQuery.ajax.restore();
});
{% endhighlight %}

#### Stubs and Mocks

Stubs and mocks in Sinon implement all the features of spies, but with some added features. Stubs allow you to replace the existing behaviour of a particular method with whatever you like. This is great for emulating exceptions and error scenarios from external dependencies so you can test that your code will respond appropriately. It also allows you to start development when other dependencies are not yet in place.

Mocks provide all this, but instead mock an entire API and set built-in expectations on how they will be utilised. Like spies they track how they have been used, and like stubs they respond in a pre-programmed manner according to the needs of the test. However, unlike a spy, the expectations for their behaviour is pre-programmed, and a single verification step at the end will fail if any of these individual expectations are not met.

We'll explore stubs and mocks as they needed in the other parts of this article.

#### Fake Ajax and fake servers

Sinon is not limited to spying on and stubbing plain functions and methods. It also provides shortcuts for faking Ajax responses. This means you can test your code in complete isolation from your JSON data source, and don't depend on a running a web application in order to run your spec suites. Furthermore, you can test that your application responds appropriately when it strays from the happy path, including invalid JSON and various HTTP response codes.

Here's a simple example of a spec for a Backbone model's <code>fetch</code> method that uses a fake server to respond to Ajax requests:

{% highlight javascript %}
describe("Episode model", function() {
  beforeEach(function() {
    this.server = sinon.useFakeServer();
  });
    
  afterEach(function() {
    this.server.restore();
  });

  it("should fire the change event", function() {
    var callback = sinon.spy();
    
    // Set how the fake server will respond
    // This reads: a GET request for /episode/123 
    // will return a 200 response of type 
    // application/json with the given JSON response body
    this.server.respondWith("GET", "/episode/123",
      [200, {"Content-Type": "application/json"},
      '{"id":123,"title":"Hollywood - Part 2"}']);

    var episode = new Episode({id: 123});
    
    // Bind to the change event on the model
    episode.bind('change', callback);
    
    // makes an ajax request to the server
    episode.fetch(); 
    
    // Fake server responds to the request
    this.server.respond(); 
        
    // Expect that the spy was called with the new model
    expect(callback.called).toBeTruthy();
    expect(callback.getCall(0).args[0].attributes)
      .toEqual({
        id: 123,
        title: "Hollywood - Part 2",
        url: "/episode/123"
      });
    
  });

});
{% endhighlight %}


There is more to Sinon that we haven't covered here. In particular, fake timers are very useful for testing time-dependent functionality such as animations without slowing down your tests. Check out the full documentation. 

### Summary

In the bleeding-edge world of Backbone applications, complex asynchronous and interdependent behaviours can cause any developer a major headache. Backbone helps developers to structure their code into small, self-contained models, collections, views and controllers. But this is really only half the battle. Without well-tested code there will be a greater number of undetected bugs, and those that are discovered will be harder to track down. Other team members may unintentionally break your code, or simply misunderstand its purpose.

In the second part of this article, we will move on to actually testing some Backbone models and over time we'll build up a simple working application with a suite of specs to go with it.

[Part 2: Models and Collections](/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html)
