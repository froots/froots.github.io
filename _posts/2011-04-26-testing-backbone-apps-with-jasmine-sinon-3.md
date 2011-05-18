---
layout:     default
title:      Testing Backbone applications with Jasmine and Sinon – Part 3. Controllers and Views
comments:   true
description: The final part in the series looks at testing Backbone.js controllers and views, including testing hash routing, HTML rendering, templates, event handlers and coping with timed events in your application such as animations.
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
        <li><a href="/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html">Part 2: Models and Collections</a></li>
        <li>Part 3: Controllers and Views</li>
    </ul>
</nav>

### Overview

This is the third and final part in a series of articles demonstrating how to test a [Backbone.js](http://documentcloud.github.com/backbone/) application, employing the [Jasmine BDD](http://pivotal.github.com/jasmine/) test framework and the [Sinon.JS](http://sinonjs.org/) spying, stubbing and mocking library If you haven't yet read the [first](/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html) or [second](/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html) parts, take a look now.

In this final part, we'll be looking at some methods for unit testing Backbone controllers and views. These object types both present their own unique challenges for testing, but *Jasmine BDD* and *Sinon.JS* provide the tools we need to isolate them and fake external code and system dependencies. We will be examining the following:

- different approaches to testing Backbone routes
- methods for testing view rendering
- using DOM fixtures in your specs
- using the *jasmine-jquery* plugin
- testing view event handlers
- using fake timers to manipulate timed events

### Controllers

*Backbone.js* controllers are responsible for URL hash routing within your application, and can also be used for initialisation tasks if that's how you choose to structure your code. 

When a URL hash route is matched in your application, Backbone calls the controller method associated with the route. It also triggers a route event in the form <code>route:[action]</code> where <code>action</code> is the name of your method. 

Whether you use a controller method or set up event handlers to bind to the route event is up to you. I  have had some success using event handlers for routes, as you can then delegate behaviour to the specific objects in the application that need to respond. Single controller methods can become monolithic and difficult to test in large applications.

For this example, however, we'll use simple controller methods. Our approach will be to test two aspects of the controller: firstly we'll test the route URLs themselves to make sure a particular URL will fire a particular route; and secondly we'll look at directly testing controller methods.

#### Example 1: Testing routes

Our todo application will be driven by routes. When a user navigates to the home page for the first time, we want to display their to do list. In our code, the steps required are as follows:

1. The AppController responds to the home page route (represented by an empty hash)
1. The <code>home</code> route method instantiates a <code>TodoListView</code> and a <code>Todos</code> collection (created in [part 2](/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html) of this article).
1. The <code>Todos</code> collection is asked to fetch its contents from the server.
1. When this response is received, the <code>TodoListView</code> renders the list. 
1. The rendering of each individual <code>Todo</code> item is delegated to new instances of a <code>TodoView</code> object.

That's quite a lot of code to test. The controller is responsible for the first three of these steps. Firstly we'll look at how to test whether a controller responds correctly to a particular hash URL. This is slightly tricky, as the *Backbone.js* routing system responds to changes in the browser address field. For an effective test, we'll need to manipulate the <code>window.location.hash</code> object and ensure that *Backbone.js* responds. 

Normally in an application you would instantiate a controller once, and run <code>Backbone.history.start()</code> to start Backbone's hash route listening once. However, we can test individual routes in their own specs by changing <code>window.location.hash</code> and then calling <code>Backbone.history.start()</code> each time.

Here's a spec:

##### <code>AppControllerRoutes.spec.js</code>:

{% highlight javascript %}
var controller = new AppController();

describe("AppControllerRoutes", function() {
  
  beforeEach(function() {
    this.routeSpy = sinon.spy();
  });
  
  afterEach(function() {
    window.location.hash = "";
  });
  
  it("fires the index route with a blank hash", function() {
    controller.bind("route:index", this.routeSpy);
    window.location.hash = "";
    Backbone.history.start();
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith();
    controller.unbind("route:index");
  });

});
{% endhighlight %}

The spec binds the <code>route:index</code> event to an anonymous *Sinon.JS* spy function, allowing us to track whether and how it was called. We then ensure that the URL hash has the value we want to test, in this case, an empty value. Calling <code>Backbone.history.start()</code> triggers an initial *Backbone.js* routing check. This saves us from playing around with asynchronous specs or faking time as *Backbone.js* polls the hash value on an interval in browsers that don't support the <code>hashChange</code> event. 

Once the *Backbone.js* routing check has been performed, we expect that our route spy has been called once, and that it has been called with no arguments. It is called with no arguments because there are no parameters specified in the route being matched.

When we run the spec, we are greeted with a green spec runner. Given that we haven't yet created the <code>AppController</code>, this is surprising. The reason is that the first line is throwing a <kbd>ReferenceError</kbd>, but because it is outside a *Jasmine* describe block, it is not being caught by *Jasmine*. You can see it in a console window, however:

	Uncaught ReferenceError: AppController is not defined

Let's fix this by creating our <code>AppController</code>. Don't forget to include it in <code>jasmine.yml</code> if necessary:

##### <code>AppController.js</code>:

{% highlight javascript %}
var AppController = Backbone.Controller.extend();
{% endhighlight %}

Running the specs again produces the following error:

	TypeError: Cannot call method 'start' of undefined

Hmm, for some reason <code>Backbone.history</code> is undefined, and so there is no <code>start</code> method on it. It turns out that *Backbone.js* creates an instance of <code>Backbone.History</code> (upper case 'H') called <code>Backbone.history</code> (lower case 'h') once a controller has been created that has at least one route specified on it. This makes sense, as history management is only required if there are routes to respond to.

We can now create our route:

##### <code>AppController.js</code>:
  
{% highlight javascript %}
var AppController = Backbone.Controller.extend({

  routes: {
    "": "index"
  },
  
  index: function() {}
  
});
{% endhighlight %}

and our spec passes.

Now that our home page route is being tested successfully, lets try a route with a parameter. At some point, we'll want to show the user details of a particular to do item. For example, some notes, tags and scheduling information might be displayed. The hash route for showing this detailed view would be <code>#todo/1</code> for a <code>Todo</code> with an <code>id</code> of 1. Let's write a spec to test that our controller handles this route.

##### <code>AppControllerRoutes.spec.js</code>:

{% highlight javascript %}
it("fires the todo detail route", function() {
  this.controller.bind("route:todo", this.routeSpy);
  window.location.hash = "todo/1";
  Backbone.history.start();
  expect(this.routeSpy).toHaveBeenCalledOnce();
  expect(this.routeSpy).toHaveBeenCalledWith("1");
});
{% endhighlight %}
  
This spec is very similar to the one for the home route, but we are now binding a spy to the <code>route:todo</code> event and testing that the <code>routeSpy</code> is called with the <code>id</code> parameter from the URL.

This fails with the following messages:

	Expected Function to have been called once.
	Expected Function to have been called with '1'.

This is exactly what we were expecting. Now let's create the route:

##### <code>AppController.js</code>:
{% highlight javascript %}
var AppController = Backbone.Controller.extend({
  
  routes: {
    "": "index",
    "todo/:id": "todo"
  },
  
  index: function() {},
  todo: function(id) {}

});
{% endhighlight %}

And again, we're green. Simply by adding the route to the hash and creating an empty callback ensures that the <code>route:todo</code> event is fired when the URL hash matches. 

We could enhance these specs by ensuring that only numerical values are valid for the <code>id</code>, and we could also check that our route methods are actually called by wrapping them with a *Sinon.JS* spy.

Now that we have some routes, we need to test that our route methods are behaving as they should be.

#### Example 2: Testing controller methods

Once we have tested that the correct routes are actually being fired, we can test controller methods simply by calling them. To test our <code>index</code> method, we need to ensure that it instantiates a <code>TodoListView</code> and a <code>Todos</code> collection in the correct way. We'll need to create fake objects for both.

##### <code>AppController.spec.js</code>:

{% highlight javascript %}
describe("AppController", function() {

  beforeEach(function() {
    this.controller = new AppController();
    this.collection = new Backbone.Collection();
    this.todoListViewStub = sinon.stub(window, "TodoListView")
      .returns(new Backbone.View());
    this.todosCollectionStub = sinon.stub(window, "Todos")
      .returns(this.collection);
  });
  
  afterEach(function() {
    window.TodoListView.restore();
    window.Todos.restore();
  });

});
{% endhighlight %}

First we create our controller for testing. We then create a bare *Backbone.js* Collection object to act as the <code>Todos</code> collection that will be returned when we stub out its constructor function. Finally, we create *Sinon.JS* stubs for both the <code>TodoListView</code> constructor and the <code>Todos</code> collection constructor, returning a new *Backbone.js* View and our bare collection respectively.

Now to write the specs:

##### <code>AppController.spec.js</code>:

{% highlight javascript %}
describe("Index handler", function() {

  describe("when no Todo list exists", function() {
      
    beforeEach(function() {
      this.controller.index();
    });
    
    it("creates a Todo list collection", function() {
      expect(this.todosCollectionStub)
        .toHaveBeenCalledOnce();
      expect(this.todosCollectionStub)  
        .toHaveBeenCalledWithExactly();
    });
    
    it("creates a Todo list view", function() {
      expect(this.todoListViewStub)
        .toHaveBeenCalledOnce();
      expect(this.todoListViewStub)
        .toHaveBeenCalledWith({
          collection: this.collection
        });
    });
    
  });
  
});
{% endhighlight %}
  
Before each spec, we call our <code>index</code> method for testing.

In the first spec we check that the <code>Todos</code> collection constructor has been called exactly once, and that it was called with no arguments.

In the second spec, we check that the <code>TodoListView</code> constructor was also called once, and that it was called with a hash object containing our stubbed collection instance. In this way we are testing that the application is linking the <code>TodoListView</code> with its data source, the <code>Todos</code> collection.

When these specs run, we get four failures:

	creates a Todo list collection
	  Expected Function to have been called once.
	  Expected Function to have been called with exactly.
    
	creates a Todo list view
	  Expected Function to have been called once
	  Expected Function to have been called with ... 
    
So, let's write the code to make these pass:

##### <code>ApplicationController.js</code>:

{% highlight javascript %}
var AppController = Backbone.Controller.extend({
  
  ...
  
  index: function() {
    this.todos = new Todos();
    this.todosView = new TodoListView({
      collection: this.todos
    });
  }
  
});

{% endhighlight %}

Simple. We now need to test that collection's data is fetched when the <code>index</code> route is run. This is done by simply calling the <code>Todos</code> collection's <code>fetch</code> method. Let's write another spec.

First, we need to stub the collection's <code>fetch</code> method so that it performs no action, but allows us to spy on it. We add the following line to our <code>beforeEach</code> method just after creating <code>this.collection</code>:

##### <code>AppController.spec.js</code>:

{% highlight javascript %}
describe("AppController", function() {
    
  beforeEach(function() {
    ...
    this.collection = new Backbone.Collection();
    this.fetchStub = sinon.stub(this.collection, "fetch")
      .returns(null);
    ...
  });
  
  ...
  
});
{% endhighlight %}

We can then add our new spec after the previous two:

{% highlight javascript %}
it("fetches the Todo list from the server", function() {
  expect(this.fetchStub).toHaveBeenCalledOnce();
  expect(this.fetchStub).toHaveBeenCalledWith();
});
{% endhighlight %}

This fails as expected:

    fetches the Todo list from the server
      Expected Function to have been called once.
      Expected Function to have been called with.
  
And making the spec pass is simple:

##### <code>AppController.js</code>:

{% highlight javascript %}
var AppController = Backbone.Controller.extend({
  
  ...
  
  index: function() {
    this.todos = new Todos();
    this.todosView = new TodoListView({
      collection: this.todos
    });
    this.todos.fetch();
  }
  
});

{% endhighlight %}

Our examples so far have been simple. You can see that controllers can easily create a lot of other objects, and then call methods on those objects in order to get things rolling in your application.

If you are instantiating your initial application objects like this in your controllers, then you'll be creating a lot of stubs and mocks in your controller specs. This is a matter of application design. For simple applications it is probably not a big issue, but this approach soon gets unwieldy.

An alternative approach is to instantiate any initial *Backbone.js* objects in an overall application initialisation method that is run when the page is first loaded, for example in a DOM ready handler. The controller would also be instantiated and *Backbone.js*'s history object initialised at this point. The primary application objects that you have created (usually the views) can then bind and unbind to the built-in *Backbone.js* controller route events as required within their own code. In this way you are effectively delegating responsibility to the individual application objects so they are in charge of their own destiny. The outcome of this is code that is easier to test, and easier to maintain. If your specs become unwieldy, long and difficult to set up, then this is often a code smell suggesting that you should probably simplify or refactor your code.

Looking back to the top of example 1, we can see that we have now tested the first three steps required to render our to do list. The last two steps are the responsibility of two views: the <code>TodoListView</code> and the <code>TodoView</code>. Let's take a look at testing views, then.

### Views

Because our app uses jQuery for DOM manipulation, it makes some sense to use jQuery to test the rendered elements that our views will produce. Fortunately there is a [Jasmine BDD jQuery plugin](https://github.com/velesin/jasmine-jquery) specifically for this purpose. The plugin provides two key features: firstly there are a number of *Jasmine* matchers to test jQuery wrapped sets and elements and secondly, it provides the ability to create temporary HTML fixtures for your specs to use. 

To use the plugin, just include the <code>jasmine-jquery.js</code> file in your <code>jasmine.yml</code> or <code>SpecRunner.html</code>.

#### Example 1: Creating the root element

In our first view example, we'll create a simple spec to check that our <code>TodoListView</code> has created the expected element when it is initialised. *Backbone.js* views will create an empty DOM element as soon as they are initialised, but this element will not be attached to the visible DOM. This allows a view to be constructed without unduly affecting rendering performance.

Our spec is pretty simple:

##### <code>TodoListView.spec.js</code>:

{% highlight javascript %}
describe("TodoListView", function() {
  
  beforeEach(function() {
    this.view = new TodoListView();
  });
  
  describe("Instantiation", function() {
    
    it("should create a list element", function() {
      expect(this.view.el.nodeName).toEqual("UL");
    });
    
  });
  
});
{% endhighlight %}

Running this spec produces the following failure:

    Expected 'DIV' to equal 'UL'.

We can fix this easily in our <code>TodoListView.js</code> by specifying the built-in *Backbone.js* <code>tagName</code> property for the view:

##### <code>TodoListView.js</code>:

{% highlight javascript %}
var TodoListView = Backbone.View.extend({
  tagName: "ul"
});
{% endhighlight %}

Let's also check that the element has the right class:

##### <code>TodoListView.spec.js</code>:

{% highlight javascript %}
it("should have a class of 'todos'", function() {
  expect($(this.view.el)).toHaveClass('todos');
});
{% endhighlight %}
    
This uses the <code>toHaveClass</code> matcher created by the *jasmine-jquery* plugin which operates on jQuery objects. If we had not used the plugin, the expectation would have looked something like this:

{% highlight javascript %}
expect($(this.view.el).hasClass('todos')).toBeTruthy();
{% endhighlight %}

which would produce a failure output like this:

    Expected false to be truthy.

This is not very helpful for debugging purposes. Using the *jasmine-jquery* matcher produces this failure:

    Expected '<ul></ul>' to have class 'todos'.

Again, we can easily fix this with a simple <code>className</code> property on the view object.

##### <code>TodoListView.js</code>:

{% highlight javascript %}
var TodoListView = Backbone.View.extend({
  tagName: "ul",
  className: "todos"
});
{% endhighlight %}

Let's move on to testing the actual rendering of our to do list content.

#### Example 2: Rendering

When we ask our to do list to render, it will create a task entry for each instance of a <code>Todo</code> model in the <code>Todos</code> collection. Each one of these tasks is a view instance with a reference to the model that will be rendered.

So, when the <code>TodoListView</code>'s <code>render()</code> method is called, we want to test that a <code>TodoView</code> is instantiated for each model in the associated collection.

Once again, because we are not currently testing the <code>TodoView</code> object, we will stub it with a basic *Backbone.js* view. As discussed in [part 2](/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html) of this series, I find that this is by far the easiest way to isolate a *Backbone.js* object from other *Backbone.js* objects in your specs without resorting to mocking and stubbing the whole *Backbone.js* interface.

We create a basic *Backbone.js* view to stand in for the <code>TodoView</code>, and then stub the <code>TodoView</code> constructor function, returning our basic *Backbone.js* view instead of a real <code>TodoView</code> instance.

We then create a simple *Backbone.js* collection with three models, and associate the <code>TodoList</code> view instance with this collection. When the view's <code>render()</code> method is called, the expected behaviour is then to call the <code>TodoView</code> constructor once for each model in the collection.

##### <code>TodoListView.spec.js</code>:

{% highlight javascript %}
describe("TodoListView", function() {
  
  beforeEach(function() {
    this.view = new TodoListView();
  });
  
  ...

  describe("Rendering", function() {
    
    beforeEach(function() {
      this.todoView = new Backbone.View();
      this.todoViewStub = sinon.stub(window, "TodoView")
        .returns(this.todoView);
      this.todo1 = new Backbone.Model({id:1});
      this.todo2 = new Backbone.Model({id:2});
      this.todo3 = new Backbone.Model({id:3});
      this.view.collection = new Backbone.Collection([
        this.todo1,
        this.todo2,
        this.todo3
      ]);
      this.view.render();
    });
    
    afterEach(function() {
      window.TodoView.restore();
    });
    
    it("should create a Todo view for each todo item", function() {
      expect(this.todoViewStub).toHaveBeenCalledThrice();
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo1});
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo2});
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo3});
    });
    
  });
  
});
{% endhighlight %}

