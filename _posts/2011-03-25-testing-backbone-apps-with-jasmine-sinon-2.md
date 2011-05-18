---
layout:     default
title:      Testing Backbone applications with Jasmine and Sinon – Part 2. Models and Collections
comments:   true
description: Part 2 of the series looks at testing Backbone.js models and collections, using Sinon.JS to create fake web servers for testing Ajax requests and spies for verifying event bindings and callbacks.
tags:
  - JavaScript
  - Backbone.js
  - JasmineBDD
  - SinonJS
  - TDD
  - BDD
---

<nav>
    <ul>
        <li><a href="/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html">Part 1: Introduction</a></li>
        <li>Part 2: Models and Collections</li>
        <li><a href="/2011/04/26/testing-backbone-apps-with-jasmine-sinon-3.html">Part 3: Controllers and Views</a></li>
    </ul>
</nav>

### Overview

This is the second in a series of articles demonstrating how to test a [Backbone.js](http://documentcloud.github.com/backbone/) application, employing the [Jasmine BDD](http://pivotal.github.com/jasmine/) test framework and the [Sinon.JS](http://sinonjs.org/) spying, stubbing and mocking library. If you haven't yet read the [first part](/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html), take a look now.

In this part, we'll look at some examples for testing Backbone models and collections. Along the way, we'll be introducing techniques that help to keep your Jasmine specs fast, clean and effective, including:

- how to isolate each of your Backbone objects for testing
- using Sinon's fake server feature to mock server responses to Ajax requests
- using spies to verify event bindings and callbacks

### Introducing the example application

What web application tutorial would be complete without an example To Do list application? I wouldn't want to buck the trend, so for the purposes of the examples here, that's what we'll use.

We're going to create a *Todo* Backbone model, with a title, priority rating and done status. We'll then create a Backbone collection of these Todo models called *Todos*. As we do, we'll be writing Jasmine specs to test their behaviour.

In the third part of this series, we'll create controller and view objects to handle routing and <abbr title="HyperText Markup Language">HTML</abbr> rendering respectively.

### Setting up the sample application

The [sample application can be found on GitHub](https://github.com/froots/backbone-jasmine-examples). Follow the *[README](https://github.com/froots/backbone-jasmine-examples#readme)* there for instructions on setting up and running the specs.

Feel free to fork it, clone it and play around with it. It is a Rails application, but the Rails part of it is pretty minimal as it just serves <abbr title="JavaScript Object Notation">JSON</abbr> responses to the Backbone application. In fact, if you run the application, nothing much happens, although you should be able to use the rails scaffolding at <code>/todos</code> to create *Todo* models and then fetch them using <code>/todos.json</code>.

There is also a version of the application tagged <code>base</code>. This is the starting point for creating some of the examples below before any specs or functionality were added, but includes Jasmine BDD, Sinon.JS, Backbone and jQuery.

### Running the spec suite

To run your Jasmine specs, you can either run <kbd>rake jasmine:ci</kbd> to use Selenium to run through the spec suite or run <kbd>rake jasmine</kbd> to start the Jasmine server. The output in the Terminal will tell you what URL the server is running on. Navigating to that URL in a browser will run the spec suite.

### Backbone Models

Backbone models can vary dramatically from simple to complex, depending on the requirements of your application. Here we'll be focusing on some common model tasks – instantiation, default values, URLs and validation.

#### Example 1: Basic instantiation

Normally, it would not really be necessary to test a simple behaviour such as model instantiation unless you are doing something fancy in your own code. It is easy to get carried away and start testing every little thing just because you can, but you should always ensure that you focus testing on your own code, and avoid directly testing dependencies. 

When you write an application using Backbone, you'll inevitably have some closely coupled code, so it can be difficult to know what to test and what to create fakes for. After all, your application objects are mostly extended Backbone objects. A good rule of thumb is to only directly test the extended Backbone object that you are currently focusing on. Where an object depends on the methods of another object, fake only the <abbr title="Application Programming Interface">API</abbr>s that you need to on that related object.

This is a subject that is really best explained by example, so let's press on with a simple spec for creating (instantiating) a new model. Yes, we'll be writing the specs first, watching them fail hideously, and then writing the code to make them pass in the *red-green-refactor* tradition of <abbr title="Test-Driven Development">TDD</abbr> and <abbr title="Behaviour-Driven Development">BDD</abbr>.

In a Rails project using the Jasmine gem, new Jasmine spec files are created in the <code>spec/javascripts</code> folder. However, they can be created wherever you like for your project, as long as the file is referenced by your Jasmine spec runner.

##### <code>Todo.spec.js</code>:

{% highlight javascript %}
describe('Todo model', function() {

  describe('when instantiated', function() {
    
    it('should exhibit attributes', function() {
      var todo = new Todo({
        title: 'Rake leaves'
      });
      expect(todo.get('title'))
        .toEqual('Rake leaves');
    });
    
  });
  
});
{% endhighlight %}

Running this spec produces the following output:

    ReferenceError: Todo is not defined in ... Todo.spec.js (line 6)

So, we need to create <code>Todo.js</code>. In Rails, this goes somewhere in <code>public/javascripts</code>. I like to create separate folders for models, collections, controllers, views and helpers in my Backbone applications to keep things well organised.

##### <code>Todo.js</code>:

{% highlight javascript %}
var Todo = Backbone.Model.extend();
{% endhighlight %}

which produces the following when the spec is re-run:

    Finished in 0.03458 seconds
    1 example, 0 failures

Yep, all that was needed was to extend the standard <code>Backbone.Model</code> object. The attribute handling is done by Backbone. This is why it could be argued that this spec is unnecessary, but it does at least check that your model is available and named correctly!

Now, onto something slightly more useful.

#### Example 2: Default values

Backbone allows you to set default values for your models if they are not specified when instantiated. We are going to do this with our *Todo* priority values. If the user doesn't set a priority, it will be assumed to have a value of 3 (possible values are 1, 2 and 3).

We need to write another spec. As we are creating a Todo instance for each example, we can move this process into a Jasmine <code>beforeEach</code> function for the sake of efficiency:

##### <code>Todo.spec.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.todo = new Todo({
    title: 'Rake leaves'
  });
});
{% endhighlight %}

