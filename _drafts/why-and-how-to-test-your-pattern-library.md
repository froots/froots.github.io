---
layout: "post"
title: "Why and How to Test Your Pattern Library"
subtitle: "Part 1: Testing Strategy"
date: "2016-09-07 09:36"
---

<div class="panel">
  <p>This is <strong>part 1</strong> of a two-part article and focuses on testing strategies for web pattern libraries.</p>
  <p>Part 2 (coming soon) will include a full tutorial of automated responsive design testing of a Pattern Lab project using Galen Framework.</p>
</div>

## Why test pattern libraries?

Pattern libraries have rightly become a popular tool for maintaining consistency and clarity across an organisation's digital products.

There are two key deliverables of a pattern library:

1. Living documentation of elements and components, with examples, code samples and guidelines for use. This is usually a website.
2. HTML, CSS and/or JavaScript libraries that can be imported into consuming projects for implementation.

Any given pattern library might add to these, but that's the bare minimum.

In this article I argue that pattern library maintainers can improve confidence, trust and acceptance of a design system by adding automated testing based on executable design specifications.

But first, we need to understand the benefits of testing practices in a pattern library development workflow.

Most obviously, testing is done to improve end product quality, but it is worth looking at some of the other benefits of testing specific to pattern libraries.

### It is more practical to test pattern examples than pattern instances

Pattern libraries provide a useful focus for cross-browser testing. It's far simpler and efficient to [test a small number of canonical pattern examples]({% post_url 2015-08-01-test-your-design-system-not-your-website %}) than it is to test every instance of a pattern in use across a variety of websites.

Patterns must be adaptable to a variety of contexts, but maintain consistency and quality across those contexts. Design system users such as designers and developers should not be forced to make special cases or fix cross-browser bugs when they adopt patterns in their own projects

So it is important that we explicitly test for adaptability in our pattern library development work. The best way to do this is to test by example. While documentation may only include one or two examples, test examples may include a wider variety of contexts, content and state to fully exercise a pattern under different conditions.

### Testing demonstrates commitment to quality and trust

