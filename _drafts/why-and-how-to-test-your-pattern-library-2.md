---
layout: "post"
title: "Why and How to Test Your Pattern Library 2"
subtitle: "Part 2: How to Test a Pattern Lab Project"
date: "2016-09-07 10:52"
description: >-
  Pattern Lab is a great tool for creating a pattern library using an atomic
  design approach. Here's how to use Galen Framework to test patterns
  automatically across browsers.
intro: >-
  Pattern Lab is a great tool for creating a pattern library using an atomic
  design approach. Here's how to use Galen Framework to test patterns
  automatically across browsers so you can cut down on all that tedious
  manual testing.
twitter_card:
  type: summary_large_image
  image: /images/posts/2016-09-12/soyuz-og.jpg
og_data:
  image: /images/posts/2016-09-12/soyuz-og.jpg
promo: ardt
hero:
  src: /images/posts/2016-09-12/soyuz.jpg
  alt: Soyuz rocket blueprint
  caption: Soyuz Rocket Blueprints
  credit:
    name: Pics About Space
    url: >-
      http://pics-about-space.com/nasa-apollo-blueprint?p=3#img6947687409028288357
---

What do you want readers to feel?

* Excited to follow the tutorial steps so they can kill some of their manual testing
* Confident that it's not hard to do
* Think they can apply it to non-Pattern Lab projects

---

[TODO: Part I navigation block]

In part 1 of this article, we looked at how automated cross-browser testing based on design specs can be a great way to improve the quality of patterns.

It makes sense to do as much testing as you can on pattern library examples, and not to repeat that testing within individual products. Product teams can then focus on functionality and implementation that is unique to them. Executable specs and test results can also be published as part of pattern library documentation, and this is a great way to improve confidence and trust in a pattern library.

Check out part 1 for a full discussion of advantages and strategy around pattern library testing.

## Why test a Pattern Lab project?

In this second part of the article, we're going to dive into adding automated responsive design tests to a Pattern Lab project.