This doesn't have a priority attribute, so we can now write the spec after the previous one:

{% highlight javascript %}
it('should set the priority to default', function() {
  expect(this.todo.get('priority')).toEqual(3);
});
{% endhighlight %}

When run, the output is:

    Expected undefined to equal 3.

Now, to write the (very simple) code:

##### <code>Todo.js</code>

{% highlight javascript %}
var Todo = Backbone.Model.extend({
  defaults: {
    'priority': 3
  }
});
{% endhighlight %}

#### Example 3: URL

Related to default values are *validations*. In Backbone.js, a model is validated when the <code>save()</code> or <code>set()</code> methods are called to change attribute values.

However, Backbone will throw an exception if you try to save a model without a <code>url</code> property defined, so let's look at that first.

Backbone models don't strictly need to have a <code>url</code> property set, provided that they are a member of a collection that does have a <code>url</code>. A model's <code>url</code> is its parent collection's <code>url</code> plus the model <code>id</code>. If it doesn't yet have an <code>id</code> attribute, it is a 'new' model, and so the <code>url</code> is the same as the collection's by default. In our application, and later in this article, we'll create a *Todos* collection, which will have a <code>url</code> of <code>/todos</code>. So, a *Todo* model with an <code>id</code> of <code>5</code> will have the <code>url</code> <code>/todos/5</code>. 

This pattern follows <abbr title="Representational State Transfer">REST</abbr>ful conventions as implemented in Rails 3, but the URL of a model or collection can be set to any string value, or can use a function to generate it each time it is needed.

Because our model's URL depends on the collection that it belongs to, we'll need to provide something that can provide this <code>url</code> property. We haven't yet written the *Todos* collection, and even if we had, we wouldn't want to use it as we wouldn't then be testing the *Todo* model in isolation.

There are a number of ways to handle this. For this example, we simply need a single property on the foreign object. The simplest approach is to manually stub the <code>url</code> property. We then simply associate our *Todo* model with our stubbed collection:

##### <code>Todo.spec.js</code>:

{% highlight javascript %}
it("should set the URL to the collection URL", function() {
  var collection = {
    url: "/collection"
  };
  this.todo.collection = collection;
  expect(this.todo.url()).toEqual("/collection");
});
{% endhighlight %}

This spec passes without any work required on our part, as Backbone.js is automatically delegating to the collection to retrieve the url.

This approach is fine if your stub is a simple object or property value. If you are stubbing methods and you need to inspect how the method was called, then you should consider using a Sinon spy, stub or mock. We'll get to those later.

We should write another example for when the model's <code>id</code> is set. We'll move the collection stubbing into a <code>beforeEach</code> function so it is used by both examples without duplication.

