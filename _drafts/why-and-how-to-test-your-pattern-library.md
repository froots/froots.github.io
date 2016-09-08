---
layout: "post"
title: "Why and How to Test Your Pattern Library"
subtitle: "Part 1: Testing Strategy"
date: "2016-09-07 09:36"
---

TODO: Intro
TODO: Re-position to use 'Acceptance testing' terms

## Why test pattern libraries?

* The purpose of pattern libraries

Pattern libraries have rightly become popular for web teams. They allow organisations to maintain consistency and clarity across their digital products.

Pattern libraries have two key deliverables:

1. A site that documents and demonstrates components and how they can be implemented
2. CSS and JavaScript libraries, and sometimes HTML templates that can be imported into consuming projects for implementation.

[Argue that first deliverable should include evidence of the quality of the library]

* Brad's diagram about how they are a product of a design system along with the production site

As Brad Frost has illustrated, the 'holy grail' of pattern library workflow (below) is involves making the design system the focus of design and development efforts in the long term. The pattern library is a product of that system, as are the production websites or other digital products that are based on it.

{% include figure-full.html
  src="/images/posts/2016-09-08/workflow-system-first.png"
  alt=""
  caption="In an ideal scenario, design and development work focuses on the design system first, and then pushes that out to a pattern library and consuming websites. Taken from "
  credit_name="Atomic Design by Brad Frost"
  credit_url="http://atomicdesign.bradfrost.com/chapter-5/" %}

* More practical to apply design tests to pattern library than large site

One of the many benefits of a pattern library is that it provides a great focus for cross-browser testing. It's far easier and more efficient to test a small number of canonical examples of components than it is to test every instance of a component across a number of websites.

* Visible commitment to quality and trust