Pattern Lab is a popular tool for designing and developing using an [atomic design](#TODO) approach. Atomic design advocates working from _atoms_, up through _molecules_ and _organisms_ until finally you are able to stitch together full _templates_ and example _pages_. Pattern Lab supports atomic design by allowing designers and developers to provide working examples of each level of component. Importantly, you can nest components together using a templating language (the default is Mustache), so that a molecule can be composed of individual atoms, for example.

Pattern Lab is now on version 2, and there are two main editions: a PHP edition and a Node.js edition. We will look at testing both editions, but the approach differs only in how tests are started. Unless otherwise stated, everything here applies to both Pattern Lab editions.

Pattern Lab is perfectly suited to automated testing. It provides consistent, context-free component examples that can be viewed at a unique URL on any browser or device. Additionally, component variations can be created with different content or state.

The approach described in this article can apply to any pattern library site or tool that provides testable examples at a consistent URL.

## What we're going to do

We're going to use Pattern Lab's example project, _Hiketracker_, as a focus for this tutorial. This is great because it means I didn't have to create any patterns at all for this article.

By the end of this tutorial, you should be familiar with the basics of:

* using Galen Framework's custom design spec language to write responsive design specs for a component
* running a single spec in a browser
* running multiple specs as part of a test suite
* providing different checks for tests at different viewport sizes
* running specs against different browsers installed on your PC
* running specs against a headless browser for speed
* testing pattern variants

## How does Galen Framework work?

We'll be using Galen Framework, which takes a unique approach to design and layout testing.

Unlike visual regression testing (VRT), which works by taking screen grabs of a component, Galen's approach is based on design specifications.

Galen's custom spec format allows authors to set down expectations about an element's relative position to other elements, element dimensions and other final CSS characteristics.

Galen checks can be as precise or not as we wish. For example, we can expect an element to be exactly 12 pixels to the right of another. Or we can just check that it is 'about' 12 pixels, or in the range 10-14 pixels. We can also merely check that it is _somewhere_ to the right of the another element. This flexibility demonstrates how Galen's creators understand the often imprecise nature of modern responsive web design, where pixel perfection isn't possible or practical.

Galen's tests are powered by Selenium WebDriver, which allows detailed inspection of a final rendered page in a variety of real browsers and devices. These browsers can be on our own PCs or provided by cloud testing services like Browserstack and Sauce Labs.

Right, enough pre-amble. Let's get testing some patterns!

## Set up and installation

First of all, we need to install Pattern Lab 2 and create a project. You can use either the PHP or Node.JS editions. We will also need some patterns to test, and for the purposes of this article we will use Pattern Lab's example project, _Hiketracker_.

### PHP edition

We will use the standard [Mustache edition of Pattern Lab PHP](#todo). Download the latest _patternlab2-with-demo.zip_ file from the [project releases page](https://github.com/pattern-lab/patternlab-php/releases/).

Once you have downloaded and extracted the zip file, make sure you can view your project with Hiketracker components by following the [Get Up and Running](https://github.com/pattern-lab/patternlab-php#get-up-and-running) instructions.

To run testing tasks, we'll be using [Composer](https://getcomposer.org/), so you'll need to have it installed as well. Follow the [installation instructions](https://getcomposer.org/doc/00-intro.md).

### Node.js edition

We will use the [Gulp edition of Pattern Lab Node.JS](https://github.com/pattern-lab/edition-node-gulp). Download the latest pre-built zip file from the [project releases page](https://github.com/pattern-lab/edition-node-gulp/releases).

Once you have downloaded and extracted the zip file, open a terminal window and `cd` into the root of the project directory and run `npm install`. This will install Pattern Lab's NPM dependencies.

You will also need to import the demo starter kit. To do that, run these commands as [described in the project wiki](https://github.com/pattern-lab/patternlab-node/wiki/Importing-Starterkits):

```bash
npm install --save starterkit-mustache-demo
gulp patternlab:loadstarterkit --kit=starterkit-mustache-demo
```

Make sure you only do this on a new Pattern Lab project, as it will overwrite any patterns you have already created.

Finally, we'll be using Gulp to run our design tests. So, install the [gulp-galen](https://www.npmjs.com/package/gulp-galen) plugin:

```bash
npm install --save gulp-galen
```

You should now be able to run and view your project with `gulp patternlab:serve`.

### Installing Galen Framework globally

TODO

TODO - include creating a default Galen config file.

TODO - other requirements - Firefox, Webdriver implementations.

## Writing a design spec

Now that we have everything set up, we can write a design spec!

We _could_ write specs for atomic elements such as buttons and paragraphs, but as discussed in part 1 of this article, those are a good fit for visual regression tests, which we're not covering here. So let's look at testing a simple molecule: Hiketracker's primary navigation component.

We'll start by testing the component on Firefox at a 'desktop' viewport size of 1280 by 960 pixels.

Here is what we expect to see:

{% include figure.html
  src="/images/posts/current/primary-nav-molecule.png"
  alt="Hiketracker primary navigation molecule with four links arranged horizontally"
  border="true" %}

And here is the HTML structure:

```html
<nav id="nav" class="c-primary-nav">
  <ul class="c-primary-nav__list">
    <li class="c-primary-nav__item">
      <a href="#" class="c-primary-nav__link">About</a>
    </li>
    <li class="c-primary-nav__item">
      <a href="#" class="c-primary-nav__link">Blog</a>
    </li>
    <li class="c-primary-nav__item">
      <a href="#" class="c-primary-nav__link">Contact</a>
    </li>
    <li class="c-primary-nav__item">
      <a href="#" class="c-primary-nav__link">Login</a>
    </li>
  </ul>
</nav>
```

Despite the simplicity of this component, there are a number things we could check using Galen:

* that the height of the component is as expected
* that the nav items are aligned horizontally
* that the nav items spaced consistently

Because Galen inspects rendered DOM elements using Selenium, we need to know how the elements are structured in HTML and CSS. Using dev tools, we can see that the structure is an unordered list, with list items and anchors for the links. The links space out each item with padding of 16 pixels:

{% include figure.html
  src="/images/posts/current/primary-nav-molecule-metrics.png"
  alt="Hiketracker primary navigation molecule element metrics"
  border="true" %}

Let's write a spec to check the above.

### Test folder structure

First we need somewhere for our specs to live. We _could_ put specs alongside patterns in the _source/_patterns_ directory, but for the sake of simplicity in this tutorial, we'll create a dedicated directory structure for all our test stuff.

Create a _test_ directory at the top of the project with the following structure:

```
- test/
  - visual/
    - spec/
    - report/
```

We'll keep all of our Galen test files in the _visual_ directory to distinguish them from any other types of testing you might do.

### Creating the spec file

Now we can create our first spec file. We're going to name the file according to the identifier conventions that Pattern Lab uses for patterns. The reason for this will become clear when we come to test multiple patterns.

In the case of the primary navigation molecule, the pattern's full identifier is `01-molecules-navigation-primary-nav`. You can find this for yourself by looking at the URL that's used when you open a pattern in a new window from the cog icon in the top right.

Alternatively, you can construct the identifier yourself by using the format `[pattern-type-id]-[sub-pattern-type-id]-[pattern-name]`. Each identifier is simply an expansion of the path to the pattern from the _source/_patterns_ directory in your project.

Now that we have the identifier, create a new file at`_test/visual/spec/01-molecules-navigation-primary-nav.gspec_`. The _gspec_ suffix indicates that this is a Galen spec file.

### The structure of a spec file

Galen spec files are divided into two main sections: _object definitions_ and _object specs_.

First, _object definitions_ allow us to name DOM elements for use in the object specs. This is done by identifying elements using standard CSS selectors.

Here is our first object definition:

```
@objects
  nav       .c-primary-nav
```

The `@objects` directive tells Galen that what follows are object definitions. We then have a name / selector pair. Here, the _nav_ element corresponds to an element with a class of `c-primary-nav`. That's our top level `<nav>` element for the component.

The main part of the spec file is usually taken up by _object specs_. These describe the expectations we have and checks we want to make about the objects defined in the _object definitions_ section.

Here is our first very simple check of our _nav_ object:

```
= Main section =
  nav:
    height 56px
```

Easy, huh? The `= Main section =` line tells Galen that we're ready to start describing specs. Nested within this we then give the name of the element that we want to check – the 'nav' element. Nested within that is the check itself. In this case we want the nav element to be exactly 56 pixels in height.

Here is the our gspec file so far:

```
@objects
  nav       .c-primary-nav

= Main section =
  nav:
    height 56px
```

### Adding another check

That doesn't do much, so let's add another check. Apart from the overall height, we want to check that:

* each list item is horizontally aligned along the top and bottom
* the list items are right next to each other

First we need to add objects definitions for the list items. We could write these out individually, one for each list item. But fortunately Galen caters for element collections:

```
@objects
  nav       .c-primary-nav
    list    .c-primary-nav__list
    item-*  .c-primary-nav__item
```

We have added two new object definitions. Firstly the nav list, which corresponds to the `<ul>` element. This is nested inside the `nav` object, which means we need to reference it using `nav.list` in our object specs.

The second object definition is for the list item elements. Because there are four of them with the same CSS class, we can name them using a wildcard. Galen replaces the wildcard with an index so that it creates four objects named from `nav.item-1` to `nav.item-4`.

Let's use these new object definitions to check that each list item is inside the nav list element with no space at the top or bottom. We need to create a new object spec block:

```
nav.item-*:
  inside nav.list 0px top bottom
```

You can see how this can be read and understood by a human, but is also used by Galen to run checks against actual rendered components.

### About Galen's checks

This example also demonstrates one of Galen's relative positioning checks. In responsive web design, we are most interested in how elements are laid out relative to each other. Galen provides lots of powerful checks for relative positioning that range from specific to the extremely vague:

* Check the exact distance between two elements
* Check that an element is above, below, to the left or to the right of another, and by how much
* Check that an element is wholly inside, wholly outside, or overlapping another
* Check that two elements are aligned horizontally or vertically, and along what axis
* Check that an element is centered inside another
* Check if an element is 'near' another

Check out the [full range of checks available](http://galenframework.com/docs/reference-galen-spec-language-guide) on the Galen site.

## Running the spec

Here is the final spec file that we will test:

```
@objects
  nav       .c-primary-nav
    list    .c-primary-nav__list
    item-*  .c-primary-nav__item

= Main section =
  nav:
    height 56px

  nav.item-*:
    inside nav.list 0px top bottom
```

We could add more checks, but it's usually best to work in small chunks.

### Running a single spec from the terminal

We can run this spec against a single browser from the command line by using Galen's own `galen check` command.

First we need to have Pattern Lab running, so start it using `gulp patternlab:serve` for the Node.JS edition or `php core/console --server` for the PHP edition.

In another terminal session, run one of the below commands from the root of the project.

For PHP:

```bash
galen check test/visual/spec/01-molecules-navigation-primary-nav.gspec \
  --url "http://localhost:8080/patterns/01-molecules-navigation-primary-nav/01-molecules-navigation-primary-nav.html" \
  --size "1280x960" \
  --htmlreport "test/visual/report"
```

For Node.JS:

```bash
galen check test/visual/spec/01-molecules-navigation-primary-nav.gspec \
  --url "http://localhost:3000/patterns/01-molecules-navigation-primary-nav/01-molecules-navigation-primary-nav.rendered.html" \
  --size "1280x960" \
  --htmlreport "test/visual/report"
```

The PHP and Node.JS editions of Pattern lab differ in the URLs used for viewing bare pattern examples, so it is important to use the correct one. You can grab the URL for yourself by clicking the 'Open in new window' menu item from the settings dropdown in the Pattern Lab UI.

NB. The `\` backslash above is used to separate new lines in terminal commands. You should be able to paste the above commands into your terminal prompt as is.

Running this rather long command causes this sequence of events:

1. Galen outputs the location of the spec file and the full check command to the terminal,
2. Galen opens a Firefox window with a fresh profile at the viewport dimensions given by the `--size` flag,
3. Galen loads the page specified by the `--url` flag,
4. Once the page has loaded, it uses the Selenium WebDriver API to query elements on the page according to our spec,
5. Galen generates a test report in the directory specified by our `--htmlreport` flag.

By default, Galen will use Firefox to run tests against, because it comes with a WebDriver implementation built in.

### Opening and reading the test report

For each test run, Galen will generate a detailed report of test results if requested. We have asked for a human-readable HTML version, but it is also possible to export reports in JSON, jUnit and TestNG formats, which are more useful for integrating with a continuous integration server.

Open the command in your default browser with the command below, or just browse to the file from the browser's File / Open menu.

```bash
open test/visual/report/report.html
```

The main report page shows a summary of all specs run with an indicator of check pass and failure. In this case we only have one:

{% include figure.html
  src="/images/posts/current/report1-list.png"
  alt="Galen's main report page showing a list of specs and their pass / fail rate"
  border="true" %}

All the checks passed. We can click into the individual spec to see a full breakdown of individual checks carried out:

{% include figure.html
  src="/images/posts/current/report1-spec.png"
  alt="An individual spec report with passed specs expanded"
  border="true" %}

Finally, individual checks can also be clicked to show a screen grab of the elements being checked. Galen even adds a highlight around the relevant elements:

{% include figure.html
  src="/images/posts/current/report1-grab.png"
  alt="A screen grab of the primary nav component with checked elements highlighted"
  border="true" %}

From this, you should begin to see how the detailed nature of Galen's report output can be useful not just for debugging and investigating, but for documenting exactly what has been tested down to the finest detail.

Now it's time to get serious. In a real pattern library, we'll be testing a lot of patterns, so we need to organise the individual specs efficiently into a test suite. Let's do that next.

## Organising specs with a test suite

Galen provides a handy mechanism for running multiple specs – the test suite.

Let's create a test suite to run our existing primary navigation spec.

First, create a file at `test/visual/suite.test`. The _test_ suffix distinguishes Galen test suite files from individual spec files.

Our test suite file takes the place of the `galen check` command we used above, and so contains similar details. Again, the details vary slightly between Node.JS and PHP editions. Paste the relevant version into the `suite.test` file you just created.

For PHP:

```
Primary nav molecule
  http://localhost:8080/patterns/01-molecules-navigation-primary-nav/01-molecules-navigation-primary-nav.html  1280x960
    check spec/01-molecules-navigation-primary-nav.gspec
```

For Node.JS:

```
Primary nav molecule
  http://localhost:3000/patterns/01-molecules-navigation-primary-nav/01-molecules-navigation-primary-nav.rendered.html  1280x960
    check test/visual/spec/01-molecules-navigation-primary-nav.gspec
```

There are three lines to understand:

1. The name of the test to use in the report
2. The URL of the page to visit and the viewport dimensions to use
3. A check instruction with the path of the spec file to use

NB. Depending on how you run this test file, you may need to use the path from the working terminal directory (`test/visual/spec/...`) or relative to the location of the test file (`spec/...`). If it doesn't work one way, try the other.

To run our new test suite, we can use the `galen test` command, which is the same for both PHP and Node.JS versions of Pattern Lab:

```bash
galen test test/visual/suite.test --htmlreport "test/visual/report"
```

That's much simpler now as we've put most of the details into the test file. The test runs in much the same way as before.

Now that we have a test suite, we can look at more convenient ways of running it. At this point, we'll look at the PHP and Node.JS editions of Pattern lab separately. For PHP, we'll use Composer to run our test suite. For Node.JS, we'll use Gulp. Galen is not tied to either of these and can easily be integrated with most build tools.

### Running a test suite using Composer (PHP)

[Composer](https://getcomposer.org/) is a dependency manager for PHP, but can also be used to run scripts. The PHP edition of Pattern Lab 2 makes heavy use of Composer scripts during installation and as shortcuts for working with a project. For example, you can run `composer start` to start the Pattern Lab server with file watching.

To create a custom Composer script to run our Galen test suite, add the following script entry to the `"scripts"` object in the project `composer.json` file:

```json
{
  "scripts": {
    // Other scripts here
    "test": "galen test test/visual/suite.test --htmlreport test/visual/report"
  }
}
```

With that saved, you can now run `composer start` in one terminal session and then `composer test` in another. There may also be a nice way to set up a Composer script to start the server for you when you run the `test` command.

### Running a test suite using Gulp (Node.JS)

The Node.JS edition of Pattern Lab uses either Gulp or Grunt as a task runner. Fortunately, there are Galen plugins for both [Gulp](#TODO) and [Grunt](#TODO). You could also just run tests from an NPM script in a similar way to the Composer approach above.

Here we will focus on using Gulp. If you haven't already done so, make sure you have installed the _gulp-galen_ plugin with `npm install --save gulp-galen`. The plugin makes life a bit easier.

I advise creating a self-contained section at the bottom of your `gulpfile.js` so that you can easily merge in future updates to Pattern Lab. Even better, import your custom tasks into the main gulpfile.

First, we need to import the _gulp-galen_ plugin:

```javascript
var gulpGalen = require('gulp-galen');
```

Now we can create a test task:

```javascript
gulp.task('test:visual', function(done) {
  return gulp
    .src('test/visual/suite.test')
    .pipe(gulpGalen.test({
      'htmlreport': path.resolve(__dirname, 'test/visual/report/')
    }));
});
```

The _gulp-galen_ plugin works in the standard Gulp way. A _src_ file pattern (our test suite) is piped into a Galen _test_ function, which is passed any configuration we need. In this case, we set the path of the HTML report to write to.

To run this task, we need to have Pattern Lab running in another terminal session using `gulp patternlab:serve`.

Our test task can be run in another session using `gulp test:visual`. As before, Galen should run our checks in a Firefox session and produce a report.

We now have a test suite that runs with one simple command. We can use this suite as the basis for all our Pattern Lab tests. Now let's move on to running our spec at different viewport sizes.

## Running a spec at different viewport sizes

* Using a parameter table to repeat tests with different values
* Using a named table
* Adding tag sections with different checks
* Using a * section

## Running specs across browsers

* Webdriver implementations - chromedriver, safaridriver, ghostdriver, etc.
* Adding a second named parameter table for browsers

## Adding another spec

* Adding a spec for global header organism
* Using a third table for component names
* Absent / present checks
* Centering
* Ranges and approximate dimensions
* Importing global nav checks

## Testing pattern variants

* Why? Stress testing, state, etc
* Pattern Lab variants
* Testing variants

## Running tests quickly during development

* Why you want a separate dev task
* Creating another gulp-galen task (Node version)
* Creating another composer task (PHP version)
* Running tests in PhantomJS
* PhantomJS gotchas

## Other stuff you can do

* Test in the cloud using Selenium Grid / Browserstack / Sauce Labs
* Test as part of a CI job
* Functional testing
* Publish your test results
* VRT using Galen

## Which component types to test

* Atoms vs molecules vs organisms vs templates

## Limitations

* Browser coverage
* Speed

## Free files + free chapter download