##### <code>Todo.spec.js</code>:

{% highlight javascript %}
describe("url", function() {
  beforeEach(function() {
    var collection = {
      url: "/collection"
    };
    this.todo.collection = collection;
  });

  describe("when no id is set", function() {
    it("should return the collection URL", function() {
      expect(this.todo.url()).toEqual("/collection");
    });
  });

  describe("when id is set", function() {
    it("should return the collection URL and id", function() {
      this.todo.id = 1;
      expect(this.todo.url()).toEqual("/collection/1");
    });
  });
});
{% endhighlight %}

Again, this new spec passes first time without any coding required. The example above also demonstrates using nested describe blocks to break up specs by context. This is a common approach in other BDD frameworks such as [RSpec](http://relishapp.com/rspec). Usually, you would use a <code>beforeEach</code> function in each context block to set up the conditions described.

#### Example 4: Validation

Now that we have a valid URL defined for the model (even if it is mostly coming from the collection), we can write some validation specs.

The Backbone <code>validate</code> method is not intended to be called directly, but is something that is called when the model's <code>set()</code> or <code>save()</code> methods are called. Testing it indirectly in this way means that we can't just do a simple input-output test. But, in the tradition of BDD we are testing our code's behaviour and not its inner workings.

When we implement our *Todo*'s view object, the chances are that we'll want to display something when a model fails validation, so that the user can correct it. To do this, the view binds to the model's <code>error</code> event, and acts on it. We can do the same thing in our test, so we are also ensuring that the event is fired when we expect. When we bind an event, we pass in a callback function to be run when the event fires. We can use an anonymous spy function as the callback:

{% highlight javascript %}
var eventSpy = sinon.spy();
this.todo.bind("error", eventSpy);
{% endhighlight %}

The spy will record how it is called so that we can later set our expectations against it in a spec. Let's write one that tests that the model is not saved and an error is thrown when the title is empty. Don't forget that we still have our *Todo* model created in a top-level <code>beforeEach</code> function.

##### <code>Todo.spec.js</code>:

{% highlight javascript %}
it("should not save when title is empty", function() {
  var eventSpy = sinon.spy();
  this.todo.bind("error", eventSpy);
  this.todo.save({"title": ""});
  expect(this.eventSpy.calledOnce).toBeTruthy();
  expect(this.eventSpy.calledWith(
    this.todo, 
    "cannot have an empty title"
  )).toBeTruthy();
});
{% endhighlight %}

The expectations are checking that the spy callback was called exactly once, and when it was called, it was called with the *Todo* model instance and the expected validation failure message. When we run this spec, it fails as expected and Jasmine outputs the following message (twice):

    Expected false to be truthy.

Hmm. Although both failures are accompanied by a stack trace and line numbers, the messages themselves are not very helpful. This is because there are no built in Jasmine matchers for setting expectations on Sinon fake objects, so we are forced to use <code>toBeTruthy</code>. Fortunately there is a [Jasmine-Sinon plugin](https://github.com/froots/jasmine-sinon) which provides these custom matchers. Once included in the project, and referenced from <code>jasmine.yml</code> or <code>SpecRunner.html</code>, you can re-write your Sinon expectations like this:

{% highlight javascript %}
expect(this.eventSpy).toHaveBeenCalledOnce();
expect(this.eventSpy).toHaveBeenCalledWith(
  this.todo,
  "cannot have an empty title"
);
{% endhighlight %}

This spec will now produce these failure messages:

    Expected Function to have been called once.
    Expected Function to have been called with ...

That's better. Now to write the validate method to make this spec pass.

##### <code>Todo.js</code>:

{% highlight javascript %}
var Todo = Backbone.Model.extend({
  ...
  validate: function(attrs) {
    if (!attrs.title) {
      return "cannot have an empty title";
    }
  }
});
{% endhighlight %}

When we run the specs again we're all green. 

At this point we would probably want to test that saving a model results in the expected behaviour from our *Todo* model. However, we will leave server interactions for later. 

Now, on to testing collections.

### Collections

For our Todo application, we need to create a Backbone.js collection of *Todo* models. This collection object will be responsible for loading the current todos from the server, as well as standard list behaviour such as ordering and filtering.

Firstly, let's test that we can add models to the collection.

#### Example 1: Adding models

When adding models to a collection, Backbone.js will automatically create model instances of the type specified by your collection. For example:

{% highlight javascript %}
var Zoo = Backbone.Collection.extend({
  model: Animal
});
var edinburghZoo = new Zoo([
  {name:"Panda"},
  {name:"Penguin"}
]);
{% endhighlight %}

The two object literals passed into the collection constructor will be used to create new *Animal* model instances.

In our case, the *Todos* collection will reference our *Todo* model prototype, but as we are writing unit specs, we want to isolate the *Todos* collection, and fake the *Todo* model. A good way to think of it is to pretend that we haven't yet created the *Todo* model and that the *Todos* collection is the first thing in the application to be authored.

In the model examples, we used a simple handcrafted stub of the collection's <code>url</code> property, because that is all that was required on the collection API. In this case, the collection actually instantiates new models itself, so we'll have to stub the model's constructor function. This is done by creating a Sinon.JS stub as follows:

{% highlight javascript %}
this.todoStub = sinon.stub(window, "Todo");
{% endhighlight %}

This looks a little strange, but you're simply saying "create a stub of the Todo method on the window object". Because <code>window.Todo</code> is a constructor function, this is entirely valid.

Whenever we stub a permanent object, we need to restore it back to it's original state at the end of each spec, usually in an <code>afterEach</code> function:

{% highlight javascript %}
this.todoStub.restore();
{% endhighlight %}

or simply:

{% highlight javascript %}
Todo.restore();
{% endhighlight %}

The next part of creating a stub is to alter what the constructor returns. We could manually craft an object literal to look like a Backbone model, but that would be time consuming and tedious. Instead, we'll use a bare <code>Backbone.Model</code> constructor. This will give us a real backbone model, but not one of our *Todo* models.

{% highlight javascript %}
beforeEach(function() {
  this.todoStub = sinon.stub(window, "Todo");
  this.model = new Backbone.Model({
    id: 5, 
    title: "Foo"
  });
  this.todoStub.returns(this.model);
});
{% endhighlight %}

Now when our *Todos* collection instantiates a new *Todo* model, it will always return the bare Backbone.js model instance we have created.

We can now write our spec for adding new model literals:

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
describe("when instantiated with model literal", function() {
  beforeEach(function() {
    this.todoStub = sinon.stub(window, "Todo");
    this.model = new Backbone.Model({
      id: 5, 
      title: "Foo"
    });
    this.todoStub.returns(this.model);
    this.todos = new Todos();
    this.todos.add({
      id: 5, 
      title: "Foo"
    });
  });
    
  afterEach(function() {
    this.todoStub.restore();
  });

  it("should add a model", function() {
    expect(this.todos.length).toEqual(1);
  });
    
  it("should find a model by id", function() {
    expect(this.todos.get(5).get("id")).toEqual(5);
  });
});
{% endhighlight %}

We haven't yet created our *Todos* collection, so when we run these specs, we get the following error:

    ReferenceError: Todos is not defined in .../Todos.spec.js

So we create our *Todos* collection.

##### <code>Todos.js</code>:

{% highlight javascript %}
var Todos = Backbone.Collection.extend({
    model: Todo
});
{% endhighlight %}

And we have a green spec runner again.

Once again, adding models is something quite simple that you may not end up testing in your own suites, but the technique of stubbing Backbone object constructors is something you'll need to use time and again.

#### Example 2: Ordering

If you provide a <code>comparator</code> method in a Backbone.js collection, any models in that collection will be ordered according to the string or integer that is returned from the comparator. In our case, let's assume we would like to order by priority, so our comparator will simply return the <code>priority</code> attribute, and Backbone.js will do the rest for us.

We can write a spec for this quite easily, but we'll need to create a few models to add to the collection. Let's do this in a top-level <code>beforeEach</code> method so that we can have access to the models when needed:

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.todo1 = new Backbone.Model({
    id: 1,
    title: 'Todo 1',
    priority: 3
  });
  this.todo2 = new Backbone.Model({
    id: 2,
    title: 'Todo 2',
    priority: 2
  });
  this.todo3 = new Backbone.Model({
    id: 3,
    title: 'Todo 3',
    priority: 1
  });
});
{% endhighlight %}