Running this spec results in 3 errors:

    TypeError: Attempted to wrap undefined property TodoView as function
    TypeError: Cannot read property 'calledThrice' of undefined
    TypeError: Cannot call method 'restore' of undefined

This is telling us that we need to create a <code>TodoView</code> object.

##### <code>TodoView.js</code>:

{% highlight javascript %}
var TodoView = Backbone.View.extend();
{% endhighlight %}

Now, when we re-run the specs, we get this failure:

    Expected Function to have been called thrice.

and three of these:

    Expected Function to have been called with {..}

Those are the proper failures. Let's fix it by writing the code we need.

{% highlight javascript %}
var TodoListView = Backbone.View.extend({

  ...

  render: function() {
    this.collection.each(this.addTodo);
  },
  
  addTodo: function(todo) {
    var view = new TodoView({model: todo});
  }
  
});
{% endhighlight %}

Great. This passes, and we are now creating three <code>TodoViews</code>. However, nothing will be rendered in the page. We need to make sure each <code>TodoView</code>'s <code>render()</code> method is called.

Firstly, we need to spy on the fake <code>TodoView</code>'s <code>render()</code> method. We set this up in our <code>beforeEach</code> function:

##### <code>TodoListView.spec.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.todoView = new Backbone.View();
  this.todoRenderSpy = sinon.spy(this.todoView, "render");
  ...
});
{% endhighlight %}
    
