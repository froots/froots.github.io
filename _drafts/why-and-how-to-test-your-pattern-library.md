---
layout: "post"
title: "Why and How to Test Your Pattern Library"
subtitle: "Part 1: Testing Strategy"
date: "2016-09-07 09:36"
---

<div class="panel">
  <p>This is <strong>part 1</strong> of a two-part article and focuses on testing strategies for web pattern libraries.</p>
  <p>Part 2 will include a full tutorial of automated responsive design testing of a Pattern Lab project using Galen Framework. Coming soon!</p>
</div>

## Why test pattern libraries?

Pattern libraries have become a popular tool to maintain a clear and consistent experience across products.

There are two key deliverables of a pattern library:

1. Living documentation of elements and components, with examples, code samples and guidelines for use. This is usually a website.
2. HTML, CSS and/or JavaScript libraries that users can import into consuming projects for implementation.

Any given pattern library might add to these, but that's the bare minimum.

I believe that pattern library teams can use automated testing as a way to improve confidence, trust and acceptance of a design system. I'm going to show you how it is possible to link together pattern examples, specifications and tests in the same process.

But first, we need to understand the benefits of testing practices in a pattern library development workflow.

Of course, the main reason we perform testing is to improve and ensure the quality of a product. But it is worth looking at some of the other benefits of testing specific to pattern libraries.

### Prefer testing pattern examples over pattern instances

Pattern libraries provide a useful focus for cross-browser testing. It's much simpler and more efficient to [test canonical pattern examples]({% post_url 2015-08-01-test-your-design-system-not-your-website %}) than it is to test each instance of a pattern in use.

Patterns must be adaptable to a variety of contexts, but maintain consistency and quality across those contexts. Design system users such as designers and developers should not be forced to create new patterns for their own special cases. And they should not have to fix cross-browser bugs when they adopt patterns in their own projects.

So it is important that we explicitly test for the adaptability of patterns during development work. The best way to do this is to test by example. Documentation may only include one or two examples. But test examples may include a wider variety of contexts, states and content to exercise a pattern under different conditions.

### Testing demonstrates commitment to quality and trust