Another benefit of testing is that it enhances trust in and commitment to the design system generally. A [design system is a product](#TODO) with designers and developers as end users. If you can demonstrate that components have been tested thoroughly across a range of browsers and devices, your end users will love you, because you just reduced their workload significantly. It also encourages them to stick to the recommended guidelines for using components if they know that those use cases have been thoroughly tested.

* Speed up development

If you can use automation in your pattern library testing, then you can also speed up your own workflow too. Just this week, the maintainers of Bootstrap have decided to stop working on small fixes to version 3, because the workload is keeping them from getting version 4 shipped. Each of these small fixes needs to be tested, and you can be sure that the work involved in manual testing those is not trivial.

## Existing approaches have limitations

* Manual testing is laborious and can miss problems

You can [improve your cross-browser testing practices](#todo) significantly, but ultimately it is still a tedious and labour-intensive process that is increasingly incompatible with the demands of modern release cycles. Tools like GhostLab for synchronised browsing or Browserstack for cloud-based browser testing are useful to speed things up a bit. But more teams are starting to turn to automated approaches.

* Visual regression testing is fast, but:

Visual regression testing has become a popular way to test for visual differences in appearance of a component over time. Tools like Wraith and PhantomCSS programmatically compare 'before' and 'after' screenshots of a component and highlight differences between them. They can even be integrated with continous integration tools to 'fail' a build if there are significant differences. But often teams use them just as a 'heads up' too.

{% include figure.html
  src="/images/posts/2016-09-08/image-diff-example.png"
  alt="Example visual diff"
  caption="An example image regression test failure. It isn't always clear what the original intention of the design was, or what exactly has gone wrong. From "
  credit_name="WebdriverCSS"
  credit_url="https://github.com/webdriverio/webdrivercss" %}

Visual regression testing has its uses, but there are also limitations:

  * Keeping tests useful requires commitment from the team to review results and address problems.
  * In the same way as static design mocks, static reference images don't  reflect the dynamic nature of modern responsive web design well
  * Static images don't embody the intention of a design. When examining a failure, the reviewer must bring this understanding with them by consulting documentation or talking to someone who does
  * Many VRT tools don't allow for tests to be run across different browsers, on mobile devices
  * Responsive designs can amplify the above problems by markedly increasing the number of tests that need to be run

So, are there any other automated design testing approaches we can take?

## The case for design specs

* Specs are often used in design systems
  * typography
  * layout
  * structure

Most design systems include some form of specification for how elements of the system should be used. These specs can determine typographic, layout or structural aspects.

* Example

For example, Google's Material Design manual includes these visual specifications of layout dimensions:

{% include figure-full.html
  src="/images/posts/2016-09-08/material-design.png"
  alt=""
  caption="Examples of layout specifications from Google's material design documentation. "
  credit_name="Material design"
  credit_url="https://material.google.com/" %}

It is up to pattern library authors to ensure that these specifications are met.

* How do we validate specs?
  * Enforce them by abstraction to a CSS pattern library

But how do we do that? If you are a consumer of a pattern library that provides CSS dependencies, the specifications are abstracted away from anyone using the library. A developer using this CSS library will not apply their own `padding: 16px` rule, but will apply a class to an element to conform to the specification. This is pretty much the whole point of having a shared CSS library.

* How do we validate them for pattern library owners?
  * Manual testing
  * VRT

But how do those whose role it is to maintain a pattern library validate that the specifications are being met in their output? Currently, it would seem that the most popular approaches are a combination of manual cross-browser testing and visual regression testing.

* These methods do not link documentation with testing

But these approaches do not explicitly link specifications with their validation, or even better, make them one and the same thing. This means that anyone performing manual testing or reviewing visual regression test failures must consult specifications to understand the problem.

* Cucumber and BDD example for functional testing

The idea that specifications can be used for team collaboration, communication, documentation and automated testing all in one is not new in system design. In software development, it is embodied by behavioural-driven development (BDD) and acceptance test-driven development (ATDD) approaches.

These practices aim to drive agreed acceptance criteria for system behaviour through human- and machine-readable specifications. The same document is used to discuss and document system behaviour and design and to run automated tests of that behaviour. The end result is living documentation that includes executable examples.

The [Cucumber](#todo) framework is the most popular tool for working in this way.

{% include figure.html
  src="/images/posts/2016-09-08/cucumber.png"
  alt="Cucumber encompasses automated tests, living documentation and executable specifications"
  caption="Cucumber allows teams to encompass automated tests, executable specifications and living documentation of system behaviour with a single process. Original by "
  credit_name="Aslak Hellesøy"
  credit_url="https://cucumber.io/blog/2014/03/03/the-worlds-most-misunderstood-collaboration-tool" %}

This should look and sounds very familiar. That's because system design approaches share common goals, whether a functioning application or a design system.

Why can't we take the same approach with design?

On the one hand, web design is inherently the design of change. We are encouraged to iterate and gradually improve designs so that they better serve the needs of users.

On the other hand, design systems seek to reign in variation of patterns across a site or suite of sites to provide familiarity and consistency for users.

Balancing these two concerns requires a workflow that can adapt quickly, but still enforce and foster consistency. Documentation that communicates the system *and* tests it in use would seem to be valuable.

* Design specs tend to be visual and exemplary, for good reason
* There are few tools available, but starting to emerge

There are not many tools around at the moment that can fulfill this multiple role. One that has gone under the radar, but has some maturity and a solid community around it is [Galen Framework](#todo).

In the second part of this article I'll show you in detail how to use Galen Framework to test a Pattern Lab project. But first, let's see what the automated responsive design testing workflow looks like.

## How design testing works

* Write a detailed spec, describing relative layouts at different viewport dimensions

Galen provides a custom human- and machine- readable spec format that provides a flexible way of describing the layout and appearance of responsive designs.

Here's a very simple design spec using Galen's spec syntax:

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

At the top, we can define named elements using CSS selectors. We then divide up tests by viewport dimensions so that we can test differences across responsive breakpoints. Most checks are concerned with element size or position relative to other elements.

* Run tests against different browsers and devices using Galen Framework

We can then check these specs across a variety of browsers and devices either on our own machine, or using browser testing services like Browserstack or Sauce Labs.

Here is a video of a test suite running on a Pattern Lab project on my development machine:

{% include youtube.html id="eaH4VqyDnvY" %}

* Build-in acceptable and known cross-browser tolerances and explicitly different experiences

One of the continuing challenges for automated testing tools is cross-browser inconsistency. At some level, we must tolerate small differences in font rendering, positioning and layout. But we also want a testing system to tell us if dramatic differences appear. This is one of the main objections to visual regression testing. The tools often provide visual difference tolerance, but the values often need to be tweaked on a test-by-test basis.

Galen's spec format provides a few different ways to build in cross-browser tolerance. You can provide approximate or range values for dimensions, or you can just be vague about dimensions altogether. For example, you can just check that an element is _somewhere_ below another one. This is boon to modern web design where pixel perfection is impossible and consistency is more than exact measurement.

* Report highlights failures and can also act as documentation of current system

Once tests are complete, Galen generates a report website that includes a summary table of all tests completed, and a detailed breakdown of every single check performed, along with screen grabs highlighting the elements in question.

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

This report is of course useful to explore failures and fix bugs, but it can also be useful to publish as an additional source of automated documentation. It describes every single specification you make about your system, and generates visual examples of components on every browser and device that you test on.

This is a great way to foster trust and confidence in your pattern library, and demonstrate to clients, users or other stakeholders that they can implement your work without concern.

## A complete strategy for pattern library testing

* VRT and spec-based tests have different purposes

Manual cross-brower testing, visual regression testing and spec-based layout tests all have their place in a solid pattern library testing strategy.

### Manual testing

Manual testing is great while you're developing new components or exploring design ideas. There are still cross-browser differences that may affect key decisions. For example, if your design system needs to support older browsers,  it may limit how you can use newer technologies like CSS flexbox. You might also use feature detection to provide certain features to users of newer browsers while providing a suitable fallback for older ones.

Manual testing is not so great where you need to quickly test for regressions in existing work across a large pattern library. It can be slow, tedious and easy to miss problems.

### Visual regression testing

VRT is a really useful tool during code refactoring where tests otherwise do not yet exist. If you want to keep an identical look and feel while you modify your CSS implementation, visual regression tools will provide a quick and easy smoke test of any unintended changes.

They are also useful for small components and checks of static visual properties. For example, the look and feel of buttons, icons and gradients.

VRT is less accommodating when testing responsive layouts across browsers, where it often becomes too unwieldy to be useful in the long term.

### Design specification testing

Design specs are most useful when the overall design system direction and characteristics are mature, in order to really bolt down the production quality of a pattern library. Galen's emphasis on relative checks between elements makes cross-browser responsive layout testing a breeze. So, specs are great for compound components like OOCSS's media object or a site header.

Because of this, design spec tests are also useful for testing components in different states and for 'stress-testing' components that can contain user-provided or CMS content.

Finally, because Galen uses Selenium under the hood, it is relatively easy to combine layout tests with functional testing if your pattern library includes interactive components.

## The example of Atomic Design

Brad Frost's Atomic Design approach encourages a bottom-up approach to creating interface design systems. It starts with individual elements ('atoms'), through simple combinations ('molecules'), full components ('organisms') and entire page templates (er, 'templates'. WTF Brad?) and page examples.

Each type is a composite of previous components. So an _image_ atom, _heading_ atom and _paragraph_ atom can make up a _media object_ molecule.

Atomic Design is a fantastic way of breaking down thinking about user interfaces, because it forces us to decouple design elements from each other. This isolation provides a great onramp for testing, because you can focus on isolated components, and on their context within other larger components. You can test an individual button, or you can test an entire web page.

What could a testing strategy for a pattern library based on atomic design look like?

We've seen how visual regression testing is most appropriate for small elements and checking purely visual characteristics, so using those for checking atoms like buttons, list items, paragraphs and icons seems appropriate. When something changes, it won't be too much work to identify what has changed at such a low level.

A spec-based tool that focuses more on relative element positioning and dimensions is perfect for molecules, organisms and even templates. It's often how elements behave in context with each other that causes the bugs in a pattern library. Galen Framework can make different checks at different viewport sizes, so you can directly test a component's responsive behaviour.

Finally, manual testing will still be useful for quick checks during development and debugging and for investigating patterns in use in production sites. Exploratory manual tests of example pages are also useful to find unexpected edge cases.

## Can your pattern library support testing?

  * Only requirement is working examples available at consistent URLs

Most pattern library tools should be able to support automated testing as described here, for the simple reason that most tools:

* Provide working examples at one or more dedicated URLs
* Update those examples automatically when code is changed

That's really all you need. If your pattern library can do that you can test it.

It's also useful if your tool:

* reflects real-world pattern usage closely
* allows components to be viewed at arbitrary viewport and container sizes
* allows component examples to be created in different states
* allows component examples to be created with custom content
* allows continuous integration tools to generate their own version of the site

Bear these in mind if you haven't yet chosen a tool. Check out [styleguides.io](#todo) for suggested tools

## Summary

* A pattern library should be tested thoroughly to maximise confidence and trust
* Current approaches to testing pattern libraries are time consuming or disconnected from the intention of the design system
* Executable design specs can provide cross-browser responsive layout testing and additional documentation
* A pattern library testing strategy could include a combination of manual testing, visual regression testing and spec-based tests
* Most pattern library tools will allow automated testing, provided they generate a URL that you can visit to test components in an appropriate context

## Part 2

In the second part of this article, I'll run through a full tutorial of using Galen Framework to test a Pattern Lab project.