A [design system is a product](https://medium.com/eightshapes-llc/a-design-system-isn-t-a-project-it-s-a-product-serving-products-74dcfffef935) with other product teams as customers. It is therefore important to consider end user objections to your product, and work hard to remove them.

Another benefit of testing is that it enhances trust in, and commitment to, the design system generally. That is, provide we actually demonstrate that it has been done.

If you can openly demonstrate to your customers that your pattern library has been tested thoroughly across a range of browsers and devices, they will love you, because you just reduced their workload significantly. Bootstrap wouldn't be nearly as popular as it is if there were a heap of cross-browser issues to fix on every project it was applied to.

Visible demonstrations of quality also encourage pattern users to stick to recommended guidelines for using components. They know that any custom changes they make will require further testing on their part.

What's more, if a system user knows that any suggested changes to a pattern are going to be thoroughly tested before being made available, they are more likely to go through the proper process for contributing back to a pattern library.

### Testing can speed up pattern library development

Healthy design systems are those that are in active use and that are iteratively improved over time. It helps to work on making the development and release process as efficient as possible.

Any system can benefit from a repeated set of quality checks and steps to release and roll out changes. It is all the better if these tasks are automated as part of a continuous integration and continuous delivery process.

Having repeatable tests in place are essential for quickly spotting regression errors. We know from experience that CSS is particularly prone to unintended knock-on effects, which is why CSS architecture patterns and tooling have become fundamental to maintaining large scale CSS code bases.

Design system teams can benefit from agile software engineering practices here. Wouldn't it be great to be able to have your entire system tested, bundled, versioned, documented and deployed automatically without having to handle these steps manually?

## Current testing approaches are limited

How are pattern libraries typically tested at the moment?

Automated testing has become popular in back-end software engineering, and to a lesser extent front-end JavaScript application development. It's common to see open source JavaScript projects publicly display current build status, test results, dependency status and more on their GitHub project home page.

{% include figure.html
  src="/images/posts/2016-09-08/bootstrap-status.png"
  alt="Bootstrap's status icons"
  caption="Bootstrap's status as displayed on the GitHub project page. The large browser matrix shows JavaScript unit test results run using SauceLabs. "
  credit_name="Bootstrap"
  credit_url="https://github.com/twbs/bootstrap" %}

Most public pattern libraries and design systems do not show this level of evidence of testing, automated or otherwise. Bootstrap's automated cross-browser tests are limited to JavaScript unit tests, and don't include any design tests.

This makes it hard to get an idea of how teams go about testing. This lack of visible evidence is most likely due to current cross-browser testing practices and tooling.

### Manual testing is slow and tedious

It's a given that most web designers and developers consider manual cross-browser testing a necessary pain in the behind.

You can [improve your manual cross-browser testing practices]({% post_url 2016-08-15-31-ways-to-spend-less-time-on-manual-cross-browser-testing %}) significantly, but ultimately it is still a tedious and labour-intensive process.

Tools like [GhostLab](https://www.vanamco.com/ghostlab/) for synchronised browsing or [Browserstack](https://www.browserstack.com/) for cloud-based browser testing are useful to speed things up a bit. But as tools improve it is inevitable that more teams will turn to automated testing where they can.

### Visual regression testing is faster but limited

Visual regression testing (VRT) has become a popular way to test for visual differences in appearance of web page elements between code changes.

Tools like [Wraith](https://github.com/BBC-News/wraith), [PhantomCSS](https://github.com/Huddle/PhantomCSS) and others programmatically compare 'before' and 'after' screenshots of a component and highlight differences between them. Some VRT tools can be integrated with continuous integration servers to 'fail' a build if there are significant differences. But teams often use them just as a 'heads up' warning.

{% include figure.html
  src="/images/posts/2016-09-08/image-diff-example.png"
  alt="Example visual diff"
  caption="An example image regression test failure. It isn't always clear what the original intention of the design was, or what exactly has gone wrong. From "
  credit_name="WebdriverCSS"
  credit_url="https://github.com/webdriverio/webdrivercss" %}

Visual regression testing has its uses, but there are also limitations:

  * Keeping tests useful requires commitment from the team to review results and address problems.
  * In the same way as static design mocks, static image comparisons don't  reflect the dynamic nature of modern responsive web design
  * Images don't embody the intention of a design. When examining a failure, the reviewer must bring this understanding with them by consulting documentation or talking to someone who does
  * Many VRT tools don't allow for tests to be run across different browsers or on mobile devices
  * Responsive designs can amplify the above problems by markedly increasing the number of tests that need to be run

Ultimately, visual regression testing merely highlights when something has unintentionally changed in your design system. Determining whether that is a problem, what caused that problem, and what an appropriate fix would be is still something that must be done by people.

Is there a better approach we can take?

## The case for design specs

Most design systems embody some form of specification of how elements of the system should be constructed and used. These specs can determine typographic, layout or structural aspects.

Specs are present in all design systems, whether users realise it or not.

### Explicit vs implicit specs

Specs can be explicit, as in the examples below from Google's material design documentation. Or, they can be implicit and abstracted away from users of a design system, using technologies like CSS.

{% include figure-full.html
  src="/images/posts/2016-09-08/material-design.png"
  alt=""
  caption="Examples of explicit layout specifications from Google's material design documentation. "
  credit_name="Material design"
  credit_url="https://material.google.com/" %}

In the past, design manuals were extremely detailed because practical implementations of a design system were physically disconnected from them. It had to be clear exactly how to execute a conforming product. Processes to check materials were necessary in addition to manuals and training in order to ensure adherence.

{% include figure-full.html
  src="/images/posts/2016-09-08/british-rail-typography.png"
  alt="An excerpt from the British Rail Corporate Identity manual, describing correct typographic usage"
  caption="A long-form description of correct typographic usage. On the web, we use CSS to encode these rules. From the British Rail Corporate Identity Manual. "
  credit_name="Double Arrow"
  credit_url="http://www.doublearrow.co.uk/" %}

With digital products, a design system can enforce adherence to specifications directly through the artifacts of the system, such as CSS libraries.

A developer using a CSS library will not apply their own `padding: 16px` rule, but will apply grid classes to elements to conform to the specification. This is pretty much the whole point of having a shared CSS library.

### Validating specs

But how do pattern library maintainers validate and demonstrate that the specifications are being adhered to as changes are made?

The current tools of manual cross-browser testing and VRT are detached from specifications. Manual testers must consult specifications and check conformance by eye or by using dev tools (does anyone actually do this?)

Visual regression tests can only tell you that _something_ changed from one version of the code to another. They do not relate back to the intention of the design system.

Wouldn't it be better if specifications somehow tied the process of designing, documenting and testing patterns together?

### Specification by example

The idea that specifications can be used for team collaboration, communication, documentation and automated testing all in one is not new in system design.

In software development, it is embodied by behavioural-driven development (BDD) approach. This practice aims to drive out agreed criteria for correct system behaviour through the development of human- and machine-readable specifications.

The same spec document is used to discuss and document system behaviour within a team, and to run automated tests of that behaviour. The end result is living documentation that is based on executable scenarios or examples of correct behaviour.

The [Cucumber](https://cucumber.io/) framework is the canonical tool for working in this way.

Here is an example of Cucumber feature document. It uses the _Gherkin_ spec format, which is designed to be easily understood by humans and parseable by machines:

```cucumber
Feature: Serve coffee
  Coffee should not be served until paid for
  Coffee should not be served until the button has been pressed
  If there is no coffee left then money should be refunded

Scenario: Buy last coffee
  Given there are 1 coffees left in the machine
  And I have deposited 1$
  When I press the coffee button
  Then I should be served a coffee
```

Automated tests can be run using this spec format, because a Cucumber can parse the scenario's _Given_, _When_ and _Then_ statements into real application interactions using _step definitions_.

The key point here is that the specification is used for system design discussions, validation and evergreen documentation.

{% include figure.html
  src="/images/posts/2016-09-08/cucumber.png"
  alt="Cucumber encompasses automated tests, living documentation and executable specifications"
  caption="Cucumber allows teams to encompass automated tests, executable specifications and living documentation of system behaviour within a single process. Original by "
  credit_name="Aslak Hellesøy"
  credit_url="https://cucumber.io/blog/2014/03/03/the-worlds-most-misunderstood-collaboration-tool" %}

The idea of demonstrating and validating by example sounds like a good fit for pattern library development, doesn't it?

### Can we take a specification-by-example approach with pattern libraries?

There are not many tools around at the moment that can fulfill this multiple role of documentation and validation by example.

Simone Madine created [Hardy](http://hardy.io/), a tool that actually uses Cucumber to create design specs and run tests. Unfortunately, the project is no longer actively maintained.

One that has gone under the radar, but has some maturity and a solid community around it is [Galen Framework](http://galenframework.com/). Galen uses a custom spec format, but is extremely powerful.

In the second part of this article I'll show you in detail how to use Galen Framework to write design specs and test a Pattern Lab project. But first, let's see what an automated pattern library design testing workflow looks like when using Galen Framework.

## How design specs are tested

### 1. Write a spec

Galen provides a custom human- and machine- readable spec format that provides a flexible way of describing the layout and appearance of responsive designs.

Here's a simple design spec of a hero image block (image and headline) using Galen's spec syntax that we'll look at again in part 2 of this article.

```
@objects
  blockHero   .c-block-hero
    image     .c-block-hero__img
    headline  .c-block-hero__headline

= Main section =
  @on *
    blockHero:
      width 100% of viewport/width

    blockHero.image:
      inside blockHero 0px top left right

  @on small
    blockHero.headline:
      below blockHero.image 0px
      aligned vertically left blockHero.image

  @on medium, large
    blockHero:
      # Max height is 50% of viewport
      height 50% of viewport/height

    blockHero.image:
      inside blockHero 0px top left bottom right

    blockHero.headline:
      inside blockHero ~48px top, ~16px left
      width 50% of blockHero/width
```

And here is the visual representation of that component at small viewport dimensions:

{% include figure.html
  src="/images/posts/2016-09-08/block-hero-sm.png"
  alt=""
  caption="Hero block at small viewport dimensions"
  credit_name=""
  credit_url="" %}

{% include figure.html
  src="/images/posts/2016-09-08/block-hero-lg.png"
  alt=""
  caption="Hero block at large viewport dimensions"
  credit_name=""
  credit_url="" %}

At the top of the spec, we define named elements using CSS selectors. These can then be used throughout to refer to elements by name.

We then group element checks by viewport size (these are specified elsewhere and are totally custom) so that we can test differences across responsive breakpoints. The `*` group runs for all viewport sizes.

Within each viewport group, we can then provide an element, and one or more checks to perform on that element. Checks tend to focus on element dimensions or relative position compared to other elements in a component.

It should be obvious how different this approach is to visual regression testing.

### 2. Run tests against different browsers and devices

Using a terminal command or a task runner like Gulp or Grunt, we can then check these specs across a variety of browsers and devices. Browsers can be on our own machine or provided by browser testing services like [Browserstack](https://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/).

Below is a video of a Galen Framework test suite running on a Pattern Lab project on my development machine.

{% include youtube.html id="eaH4VqyDnvY" %}

### 3. Accommodate acceptable cross-browser differences

One of the continuing challenges for automated testing tools is cross-browser inconsistency. This is still a fact of life, despite the efforts of standardisation in recent years.

At some level, we must tolerate small differences in font rendering, positioning and layout. But we also want a testing system to tell us if dramatic differences appear.

This is one of the main challenges of visual regression testing. The tools often provide visual difference tolerance, but the values often need to be tweaked on a test-by-test basis.

Galen's spec format provides a few different ways to build in cross-browser tolerance. You can provide approximate or range values for dimensions, or you can just be vague about dimensions altogether. It's up to you how rigorous you want to be with your checks.

For example, you can just check that an element is _somewhere_ below another one, or that an element is _somewhere_ within another. This is boon to modern web design where pixel perfection is impossible and consistency is not really about exact dimensions.

### 4. Review the test report

Once tests are complete, Galen generates a report website that includes a summary table of all tests completed, a detailed breakdown of every single check performed and screen grabs highlighting tested elements.

{% include figure-full.html
  src="/images/posts/2016-09-08/report-list.png"
  alt=""
  caption="A Galen report showing a summary list of all specs run, along with an indicator showing how many checks passed and failed for each."
  credit_name=""
  credit_url=""
  border="true" %}

{% include figure-full.html
  src="/images/posts/2016-09-08/report-spec.png"
  alt=""
  caption="An individual spec report showing all checks run and highlighting failures"
  credit_name=""
  credit_url=""
  border="true" %}

{% include figure-full.html
  src="/images/posts/2016-09-08/report-screengrab.png"
  alt=""
  caption="A screen grab of an individual check, outlining the elements involved"
  credit_name=""
  credit_url=""
  border="true" %}

This report is useful to explore failures and fix bugs but it can also be published as an additional source of documentation.

The report documents every single check you make about your system, and generates visual examples of components on every browser and device that you test on.

This is a great way to foster trust and confidence in your pattern library, and demonstrate to clients, users or other stakeholders that they can implement your work without concern.

What's more, if a developer outside the design system team comes across a bug in the pattern library, they can consult the latest test report to see how that component is currently tested. Your library project may even allow outside contributions, and visible tests like these could encourage contributions that include good test coverage.

## A complete strategy for pattern library testing

Manual cross-brower testing, visual regression testing and executable design specs all have their place in a solid pattern library testing strategy. How can we best combine them?

### Manual testing

Manual testing is most useful while developing new components or exploring design ideas.

There are still cross-browser differences that may affect key decisions. For example, if a design system needs to support older browsers, it may limit the use of newer technologies like CSS flexbox. It's also common to use feature detection to provide different experiences to different browsers.

Manual testing is not so helpful where you need to quickly test for regressions in existing work across a large pattern library. It can be slow, tedious and easy to miss problems.

### Visual regression testing

VRT is a useful tool during code refactoring where tests do not otherwise exist. If you want to keep an identical look and feel while you modify your CSS implementation, visual regression tools will provide a quick and easy smoke test of any unintended changes.

They are also useful for small components and checks of static visual properties which are otherwise difficult to test. For example, buttons, icons and gradients. These can all be documented by example within a pattern library.

VRT is less accommodating when testing responsive layouts across browsers, where it often becomes too unwieldy to be useful in the long term.

### Design specification testing

Design specs are most useful when the overall design system direction and characteristics are mature. In other words, whenever we need to maintain long term quality of the design system. Because of the time needed to write specs, they are best deferred until they are relatively stable.

Galen's emphasis on relative checks between elements makes automated cross-browser responsive layout testing much more viable. Because of this focus on positioning and dimensions, spec-based tests are great for components that contain two or more elements, from a media object up to a complex template.

Design spec tests are also useful for testing components in different states and for ‘stress-testing’ components that can contain user-provided or CMS content.

And because Galen uses Selenium under the hood, it is possible to combine layout tests with functional testing if your pattern library includes interactive components.

### Pattern library testing strategy in brief

* Use visual regression tests for single elements, refactoring support and smoke testing
* Use cross-browser spec-based layout tests for checking relative positions and dimension of elements in responsive components
* Use manual testing for immature designs, exploratory testing and anything else not covered by VRT and spec-based tests

## An example focusing on atomic design

Brad Frost's [Atomic Design](http://atomicdesign.bradfrost.com/) approach encourages a bottom-up approach to creating interface design systems.

The process proceeds through individual elements (_atoms_), simple combinations (_molecules_), full components (_organisms_), entire page templates (er, _templates_. WTF Brad?) and finally page examples with fully populated content.

Each type is a composite of preceding component types. For example, an _image_ atom, _heading_ atom and _paragraph_ atom make up a _media object_ molecule.

Atomic Design is a fantastic way of breaking down thinking about user interfaces, because it forces us to decouple design elements from each other.

This destructuring of complexity to simpler individual pieces should be familiar to anyone who has taken a test-driven design (TDD) approach to writing code. TDD encourages thinking about small units of code in isolation, and tests are written to document and specify the behaviour of small units before the code that implements that behaviour.

What could a design testing strategy for a pattern library based on atomic design look like?

### Atoms

Atoms are the smallest possible units of design, and usually correspond to a single DOM element.

We've seen how visual regression testing is most appropriate for small elements and checking purely visual characteristics, so using those for checking atoms like buttons, list items, paragraphs and icons seems appropriate.

When something changes, it won't be too much work to identify what has changed at such a low level.

### Molecules, organisms and templates

Molecules are composed of two or more atoms into a meaningful blob of functionality.

Organisms are more complex collections of atoms, molecules or other organisms that form a distinct section of a page. Both types might include glue elements for layout purposes that are not present in other components.

Templates correspond to a whole web page and articulate the overall content structure. Again, they can consist of organisms, molecules and atoms, but may also have some interstitial glue for layout.

Visual regression tests could be used for very simple molecules where visual characteristics are important. For example, a list component that includes a gradient background.

However, when it comes to testing cross-browser layout of molecules, organisms even templates, a spec-based approach is extremely valuable. It's often how elements behave in context with each other that causes the bugs in a pattern library.

Molecules and organisms are where much of the differences between responsive breakpoints take place, and it is important to exercise each unique layout during testing.

Generally speaking, it is better to test a component design at the lowest level at which it appears in the hierarchy. For example, testing the alignment of navigation items should be done as part of tests for a navigation list molecule rather than when testing a global header organism.

### Pages and other bits'n'bobs

Finally, manual testing will still be useful for quick checks during development and debugging and for investigating patterns in use in production sites. Atomic design considers example pages that are suitable for this purpose.

Exploratory manual tests of example pages are also useful to find unexpected edge cases that may not have been discovered during component example tests.

### A note about Pattern Lab

Pattern Lab is a great tool for creating a pattern library based on an atomic design approach, and it is also a great framework for automated testing. In part 2 of this article I will show you how to get automated tests working with Pattern Lab and Galen Framework.

## Can your pattern library support testing?

Most pattern library tools should be able to support automated testing by example as described above. There are only three pre-requisites that a library needs:

* It provides working examples at one or more dedicated URLs
* Examples reflect changes made in underlying code
* Examples reflect real-world pattern usage

It is also useful, but not essential if your pattern library:

* allows components to be viewed at arbitrary viewport and container sizes
* allows examples to be created in different states
* allows examples to be created with custom content
* allows developers and continuous integration tools to run their own version of the site

Bear these in mind if you haven't yet chosen a tool. Check out [styleguides.io](http://styleguides.io/) for suggested tools. There are lots available!

## Summary

* Pattern library maintainers should be testing components thoroughly to maximise users' trust and confidence in the design system
* Current approaches to testing pattern libraries are time consuming or disconnected from implementation and documentation
* Executable design specs can provide cross-browser responsive layout testing and additional documentation
* A pattern library testing strategy includes an appropriate combination of manual testing, visual regression testing and spec-based tests
* Most pattern library tools can accommodate automated testing, provided they generate a URL that you can visit to test example components in an appropriate context

## Coming soon: part 2!

In the second part of this article, I'll run through a full tutorial of using Galen Framework to test a Pattern Lab project. See you soon!