A [design system is a product](https://medium.com/eightshapes-llc/a-design-system-isn-t-a-project-it-s-a-product-serving-products-74dcfffef935) with other product teams as customers. So it is important to consider end-user objections to your product and work hard to remove them.

Another benefit of testing is that it enhances trust and commitment to the design system generally. Provided we demonstrate that it has actually been done.

If you can demonstrate to your customers that you have thoroughly tested your pattern library across a range of browsers and devices, they will love you. You just reduced their workload significantly.

Visible demonstrations of quality also encourage pattern users to stick to guidelines for using components. They know that any custom changes they make will need further testing on their part.

What's more, if a system user knows that any suggested changes to a pattern are well tested before release, they are more likely to go through the proper process for contributing back to a pattern library.

### Testing can speed up pattern library development

Healthy design systems are those that are in active use and that are improved over time. It helps to work on making the development and release process as efficient as possible.

Any system benefits from a repeated set of quality checks and steps to release and roll out changes. It is all the better if these tasks are automated as part of a continuous integration and continuous delivery process.

Having repeatable tests in place are essential for spotting regression errors. We know from experience that CSS is prone to unintended knock-on effects. This is why CSS architecture patterns and tooling have become fundamental to maintaining large-scale CSS code bases.

Design system teams can learn from agile software engineering practices here. Wouldn't it be great to be able to have your entire system tested, bundled, versioned, documented and deployed automatically?

## Current testing approaches have limitations

How are pattern libraries tested at the moment?

Automated testing has become popular in back-end software engineering and front-end JavaScript application development. It's common to see open source JavaScript projects publicly display current build status, test results, dependency status and more on their GitHub project home page.

{% include figure.html
  src="/images/posts/2016-09-08/bootstrap-status.png"
  alt="Bootstrap's status icons"
  caption="Bootstrap's status as displayed on the GitHub project page. The large browser matrix shows JavaScript unit test results run using SauceLabs. "
  credit_name="Bootstrap"
  credit_url="https://github.com/twbs/bootstrap" %}

Most public pattern libraries and design systems do not show much evidence of testing, automated or otherwise. Bootstrap's automated cross-browser tests only cover JavaScript. They don't include any design tests.

This makes it hard to get an idea of how teams go about testing. But the lack of visible evidence is probably due to current cross-browser testing practices and tooling.

### Manual testing is slow and tedious

It's a given that most web designers and developers consider manual cross-browser testing a necessary pain in the behind.

You can [improve your manual cross-browser testing practices]({% post_url 2016-08-15-31-ways-to-spend-less-time-on-manual-cross-browser-testing %}). But ultimately it is still a tedious and labour-intensive process.

Testing tools are useful to speed things up a git. For example,  [GhostLab](https://www.vanamco.com/ghostlab/) allows synchronised browsing. But as tools improve it is inevitable that more teams will turn to full automated testing where they can.

Manual testing is not self-documenting. Users have to take your word for it that you have tested thoroughly across target browsers and devices.

### Visual regression testing is faster but limited

Visual regression testing (VRT) has become a popular way to test for visual differences in web page elements over time.

Tools like [Wraith](https://github.com/BBC-News/wraith) and [PhantomCSS](https://github.com/Huddle/PhantomCSS) compare 'before' and 'after' screenshots to highlight differences between them. Some VRT tools can be used continuous integration servers to 'fail' a build if differences are found. But teams can also use them as a warning mechanism.

{% include figure.html
  src="/images/posts/2016-09-08/image-diff-example.png"
  alt="Example visual diff"
  caption="An example image regression test failure. It isn't always clear what the original intention of the design was, or what exactly has gone wrong. From "
  credit_name="WebdriverCSS"
  credit_url="https://github.com/webdriverio/webdrivercss" %}

Visual regression testing has its uses, but there are also limitations:

  * Keeping tests useful requires commitment from the team to review results and address problems.
  * Static image comparisons don't reflect the dynamic nature of modern responsive web design.
  * Images don't embody the intention of a design. When examining a failure, the reviewer often has to consult documentation or talk to someone else.
  * Many VRT tools don't allow tests to be run across different browsers or on mobile devices.
  * Responsive designs can amplify the above problems by markedly increasing the number of tests that need to be run.

Visual regression testing highlights when something has unintentionally changed in your design system. But working out what actually changed and what the fix should be still have to be done by people.

Is there a better approach we can take?

## The case for design specs

Most design systems embody some form of specification of how elements of the system should be constructed and used. These specs can determine typographic, layout or structural aspects.

Specs are present in all design systems, whether users realise it or not.

### Explicit vs. implicit specs

Specs can be explicit, as in the examples below from Google's material design documentation. Or, they can be implicit and abstracted away from users of a design system. On the web, this abstraction is achieved using CSS libraries.

{% include figure-full.html
  src="/images/posts/2016-09-08/material-design.png"
  alt=""
  caption="Examples of explicit layout specifications from Google's material design documentation. "
  credit_name="Material design"
  credit_url="https://material.google.com/" %}

In the past, design manuals were very detailed. Practical implementations of a design system were physically disconnected from the system itself. It had to be clear exactly how to execute a conforming product. Processes to check materials were a necessary addition to manuals and training to ensure adherence.

{% include figure-full.html
  src="/images/posts/2016-09-08/british-rail-typography.png"
  alt="An excerpt from the British Rail Corporate Identity manual, describing correct typographic usage"
  caption="A long-form description of correct typographic usage. On the web, we use CSS to encode these rules. From the British Rail Corporate Identity Manual. "
  credit_name="Double Arrow"
  credit_url="http://www.doublearrow.co.uk/"
  border="true" %}

With digital products, specifications can be more implicit. Instead of detailed documentation, a design system can enforce specifications directly through the artefacts of the system. These are typically CSS and JavaScript libraries and HTML templates.

A developer using a CSS library will not apply their own `padding: 16px` rule, but will apply grid classes to elements to conform to the specification.

### Validating specs

But how do pattern library maintainers demonstrate that the specifications are being followed as changes are made?

The current tools of manual cross-browser testing and VRT do not directly check adherence. Manual testers must consult specifications and check conformance by eye or by using dev tools (does anyone actually do this?)

Visual regression tests can only tell you that _something_ changed from one version of the code to another. They do not relate back to the intention of the design system or to a particular specification.

Wouldn't it be better if specifications joined up the process of designing, documenting and testing patterns?

### Specification by example

In system design, the idea that specifications can bring together team collaboration, communication, documentation and automated testing into one process is not a new one.

In software development, behavioural-driven development (BDD) embodies this idea. BDD aims to drive out agreed criteria for system behaviour through the development of human- and machine-readable specifications.

The same spec documents are used to describe system behaviour and to run automated tests of that behaviour. The end result is living documentation that is based on executable examples.

The [Cucumber](https://cucumber.io/) framework is the canonical tool for working in this way.

Below is an example of a Cucumber feature document. It uses the _Gherkin_ spec format, which is designed to be understood by humans and parseable by machines:

```
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

Automated tests can be run against this spec because Cucumber can parse the scenario's _Given_, _When_ and _Then_ statements into system interactions using _step definitions_.

The key point here is that the specification is used for system design discussions, validation and evergreen documentation.

{% include figure.html
  src="/images/posts/2016-09-08/cucumber.png"
  alt="Cucumber encompasses automated tests, living documentation and executable specifications"
  caption="Cucumber allows teams to encompass automated tests, executable specifications and living documentation of system behaviour within a single process. Original by "
  credit_name="Aslak Hellesøy"
  credit_url="https://cucumber.io/blog/2014/03/03/the-worlds-most-misunderstood-collaboration-tool" %}

The idea of demonstrating and validating by example sounds like a good fit for pattern library development, doesn't it?

### Can we take a specification-by-example approach with pattern libraries?

Unfortunately, there are few tools available that can fulfil these multiple roles of documentation and validation-by-example.

A few years ago now, Simone Madine created [Hardy](http://hardy.io/), a tool that actually uses Cucumber to create design specs and run tests. Unfortunately, the project is no longer actively maintained.

Another tool that is in active maintenance and has some maturity and a solid community around it is [Galen Framework](http://galenframework.com/). Galen uses a custom spec format but is extremely powerful.

In the second part of this article, I'll show you in detail how to use Galen Framework to write design specs and test a Pattern Lab project. But first, let's see what an automated pattern library design testing workflow looks like when using Galen Framework.

## How design specs are tested

### 1. Write a spec

Galen provides a custom human- and machine- readable spec format that is used to describe the layout and appearance of responsive designs.

Here's a simple design spec of a hero image component (large image and headline). We'll look at this again in part 2 of this article. For now, we're just interested the overall format.

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

At the top of the spec file, we define named elements using CSS selectors. These can then be used throughout to refer to elements by name.

We then group element checks by viewport size so that we can test differences across responsive breakpoints. The `*` group runs for all viewport sizes.

Within each viewport group, we can then provide the name of the element we want to check. Within each of these are the actual checks we want to carry out. Checks tend to focus on element dimensions or relative position compared to other elements in a component.

It should be obvious how different this approach is to visual regression testing. Galen's checks are not really English, but they are easy enough to read and understand what is expected.

### 2. Run tests against different browsers and devices

Galen tests are kicked off using a terminal command or task runner like Gulp or Grunt. Tests can be performed across a variety of browsers and devices. Browsers can be on our own machine or provided by browser testing services like [Browserstack](https://www.browserstack.com/) or [Sauce Labs](https://saucelabs.com/).

Below is a video of a Galen Framework test suite running on a Pattern Lab project on my development machine.

{% include youtube.html id="eaH4VqyDnvY" %}

### 3. Accommodate acceptable cross-browser differences

One of the continuing challenges for automated testing tools is cross-browser inconsistency. This is still a fact of life, despite the efforts of standardisation in recent years.

At some level, we must tolerate small differences in font rendering, positioning and layout. But we also want a testing system to tell us if dramatic differences appear.

This is one of the main challenges of visual regression testing. The tools often provide visual difference tolerance, but the values often need to be tweaked on a test-by-test basis.

Galen's spec format provides a few different ways to build in cross-browser tolerance. You can provide approximate or range values for dimensions, or you can just be vague about dimensions altogether. It's up to you how rigorous you want to be with your checks.

For example, you can just check that an element is _somewhere_ below another one, or that an element is _somewhere_ within another. This is a boon to modern web design where pixel perfection is impossible and consistency is not really about exact dimensions.

### 4. Review the test report

Once tests are complete, Galen generates a report site. It includes a summary table of test results, a detailed breakdown of every check performed and screen grabs highlighting tested elements.

{% include figure.html
  src="/images/posts/2016-09-08/report-list.png"
  alt=""
  caption="A Galen report showing a summary list of all specs run, along with an indicator showing how many checks passed and failed for each."
  credit_name=""
  credit_url=""
  border="true" %}

{% include figure.html
  src="/images/posts/2016-09-08/report-spec.png"
  alt=""
  caption="An individual spec report showing all checks run and highlighting failures"
  credit_name=""
  credit_url=""
  border="true" %}

{% include figure.html
  src="/images/posts/2016-09-08/report-screengrab.png"
  alt=""
  caption="A screen grab of an individual check, outlining the elements involved"
  credit_name=""
  credit_url=""
  border="true" %}

This report is useful to explore failures and fix bugs. But it can also be published as an extra source of documentation.

Exposing every check of every component on every browser is powerful stuff. It's a great way to demonstrate to design system users that they can implement your work without concern. It could also encourage outside contributions if your projects accepts them.

## A complete strategy for pattern library testing

Manual cross-browser testing, visual regression testing and executable design specs all have their place in a pattern library testing strategy. How can we best combine them?

### Manual testing

Manual testing is most useful while developing new components or exploring design ideas.

There are still cross-browser differences that may affect key decisions. For example, if a design system needs to support older browsers, it may limit the use of newer technologies like CSS flexbox. It's also common to use feature detection to provide different experiences to different browsers.

Manual testing is not so helpful where you need a quick test for regressions in existing work across a large pattern library. It can be slow, tedious and easy to miss problems.

### Visual regression testing

VRT is a useful tool during code refactoring where tests do not otherwise exist. If you want to retain look and feel while you modify CSS, VRT will provide smoke tests to spot any unintended changes.

It is also useful for small components and checks of static visual properties which are otherwise difficult to test automatically.

VRT is less helpful when testing responsive layouts across browsers, where it often becomes unwieldy to maintain. High-maintenance tests tend to get ignored or dropped.

### Design specification testing

Design specs are most useful when the design system direction and characteristics are mature. In other words, whenever we need to maintain long-term quality of the design system. Because of the time needed to write specs, they are best left until they are relatively stable.

Galen's emphasis on relative positioning checks makes automated cross-browser responsive layout testing viable. Spec-based tests are great for components that contain two or more elements, from a media object up to a complex template.

Design spec tests are also useful for testing components in different states and for ‘stress-testing’ components that can contain user-provided or CMS content that might break their layout.

And because Galen uses Selenium under the hood, it is possible to combine layout tests with functional testing if your pattern library includes interactive components.

### Pattern library testing strategy in brief

* Use visual regression tests for single elements, refactoring support and smoke testing
* Use cross-browser spec-based layout tests for checking relative layout in responsive components
* Use manual testing for early work, exploratory testing and difficult edge cases

## An example test strategy: atomic design

Brad Frost's [Atomic Design](http://atomicdesign.bradfrost.com/) encourages a bottom-up approach to interface design systems.

The process proceeds through individual elements (_atoms_), simple combinations (_molecules_), full components (_organisms_), entire page templates (er, _templates_. WTF Brad?) and finally full page examples with populated content.

Each type is a composite of the preceding component types. For example, an _image_ atom, _heading_ atom and _paragraph_ atom make up a _media object_ molecule.

Atomic Design is a fantastic way of breaking down thinking about user interfaces. It forces us to decouple design elements from each other.

This destructuring of complex components should be familiar to anyone who has used a test-driven design (TDD) approach when writing code. TDD encourages thinking about small units of code in isolation. TDD practitioners first write a test to specify the behaviour of small units. They then write code that implements that behaviour.

What could a design testing strategy for a pattern library based on atomic design look like?

### Atoms

Atoms are the smallest possible units of design and are usually a single DOM element.

Visual regression testing is most appropriate for atoms. It is possible to use Galen to check CSS properties of individual elements, but this is not Galen's intended purpose. Atoms often encompass purely visual characteristics such as colour, gradients and borders. These are well suited to visual regression checks.

When something changes, it won't be too much work to identify what has changed at such a low level.

### Molecules, organisms and templates

Molecules are composed of two or more atoms into a meaningful blob of functionality.

Organisms are more complex collections of atoms, molecules or other organisms that form a distinct section of a page. Both types might include glue elements that are not present in other components.

Templates correspond to a whole web page and articulate the overall content structure. Again, they can consist of organisms, molecules and atoms, but may also have some interstitial glue for layout.

Visual regression tests can be used for very simple molecules where visual characteristics are important.

When it comes to testing the layout of molecules, organisms and even templates, a spec-based approach is extremely valuable. It's often how elements behave in context with each other that is the cause of bugs in a pattern library.

Molecules and organisms are where much of the differences between responsive breakpoints take place, and it is important to exercise each unique layout during testing.

Generally speaking, it is better to test a component design at the lowest level at which it appears in the hierarchy. For example, testing the alignment of navigation items should be done as part of tests for a navigation list molecule rather than when testing a global header organism.

### Pages and other bits ‘n‘ bobs

Finally, manual testing will still be useful for quick checks during development and debugging and for investigating patterns in use in production sites. Atomic design considers example pages to be suitable for this purpose.

Exploratory manual tests of example pages are also useful. They can be used to find unexpected edge cases that may not have been discovered during component tests.

### A note about Pattern Lab

Pattern Lab is a great tool for creating a pattern library based on an atomic design approach. It can also be used as a target for automated testing. In part 2 of this article, I will show you how to get automated tests working with Pattern Lab and Galen Framework.

## Can your pattern library support testing?

Most pattern library tools should be able to support automated testing by example as described above. There are only three pre-requisites:

* Working examples can be viewed at one or more dedicated URLs
* Examples reflect changes made in underlying code
* Examples reflect real-world pattern usage

It is also useful, but not essential if your pattern library:

* allows components to be viewed at arbitrary viewport and container sizes
* allows examples to be created in different states
* allows examples to be created with custom content
* allows developers and continuous integration tools to run their own version of the site

Bear these in mind if you haven't yet chosen a tool. Check out [styleguides.io](http://styleguides.io/) for suggested tools. There are lots available!

## Summary

* Pattern library maintainers should test components to maximise users' trust and confidence in the design system
* Current approaches to testing pattern libraries are time-consuming or disconnected from implementation and documentation
* Executable design specs can provide cross-browser responsive layout testing and additional documentation
* A pattern library testing strategy should include a combination of manual testing, visual regression tests and spec-based tests
* Most pattern library tools are a good fit for automated testing, provided that example components can be viewed in a suitable context

## Coming soon: part 2!

In the second part of this article, I'll run through a full tutorial on using Galen Framework to test a Pattern Lab project. See you soon!
