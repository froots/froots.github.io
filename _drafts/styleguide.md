---
layout: post
title: Tinned Fruit Pattern Library
subtitle: AKA Style Guide
description: This is some intro text.
intro: This is some intro text that may be somewhat long but not too long. <strong>Also includes markup</strong>
hero:
  src: http://www.fillmurray.com/1024/640
  alt: Bill Murray
  caption: Courtesy of
  credit:
    url: http://www.fillmurray.com/
    name: Fill Murray
---

Lorem ipsum dolor sit amet, adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

## Heading 2

Lorem ipsum dolor sit amet, adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

### Heading 3

Lorem ipsum dolor sit amet, adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

#### Heading 4

Lorem ipsum dolor sit amet, adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

---

## Paragraphs / Images

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem.

{% include figure.html
  src="http://www.fillmurray.com/400/400"
  alt="Figure"
  caption="A 400x400 Bill Murray. Original by"
  credit_name="Fill Murray"
  credit_url="http://www.fillmurray.com/" %}

Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor.

{% include figure-full.html
  src="http://www.fillmurray.com/1200/400"
  alt="Full figure example"
  caption="A long caption about the fact that this is a picture that features Bill Murray in pixel format 1200 x 400. Original by"
  credit_name="Fill Murray"
  credit_url="http://www.fillmurray.com" %}

Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl. Praesent mattis, massa quis luctus fermentum, turpis mi volutpat justo, eu volutpat enim diam eget metus. Maecenas ornare tortor.

Markdown image:

![Placeholder Image and Some Alt Text](http://www.fillmurray.com/350/150 "A title element for this placeholder image.")

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem.

> This is a blockquote. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

---

##  Text Elements

The [a element](#) example

The <abbr>abbr element</abbr> and an <abbr title="Abbreviation">abbr</abbr> element with title examples

The <acronym title="A Cowboy Ran One New York Marathon">ACRONYM</acronym> element example

The **b element** example

The <cite>cite element</cite> example

The `code element` example

The _em element_ example

The ~~del element~~ example

The <dfn>dfn element</dfn> and <dfn title="Title text">dfn element with title</dfn> examples

The _i element_ example

The <ins>ins element</ins> example

The <kbd>kbd element</kbd> example

The <mark>mark element</mark> example

The <q>q element</q> example

The <q>q element <q>inside</q> a q element</q> example

The <s>s element</s> example

The <samp>samp element</samp> example

The <small>small element</small> example

The <span>span element</span> example

The **strong element** example

The <sub>sub element</sub> example

The <sup>sup element</sup> example

The <u>u element</u> example

The <var>var element</var> example

---

## Monospace / Preformatted

Code block wrapped in "pre" and "code" tags:

{% highlight javascript %}
// Loop through Divs using Javascript.
var divs = document.querySelectorAll('div'), i;

for (i = 0; i < divs.length; ++i) {
  divs[i].style.color = "green";
}
{% endhighlight %}

GFM multiline:

``` javascript
(function(foo) {
  return foo(bar(baz));
});
```

GFM indented:

    git push origin master

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.</pre>

---

## List Types

### Ordered List

1.  List Item 1
2.  List Item 2
3.  List Item 3

### Unordered List

*   List Item 1
*   List Item 2
*   List Item 3

### Definition List

<dl>
  <dt>Definition List Term 1</dt>
  <dd>This is a definition list description.</dd>
  <dt>Definition List Term 2</dt>
  <dd>This is a definition list description.</dd>
  <dt>Definition List Term 3</dt>
  <dd>This is a definition list description.</dd>
</dl>

### Multi-part article navigation

<div class="article-nav panel outside">
  <p>This is a 2-part article</p>
  <ol class="article-nav__list">
    <li class="article-nav__item"><a href="#" class="article-nav__link">Part 1: Lorem ipsum dolor</a></li>
    <li class="article-nav__item">Part 2: Consectetuer adipiscing elit</li>
    <li class="article-nav__item"><a href="#" class="article-nav__link">Part 3: Nullam dignissim convallis est</a></li>
  </ol>
</div>

### Post list

{% include post-list.html limit="5" %}

---

## Tables

| Table Header 1 | Table Header 2 | Table Header 3 |
| :---           | :---:          | ---:           |
| Division 1     | Division 2     | 1.422          |
| Division 1     | Division 2     | 2.47782        |
| Division 1     | Division 2     | 10234          |

---

## Forms

<form action="#" method="get" novalidate>
  <h2 class="form-title">Form title</h2>
  <p>Form description text</p>
  <div class="field-group">
    <label for="input-example">Text input empty</label>
    <input type="text" placeholder="Empty input" required>
  </div>
  <div class="field-group">
    <label for="input-example">Text input populated</label>
    <input type="text" value="Lorem ipsum dolor">
  </div>
  <div class="field-group">
    <label for="select-example">Select input</label>
    <select>
      <option>Red</option>
      <option>Green</option>
      <option>Blue</option>
    </select>
  </div>
  <div class="button-group">
    <input type="submit" class="button" value="Submit button">
  </div>
  <div class="button-group">
    <button class="button button--secondary" type="button">Some other action</button>
  </div>
</form>

---

## YouTube video embed

{% include youtube.html id="VWb1z6ZwUoY" %}

## Panels

In page margin

<div class="panel">
  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.</p>
</div>

Outside with heading

<div class="panel outside">
  <h2 class="panel__heading">Lorem ipsum</h2>
  <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.</p>
  <p>Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem.</p>
</div>

Media

<div class="panel panel--media outside">
  <div class="panel--media__image">
    <img class="avatar avatar--small" src="/images/main/avatar.jpg" alt="Jim Newbery">
  </div>
  <div class="panel--media__content">
    <h2 class="mt0">Hi</h2>
    <p>This guy here.</p>
  </div>
</div>

## Testimonial

Left

{% include testimonial.html
  image="/images/main/avatar.jpg"
  name="Jim Newbery"
  title="Director and Principal Consultant"
  company="Tinned Fruit Ltd."
  content="Tinned Fruit are the best. But I would say that. I own them."
  position="left"
%}

Right

{% include testimonial.html
  image="/images/main/avatar.jpg"
  name="Jim Newbery"
  title="Director and Principal Consultant"
  company="Tinned Fruit Ltd."
  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis nisl eu nisi placerat, id tempor diam tincidunt. Vivamus mollis diam eget eros semper tincidunt."
  position="right"
%}

No image

{% include testimonial.html
  name="Jim Newbery"
  title="Director and Principal Consultant"
  company="Tinned Fruit Ltd."
  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lobortis nisl eu nisi placerat, id tempor diam tincidunt. Vivamus mollis diam eget eros semper tincidunt."
  position="left"
%}

## Tweet

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

{% include tweet.html
  text="Web types! If you maintain a pattern library, what automated tests do you run before release, if any? (RTs please)"
  author="Jim Newbery"
  username="froots101"
  url="https://twitter.com/froots101/status/774165825791995905"
  date="September 9, 2016" %}

Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam dignissim convallis est. Quisque aliquam. Donec faucibus. Nunc iaculis suscipit dui. Nam sit amet sem. Aliquam libero nisi, imperdiet at, tincidunt nec, gravida vehicula, nisl.

## Hero banner

The hero image is a background, title and subtitle for use on landing pages of high impact.

### No background image

<div class="hero outside">
  <h2 class="hero__subtitle">Hero module subtitle text</h2>
  <h1 class="hero__title">Hero module title</h1>
</div>