and then the spec itself:

{% highlight javascript %}
it("should render each Todo view", function() {
  expect(this.todoView.render).toHaveBeenCalledThrice();
});
{% endhighlight %}

The failure that results from running this spec can be fixed with the following one line change added to the <code>render()</code> method in <code>TodosView.js</code>:

##### <code>TodoView.js</code>:

{% highlight javascript %}
var todoEl = view.render().el;
{% endhighlight %}
    
However, we still need to append the rendered todo to our list. This is done with jQuery. We can either stub the jQuery <code>append</code> method, or we can physically check that an element has been appended. To write a spec for this we first need to create a simple stubbed <code>render</code> method on the <code>TodoView</code> stub object that creates a DOM element and returns itself, like so:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.todoView = new Backbone.View();
  this.todoView.render = function() {
    this.el = document.createElement('li');
    return this;
  };
  this.todoRenderSpy = sinon.spy(this.todoView, "render");
  this.todoViewStub = sinon.stub(window, "TodoView")
    .returns(this.todoView);
  ...
});
{% endhighlight %}
    
and we can now write a spec to check that one of these elements has been appended for each model:

{% highlight javascript %}
it("appends the todo to the todo list", function() {
  expect($(this.view.el).children().length).toEqual(3);
});
{% endhighlight %}
    
