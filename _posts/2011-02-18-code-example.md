---
title:      A code example
layout:     default
---

{% highlight javascript %}
var Chapter = Backbone.Model.extend({
  validate: function(attrs) {
    if (attrs.end < attrs.start) {
      return "can't end before it starts";
    }
  }
});

var one = new Chapter({
  title : "Chapter One: The Beginning"
});

one.bind("error", function(model, error) {
  alert(model.get("title") + " " + error);
});

one.set({
  start: 15,
  end:   10
});
{% endhighlight %}