Let's write the spec to test our ordering method:

{% highlight javascript %}
it("should order models by priority", function() {
  this.todos.add([this.todo1, this.todo2, this.todo3]);
  expect(this.todos.at(0)).toBe(this.todo3);
  expect(this.todos.at(1)).toBe(this.todo2);
  expect(this.todos.at(2)).toBe(this.todo1);
});
{% endhighlight %}

When running this spec, Jasmine outputs:

    should order models by priority by default

followed by a long expectation output. Here is the <code>comparator</code> method which we add to <code>Todos.js</code> to make the spec pass.

##### <code>Todos.js</code>:

{% highlight javascript %}
var Todos = Backbone.Collection.extend({
  model: Todo,
  comparator: function(todo) {
    return todo.get("priority");
  }
});
{% endhighlight %}

This example demonstrates that a Backbone collection will take any Backbone model you provide. It does not have to be of the type specified in the collection prototype. The collection does not instantiate any models itself here because it is provided with predefined models. So, again, we're not depending on our *Todo* model for this spec to work.

#### Example 3: Fetching models

Now for a real challenge: how do we unit test the behaviour of an application when it interacts with a server? These tests are often written either as functional tests using fixture data or by using asynchronous unit tests, using real server responses. This is fine, but functional tests can be slow, difficult to set up, require an application to be running on a web server, and depend upon you having all dependencies available.