This produces the following failure as expected:

    Expected 0 to equal 3.

Lets' fix that in <code>TodosView.js</code>:

##### <code>TodosView.js</code>:

{% highlight javascript %}
addTodo: function(todo) {
  var view = new TodoView({model: todo});
  var todoEl = view.render().el;
  $(this.el).append(todoEl);
}
{% endhighlight %}
  
Running the specs produces the same failure as before. What happened? This is a common gotcha when first starting out with *Backbone.js*. Because the <code>addTodo()</code> method is called as a callback from within an underscore.js <code>each()</code> iterator, the scope for <code>addTodo</code> is not the <code>TodoListView</code> instance, but the <code>todo</code> model instance that is the target of the iteration cycle. Because of this, there is no <code>el</code> property on <code>this</code>, and the append fails.

Fortunately underscore.js provides a convenience function to fix the scope for a method named <code>bindAll()</code>. In a *Backbone.js* application it is best called within the <code>initialize()</code> method. It takes the intended scope as the first argument, and one or more methods on the current scope that are to have their scope set:

{% highlight javascript %}
initialize: function() {
  _.bindAll(this, "addTodo");
},
{% endhighlight %}
  
This sets the scope for the <code>addTodo()</code> method to be the <code>TodosView</code> instance rather than the scope it was actually called with.