Fortunately, Sinon.JS circumvents these problems by providing the ability to fake server responses. This means your complex asynchronous server interaction code can be tested in a rapid unit testing environment. This is a boon for the web developer who may not have control over the whole system. You can set how you expect the server to respond to your request, and test that your code handles it. You can also test edge cases, error responses, offline handling and other lunacy, all in your unit tests.

We'll write two specs to test that fetching a *Todos* collection results in the correct *Todo* models being created on the collection. It is important to test the end points of your application where it interacts with other parts of the system. If we are confident that we are making the request to the back-end correctly then integration will be far less bug-prone and problematic.

Before we write our specs, we'll need to set up our fake server. A fake server is essentially a stub as it replaces the behaviour of a real server, and includes spying features to record the requests that were made. We do this in a <code>beforeEach</code> function:

{% highlight javascript %}
beforeEach(function() {
  this.server = sinon.fakeServer.create();
  this.todos = new Todos();
});
{% endhighlight %}

We also need to restore normality once each spec has run in an afterEach function:

{% highlight javascript %}
afterEach(function() {
  this.server.restore();
});
{% endhighlight %}

Now that we have a fake server object, we can set expectations against it and write our first spec. This will check that the request to the server is correct. We won't ask the server to respond – we'll simply check the request it received.

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
it("should make the correct request", function() {
  this.todos.fetch();
  expect(this.server.requests.length)
    .toEqual(1);
  expect(this.server.requests[0].method)
    .toEqual("GET");
  expect(this.server.requests[0].url)
    .toEqual("/todos");
});
{% endhighlight %}

When we run this test, Jasmine catches a Backbone.js error:

    Error: A 'url' property or function must be specified in ...backbone-min.js

This is easy to fix, we just add a <code>url</code> property to our *Todos* collection:

##### <code>Todos.js</code>:

{% highlight javascript %}
var Todos = Backbone.Collection.extend({
  url: "/todos",
  ...
});
{% endhighlight %}

The second spec checks that when the server responds, the collection creates models representing the JSON returned. For this we'll need to have our fake server respond with some JSON data. We expand our <code>beforeEach</code> function to include this:

{% highlight javascript %}
beforeEach(function() {
  this.server = sinon.fakeServer.create();
  this.server.respondWith(
    "GET",
    "/todos",
    [
      200,
      {"Content-Type": "application/json"},
      '{"response":"json response here"}'
    ]
  );
});
{% endhighlight %}

There's quite a bit to take in here, but it's not a as complex as it looks. The fake server's <code>respondWith</code> method takes three arguments here. The first and second are the <abbr title="HyperText Transfer Protocol">HTTP</abbr> request method and URL to respond to. The final argument is an array representing the response that is returned, which itself has three values: the HTTP response code, an object literal of response headers, and a string containing the response body. 

In the above example I have created a very simple JSON response string. However, real JSON responses are often long and complex structures, and we don't really want those defined in our specs. For this reason we can create fixtures which can be kept in a separate file and shared between specs as needed. The fixtures can be created as JavaScript native literals and converted to JSON strings when the response is formulated.

A fixture file might look something like this:

##### <code>fixtures.js</code>:

{% highlight javascript %}
beforeEach(function() {
  
  this.fixtures = {
    
    Todos: {
      valid: { // response starts here
        "status": "OK",
        "version": "1.0",
        "response": {
          "todos": [
            {
              "id": 1,
              "title": "Destroy Alderaan"
            },
            {
              "id": 2,
              "title": "Close exhaust port"
            }
          ]
        }
      } 
    }
    
  };
  
});
{% endhighlight %}

We use a <code>beforeEach</code> function so that the fixture is recreated for each spec (in case an unscrupulous developer modifies it). We then create a group of *Todos* fixtures, with one 'valid' response. In this way we can create similar fixtures for error responses and all sorts of other scenarios. The fixture can then be accessed from within a spec with <code>this.fixtures.Todos.valid</code>.

Using the built-in JSON parser in modern browsers, and including Doug Crockford's [JSON library](https://github.com/douglascrockford/JSON-js) to polyfill older browsers, we can convert this fixture into a JSON response body in our <code>respondWith</code> method:

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.fixture = this.fixtures.Todos.valid;
  this.server = sinon.fakeServer.create();
  this.server.respondWith(
    "GET",
    "/todos",
    [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(this.fixture)
    ]
  );
});
{% endhighlight %}

That is still a little long, and if you use a lot of <code>fakeServer</code> responses, it will start to take up a lot of space. Most of the time when testing your Backbone.js application, you will want to provide a valid response with a <code>200</code> response code, an <code>application/json</code> content-type and a JSON body. Let's write a little helper convenience method, which we can place in a separate file and include in our spec suite.

##### <code>spec-helpers.js</code>:

{% highlight javascript %}
beforeEach(function() {

  this.validResponse = function(responseText) {
    return [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(responseText)
    ];
  };

});
{% endhighlight %}

Like the fixture data, we put spec helper methods in a <code>beforeEach</code> function and assign the method to the current scope which is shared across all specs. Our <code>respondWith</code> call can now be re-written to:

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
this.server.respondWith(
  "GET",
  "/todos",
  this.validResponse(this.fixture)
);
{% endhighlight %}

For the purposes of our spec, we'll need to discover the format that the response will take. If you are in control of the back-end then this is easy, and you can ensure that the response is straightforward to handle on the client. However, it is often the case that the server response is not your responsibility, for example if another team member is developing it, or the source is an external API. In these cases you will often need to do some parsing of the JSON response before models are created.

You can see in our fixture above that the array of *Todo* items are accessible from within the response JSON at <code>response.todos</code>. To point Backbone.js in the right direction we need to write a <code>parse()</code> method on the *Todos* collection. This is called whenever data is retrieved from the server, is passed a response argument, and it must return the array of models representing the collection.

Our spec for the parse method will use the <code>fakeServer</code> to respond with the JSON fixture above, and we'll check that models have been created as expected.

##### <code>Todos.spec.js</code>:

{% highlight javascript %}
it("should parse todos from the response", function() {
  this.todos.fetch();
  this.server.respond();
  expect(this.todos.length)
    .toEqual(this.fixture.response.todos.length);
  expect(this.todos.get(1).get('title'))
    .toEqual(this.fixture.response.todos[0].title);
});
{% endhighlight %}

We only check one model, but you could enumerate over the fixture and check each model very easily. By inserting <code>this.server.respond()</code> at the appropriate point in the spec, we are telling the <code>fakeServer</code> to respond with our pre-canned fixture. Note that we have not needed to write an asynchronous test here, despite the fact we are testing asynchronous callbacks.

When this is run, Jasmine fails the spec with this message:

    Expected 1 to equal 4

We are only getting 1 model because Backbone is assuming that the top level object in the JSON response is a model to be defined within the collection. Let's fix that:

##### <code>Todos.js</code>:

{% highlight javascript %}
var Todos = Backbone.Collection.extend({
  ...
  parse: function(res) {
    return res.response.todos;
  },
  ...
});
{% endhighlight %}

Now the collection is receiving an array of model-like object literals, and the spec passes.

The same approach can be used for faking all the standard CRUD operations you might find in a modern web application. For example, to test that your application is correctly saving new models to the server, you would set up a <code>fakeServer</code> that expects a <code>POST</code> request to the <code>/todos</code> URL, and then call the model's <code>save()</code> method in a spec.

### Summary

That concludes our look at testing Backbone.js models and collections. Next time we'll look at Backbone.js controllers and in particular, views, which represent a particular challenge for unit testing.

<nav>
    <ul>
        <li><a href="/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html">Part 1: Introduction</a></li>
        <li>Part 2: Models and Collections</li>
        <li><a href="/2011/04/26/testing-backbone-apps-with-jasmine-sinon-3.html">Part 3: Controllers and Views</a></li>
    </ul>
</nav>