Now the jQuery append is being called on the correct object, and the spec passes.
  
#### Example 3: Rendering HTML

So far our views have not actually rendered anything. Our <code>TodoListView</code> simply delegates the actual rendering of markup to the individual <code>TodoView</code> objects below it. Let's test that these <code>TodoView</code> elements are rendered as expected. 

We'll start by just using some string manipulation to create HTML markup to be rendered using jQuery's <code>html()</code> method.

We will create two specs initially. The first will check that the view's <code>render()</code> method returns the view instance. This is necessary for chaining, and something that we have already expected in the specs for <code>TodoListView</code>. The second spec will check that the produced HTML is exactly as expected based on the properties of the model instance that is associated with our <code>TodoView</code>.

Our <code>beforeEach</code> function for these specs simply creates a sample model, and then instantiates a <code>TodoView</code> and associates it with the model.

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("TodoView", function() {

  beforeEach(function() {
    this.model = new Backbone.Model({
      id: 1,
      title: "My Todo",
      priority: 2,
      done: false
    });
    this.view = new TodoView({model:this.model});
  });

  describe("Rendering", function() {
    
    it("returns the view object", function() {
      expect(this.view.render()).toEqual(this.view);
    });
    
    it("produces the correct HTML", function() {
      this.view.render();
      expect(this.view.el.innerHTML)
        .toEqual('<a href="#todo/1"><h2>My Todo</h2></a>');
    });
    
  });
  
});
{% endhighlight %}
    
When these specs are run, only the second one fails. The first spec that tests that the <code>TodoView</code> instance is returned from <code>render()</code> passes because *Backbone.js* does this by default, and we haven't overwritten the <code>render</code> method with our own version yet.

The second spec fails with the following message:

    Expected '' to equal '<a href="#todo/1"><h2>My Todo</h2></a>'.

By default, the <code>render()</code> method creates no markup. Let's write a simple replacement for <code>render()</code>:

##### <code>TodoView.js</code>:

{% assign escid = '{{id}}' %}
{% assign esctitle = '{{title}}' %}

{% highlight javascript %}
render: function() {
  var template = '<a href="#todo/{{escid}}"><h2>{{esctitle}}</h2></a>';
  var output = template
    .replace("{{escid}}", this.model.id)
    .replace("{{esctitle}}", this.model.get('title'));
  $(this.el).html(output);
  return this;
}
{% endhighlight %}

This simply specifies a string template and replaces some fields marked with double curly braces with their respective values from the associated model. Because we are returning the <code>TodoView</code> instance from the method, the first spec also passes.

It hardly needs saying that using an HTML string to test against like this is fraught with problems. It is extremely brittle. If you were to change one tiny thing about your template, including white space, your spec would fail, even thought the rendered output would be the same. It will also become time consuming to maintain as your template becomes more complex.

It is far better to test your rendered output using jQuery to select and inspect attribute and text values, element counts and so on.

Let's write specs that check some key aspects of the expected output. Again, we are using the custom matchers added by the *jasmine-jquery* plugin:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("Template", function() {
  
  beforeEach(function() {
    this.view.render();
  });
  
  it("has the correct URL", function() {
    expect($(this.view.el).find('a'))
      .toHaveAttr('href', '#todo/1');
  });

  it("has the correct title text", function() {
    expect($(this.view.el).find('h2'))
      .toHaveText('My Todo');
  });
  
});
{% endhighlight %}
    
Now is a good time to take a look at fixture elements. So far, we have been setting jQuery expectations against the view's <code>el</code> property. This is absolutely fine in many circumstances, and may actually be preferable a lot of the time. However, at times you will need to actually render some markup into the document. The best way to handle this within your specs is to use fixtures, a feature provided by the *jasmine-jquery* plugin. Let's re-write that last spec to use fixtures:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("TodoView", function() {
  
  beforeEach(function() {
 	...
    setFixtures('<ul class="todos"></ul>');
  });
  
  ...
  
  describe("Template", function() {
      
    beforeEach(function() {
      $('.todos').append(this.view.render().el);
    });
      
    it("has the correct URL", function() {
      expect($('.todos').find('a'))
        .toHaveAttr('href', '#todo/1');
    });

    it("has the correct title text", function() {
      expect($('.todos').find('h2'))
        .toHaveText('My Todo');
    });
      
  });
  
});
{% endhighlight %}

We are now appending the rendered todo item into the fixture, and setting expectations against the fixture rather than the view's <code>el</code> property. One reason you might need to do this is when a *Backbone.js* view is set up against a pre-existing DOM element. You would need to provide the fixture and test that the <code>el</code> property is picking up the correct element when the view is instantiated.

#### Example 4: Rendering with a template library
    
We can now start to make the template a little more complex by including some conditional logic. When a todo item is marked as done, we want to provide some visual feedback to the user in the form of a different background colour, or perhaps by striking through the title. We'll do this by attaching a class to the anchor.

Let's write a spec to test that this happens.

##### <code>TodoView.spec.js</code>:
    
    
{% highlight javascript %}
describe("When todo is done", function() {
  
  beforeEach(function() {
    this.model.set({done: true}, {silent: true});
    $('.todos').append(this.view.render().el);
  });
  
  it("has a done class", function() {
    expect($('.todos a:first-child'))
      .toHaveClass("done");
  });
  
});
{% endhighlight %}
    
This fails, as expected, with the following message:

    Expected '<a href="#todo/1"><h2>My Todo</h2></a>' 
    to have class 'done'.

We could fix this in our existing render method like so:

##### <code>TodoView.js</code>:

{% highlight javascript %}
render: function() {
  var template = '<a href="#todo/{{escid}}">' +
    '<h2>{{esctitle}}</h2></a>';
  var output = template
    .replace("{{escid}}", this.model.id)
    .replace("{{esctitle}}", this.model.get('title'));
  $(this.el).html(output);
  if (this.model.get('done')) {
    this.$("a").addClass("done");
  }
  return this;
}
{% endhighlight %}
  
However, you can see that this will get cumbersome quickly. The more logic we have here, the more complexity we introduce. This is where a template library can come in handy. There are many available, and exploring the options is beyond the scope of this article. For this example we'll use [Handlebars.js](https://github.com/wycats/handlebars.js). 

We'll need to add <code>handlebars.js</code> to <code>jasmine.yml</code> or <code>SpecRunner.html</code>. We should be able to rewrite our render code and get the existing specs passing without changing very much.

Here's our new <code>TodoView</code> object, modified to use <code>handlebars.js</code>:

##### <code>TodoView.js</code>:

{% highlight javascript %}
var TodoView = Backbone.View.extend({
  
  tagName: "li",
  
  initialize: function(options) {
    this.template = Handlebars.compile(options.template || "");
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});
{% endhighlight %}

The <code>initialize</code> method compiles a Handlebars template provided as a string in the instantiation. Another way to reference a template would be by placing it in the page HTML and obtaining it via its <code>id</code> attribute, which is a common approach with Handlebars. In a real application, it would be preferable to use the latter approach, and have your specs load the real template in for testing. One way to do this if your project uses Ruby is to use the [Evergreen gem](https://github.com/jnicklas/evergreen) to handle template loading for you. 

For our purposes, we'll continue to use the string injection approach. We add a new directory named templates to the <code>spec</code> directory, and add a new file named <code>todo-template.js</code> which looks like this:

##### <code>todo-template.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.templates = _.extend(this.templates || {}, {
    todo: '<a href="#todo/{{escid}}">' +
            '<h2>{{esctitle}}</h2>' +
          '</a>'
  });
});
{% endhighlight %}

This simply creates or extends a templates object in the *Jasmine* scope for each test and adds a <code>todo</code> property containing the Handlebars template we want to use.

We'll need to add the templates folder reference to <code>jasmine.yml</code> or <code>SpecRunner.html</code>, and also update our existing specs slighly to provide the template when instantiating the <code>TodoView</code> object:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("TodoView", function() {

  beforeEach(function() {
	...
    this.view = new TodoView({
      model: this.model,
      template: this.templates.todo
    });
  });
  
  ...
  
});
{% endhighlight %}

All of the existing specs continue to pass with our new templating system in place, so we can now enhance the template with some logic for the done status:

##### <code>todo-template.js</code>:

{% assign escifopen = '{{#if done}}' %}
{% assign escifclose = '{{/if}}' %}

{% highlight javascript %}
beforeEach(function() {
  this.templates = _.extend(this.templates || {}, {
    todo: '<a href="#todo/{{escid}}"{{escifopen}} class="done"{{escifclose}}>' +
            '<h2>{{esctitle}}</h2>' +
          '</a>'
  });
});
{% endhighlight %}

And that spec now passes as well.

#### Example 4: Events

*Backbone.js* views also allow the declaration of DOM events to be listened for and executed upon. The API to do this is simple: a hash of key/value pairs where the key is a string containing the event to be bound to and the selector to be used, and the value is the name of the method to use as the callback when the event is triggered.

For our Todo app, we will provide a small edit icon for each to do item, which when clicked will replace the title text with an editable input field. Let's write a spec that checks for this behaviour:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("TodoView", function() {

  ...
  
  describe("Edit state", function() {
    
    describe("When edit button handler fired", function() {
      
      beforeEach(function() {
        $('ul.todos').append(this.view.render().el);
        this.li = $('ul.todos li:first');
        this.li.find('a.edit').trigger('click');
      });
      
      it("shows the edit input field", function() {
        expect(this.li.find('input.edit'))
          .toBeVisible();
        expect(this.li.find('h2'))
          .not.toBeVisible();
      });
      
    });
    
  });
  
});
{% endhighlight %}
  
This spec runs and fails with the following messages:

    Expected '' to be visible.
    Expected '<h2>My Todo</h2>' not to be visible.

To fix this, we first need to create the edit link and input field in our template:

##### <code>todo-template.js</code>:

{% highlight javascript %}
beforeEach(function() {
  this.templates = _.extend(this.templates || {}, {
    todo: '<a href="#todo/{{escid}}"{{escifopen}} class="done"{{escifclose}}>' +
            '<h2>{{esctitle}}</h2>' +
            '<input class="edit" type="text" ' +
            'value="{{esctitle}}" style="display:none"/>' + 
          '</a>' +
          '<a href="#" class="edit">Edit</a>'
  });
});
{% endhighlight %}

Then we add the events hash with our click event linked to an event handler:

##### <code>TodoView.js</code>:

{% highlight javascript %}
var TodoView = Backbone.View.extend({

  ...
  
  initialize: function(options) {
    _.bindAll(this, "edit");
    this.template = Handlebars.compile(options.template || "");
  },
  
  events: {
    "click a.edit": "edit"
  },

  edit: function() {
    this.$('h2').hide();
    this.$('input.edit').show();
  }
  
});
{% endhighlight %}
  
Don't forget to add a <code>_.bindAll</code> call to set the scope of the edit callback. Our specs are all green again, and we can move on.

#### Example 5: Animations and timing

Suppose that one of your esteemed designer colleagues deems that when the user clicks the edit icon, the title text should fade out and the input field should fade in over the course of half a second. Of course, you would think that this is unnecessary fluff in the user interface, but you are overruled and you must carry out the instruction to the full or be dismissed immediately.

When it comes to actually carrying out the designer's instructions, the code could not be easier. We simply amend the edit method to use jQuery's <code>fadeIn</code> and <code>fadeOut</code> methods:

{% highlight javascript %}
edit: function() {
  this.$('h2').fadeOut(500);
  this.$('h2').fadeIn(500);
}
{% endhighlight %}

Great! All is well until you run the specs and are greeted with the following failure message:

    Expected '<h2 style="opacity: 1; ">My Todo</h2>' 
    not to be visible.

The spec is checking the visible state of the title heading immediately after the <code>render()</code> method is called. We need to wait for half a second before we check the state to give the animation time to complete.

One way around this is to use *Jasmine*'s built-in support for asynchronous specs. The existing spec could be re-written like this:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("When edit button handler fired", function() {
  
  beforeEach(function() {
    $('ul.todos').append(this.view.render().el);
    this.li = $('ul.todos li:first');
    this.li.find('a.edit').trigger('click');
  });
  
  it("shows the edit input field", function() {
    waits(510);
    runs(function() {
      expect(this.li.find('input.edit'))
        .toBeVisible();
      expect(this.li.find('h2'))
        .not.toBeVisible();          
    })
  });
  
});
{% endhighlight %}
    
With this approach, we're waiting for 510 milliseconds between the click event and the expectations, which are wrapped in a <code>runs()</code> call to make them run after the wait has completed. 

That's not so bad, and the spec passes now. However, write more than a few of these asynchronous timed specs and you'll end up with a very slow-running spec suite. Our spec suite has gone from 0.15 seconds to 0.65 seconds just because of one spec.

To eliminate this delay we can use the fake timing abilities of *Sinon.JS*. Instead of actually waiting for half a second to pass, *Sinon.JS* allows us to fake the passing of time itself. Unfortunately it doesn't actually manipulate the space/time continuum, which would have been very neat programming indeed, but simply mucks about with JavaScript's native time-keeping methods such as <code>setTimeout</code> and <code>setInterval</code>.

We can re-write our spec to use *Sinon.JS*'s fake timers as follows:

##### <code>TodoView.spec.js</code>:

{% highlight javascript %}
describe("When edit button handler fired", function() {
  
  beforeEach(function() {
    this.clock = sinon.useFakeTimers();
    $('ul.todos').append(this.view.render().el);
    this.li = $('ul.todos li:first');
    this.li.find('a.edit').trigger('click');
  });
  
  afterEach(function() {
    this.clock.restore();
  });
  
  it("shows the edit input field", function() {
    this.clock.tick(600);
    expect(this.li.find('input.edit'))
      .toBeVisible();
    expect(this.li.find('h2'))
      .not.toBeVisible();
  });
  
});
{% endhighlight %}
    
Fake timers are initialised by calling <code>sinon.useFakeTimers()</code> in the <code>beforeEach</code> method. We must restore the native timer functions to their original state after our specs, so we create an <code>afterEach</code> function which does this. Finally, the spec itself is responsible for moving the clock forward by a specified number of milliseconds before we run our expectations.

Now when our specs pass, they pass in around 0.15 seconds again. Even though our application is now using animations, it has had minimal effect on our specs. This is most definitely a Good Thing, as it gives designers and developers the flexibility to tweak interface characteristics such as animations without being unduly held back by the test suite.

The use of fake timers is not limited to animations, of course. They can be used wherever timing is important in your application. For example, you may have a regular polling request that updates some information every minute. Instead of letting a spec run for a full minute, or artificially changing the polling interval in your spec, you can forward the timer by a minute and test that another request has been made to the server.

### Summary

Testing user interface behaviours and interactions can sometimes be daunting, and test suites quite often end up being slow-running or incomplete because of the unique challenges the UI of web applications present. Although some of the techniques here are specific to *Backbone.js*, many apply to jQuery and other rich web application interfaces in general.

Throughout this series of articles, we have concentrated on writing unit tests where individual JavaScript objects are tested in isolation. Your test suite should also include some integration tests where objects are tested in combination with each other, and functional tests where an actual running application is tested using an automated browser driver such as Selenium or Web Driver. There are a pretty large number of frameworks, libraries and drivers that satisfy this need, but they can be difficult to set up, bug-prone and a challenge to debug. For this reason, the unit test suite is essential to catch as many problems as possible as early as possible, and to write test cases when bugs are discovered.

I hope that this series of articles has given you some useful techniques to start testing your *Backbone.js* applications, and not to be daunted by the apparent complexity that that may present at first. Like any seemingly complex task, testing is simply a matter of breaking the task down into smaller, more manageable units, and using a toolset to make this process faster and more efficient. Happy testing!

<nav>
    <ul>
        <li><a href="/2011/03/03/testing-backbone-apps-with-jasmine-sinon.html">Part 1: Introduction</a></li>
        <li><a href="/2011/03/25/testing-backbone-apps-with-jasmine-sinon-2.html">Part 2: Models and Collections</a></li>
        <li>Part 3: Controllers and Views</li>
    </ul>
</nav>
