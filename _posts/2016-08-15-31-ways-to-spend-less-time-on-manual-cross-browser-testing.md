---
layout: post
title: 31 Ways to Spend Less Time on Manual Cross–Browser Testing
date: '2016-08-15 09:16'
description: >-
  We all know that manual cross–browser and device testing saps our time and
  energy. But we don’t make a conscious effort to improve the situation. Here
  are some strategies and tips for reducing the pain of manual browser testing.
twitter_card:
  type: summary_large_image
  image: /images/posts/2016-08-15/corbusier-og.jpg
og_data:
  image: /images/posts/2016-08-15/corbusier-og.jpg
promo: ardt
---

Manual cross–browser testing can be a __big drag on time and energy__. It’s tedious to check every page of your site or app across breakpoints, and on a growing list of desktop browsers and mobile devices.

<figure class="figure figure--full">
  <img class="figure__image" src="/images/posts/2016-08-15/corbusier.jpg" alt="Unité d'Habitation by le Corbusier">
  <figcaption class="figure__caption">Photo: <a href="https://flic.kr/p/dSgGU4">Radomir Cernoch</a></figcaption>
</figure>

How often do issues show up in your live site that the testing process should have spotted?

It’s easy to see why many teams and individuals don’t do as much testing as they feel they should. Manual testing is often done in an __informal, unplanned and scattergun__ fashion. It depends on team members to motivate themselves to do it, and on the availability of the right browsers and devices.

And when bugs do get missed, everybody feels bad. Or worse, __a blame game ensues__. You might say to yourself that you need to do _more_ testing, if only you could work out how with the time you have available.

Like all good humans, though, we would prefer to spend _less_ time on repetitive tasks. They key is to make testing more efficient.

Below is a list of some ways that you can __improve your cross–browser testing__ to make it more efficient. Whether you are part of a big team responsible for a portfolio of large sites, or an individual working on a pet project, I hope you find something you can use.

All the tips in one place:

1. [Use established techniques](#use-established-techniques)
2. [Use a framework (maybe)](#use-a-framework-maybe)
3. [Use fewer breakpoints](#use-fewer-breakpoints)
4. [Keep the design simple](#keep-the-design-simple)
5. [Limit complex interactions](#limit-complex-interactions)
6. [Re-use and reduce components](#re-use-and-reduce-components)
7. [Use a test harness](#use-a-test-harness)
8. [Test your style guide](#test-your-style-guide)
9. [Use consistent sample content](#use-consistent-sample-content)
10. [Create a browser support policy](#create-a-browser-support-policy)
11. [Create a testing policy](#create-a-testing-policy)
12. [Focus on difficult browsers](#focus-on-difficult-browsers)
13. [Don’t repeat yourself](#dont-repeat-yourself)
14. [Adopt a targeted testing plan](#adopt-a-targeted-testing-plan)
15. [Create test scripts](#create-test-scripts)
16. [Test many browsers at once](#test-many-browsers-at-once)
17. [Use hosted browsers and devices](#use-hosted-browsers-and-devices)
18. [Use a device lab](#use-a-device-lab)
19. [Use code linters](#use-code-linters)
20. [Use a CSS prefix tool](#use-a-css-prefix-tool)
21. [Profile your CSS](#profile-your-css)
22. [Get into the early testing habit](#get-into-the-early-testing-habit)
23. [Little and often, not everything all at once](#little-and-often-not-everything-all-at-once)
24. [Write unit tests](#write-unit-tests)
25. [Test your website as a human would](#test-your-website-as-a-human-would)
26. [Automatically compare screen grabs](#automatically-compare-screen-grabs)
27. [Automate testing against a spec](#automate-testing-against-a-spec)
28. [Test automatically when anything changes](#test-automatically-when-anything-changes)
29. [Hire a professional](#hire-a-professional)
30. [Include your testers in the development process](#include-your-testers-in-the-development-process)
31. [In-source testing](#in-source-testing)

---

## Make testing less important

A great way to do less manual testing is to make it less important. The complexity of your project can determine the complexity of testing it. So, __a simple approach can pay dividends__ in the long run.

These tips can be difficult to introduce for established projects, so if you’re starting on something new, get them in early.

### 1. Use established techniques

On a new project, you might be tempted to use a slew of emerging browser capabilities. You will often need to use [feature detection ][1] so that visitors with older browsers [get a usable fallback][2]. This means that you need to test the same feature across browsers with different expectations of what is correct.

It can be easy to get __carried away using the latest tech__, but a significant part of your [audience][3] may be using older, less capable browsers. Sometimes it is better to use a well-established approach for everybody.

By using newer browser features with inconsistent support, you are deliberately introducing cross–browser variation. We know from the Browser Wars of the 1990s that this comes at a cost.

Pick the technologies you use with care. Restrict your choice of newer features to those that will have the __biggest net benefit to the user__.

Links:

* [Feature, Browser, and Form Factor Detection: It's Good for the Environment][1] — HTML5 Rocks
* [Modernizr][2] — Feature detection library
* [StatCounter GlobalStats][3] - Browser usage share data, with geographic filters

### 2. Use a framework (maybe)

There is plenty of debate about the benefits or drawbacks of using a CSS framework like [Bootstrap][4] or [Foundation][5]. But using a framework as a basis for layout can reduce the amount of cross–browser testing you need to do.

Any framework worth its salt should be well tested on a wide range of browsers and devices. You should __always be aware of framework’s browser support__ and testing policies. Make sure that it corresponds with your own.

The key here is to consider the [long term impact][6] on your project of adopting a framework.

Links:

* [Bootstrap][4] — CSS framework
* [Foundation][5] — CSS framework
* [You might not need a CSS framework][6] — Belén Albeza

### 3. Use fewer breakpoints

Fewer responsive breakpoints in your code result in __fewer layout variations__. It’s common sense that this should mean less testing.

Likewise, sticking to horizontal media queries and avoiding vertical ones means you only need to test variations in screen width.

In practice, __bugs can appear at any viewport size__. You will always need some level of exploratory testing, particularly for fluid responsive designs. Be sure to test your design with [content outliers](#use-consistent-sample-content).

Links:

* [7 Habits of Highly Effective Media Queries][7] — Brad Frost

### 4. Keep the design simple

A focus on __good content__ presentation and conservative use of ‘clever’ design tricks will make testing easier. But less testing is not the only benefit.

I hope that we have collectively recovered from the gratuitous use of __parallax scrolling__ as a design crutch. Even if we have, there will always some other shiny temptation that emphasises form over function.

The recent surge of interest in design systems highlights the advantages of a consistent and simple approach. Content providers must be able to communicate their message, and users are able to do what they need to do.

Links:

 * [Do as Little as Possible][8] — Lyza Danger Gardner

### 5. Limit complex interactions

As using clever decorative features adds testing complexity, so do complex user interactions. Simplifying your user interactions will benefit users through __improved usability__. But doing so can also simplify functional testing. Early usability testing has a knack of benefitting a project in unexpected ways.

Some user interactions are harder to test than others. For example, drag and drop interactions can be tricky to get right, and need thorough exploratory testing to identify issues.

A simple form might not be as nifty, but it will be simpler to test. I’m not saying that you should not use these techniques, but that you should be aware of the cost of doing so.

Another challenge for testing is the __asynchronous interactions__ between the user, browser and server common in modern web applications. It is all too easy to create [race conditions][9] when many Ajax requests are in flight, any of which could fail or be slow to complete.

Test that your application can handle individual __request failures__ and does not depend on the order that they return. Even better, use an [established library][11] to coordinate your asynchronous requests in your application to reduce the need for testing.

Links:

* [Write Better JavaScript with Promises][9] - Landon Schropp
* [Writing Better Ajax][10] — Terry Mun
* [Async][11] — Asynchronous JavaScript utility library

---

## Limit the scope of tests

If you have a big site with hundreds or thousands of pages, you won’t be able to test each page by hand. Nor would you want to. We need some way to reduce the scope of testing to __examples of each template or component__.

The goal of these tips is to do as little testing as possible but with the __best coverage possible__. There are more deliberate and structured ways to focus testing efforts than picking a selection of typical pages.

### 6. Re-use and reduce components

You may be responsible for a site that has a huge range of components and variations. It is common for a site that has grown over time to grow a lot of similar-but-different components, each with their own implementation.

Modifying sites like these can be painful, and changes can have unexpected knock-on effects. This only increases the demands on testing time, making it less likely that you will make changes.

It can be __cathartic and rewarding__ to [audit your site][12] and [consolidate the components and styles][13] that it uses. You can then use a [tool][14] to generate a shared repository of these elements.

If you know what you have, then you can spend some time to __reduce duplication__ so that there is less to test.

Links:

* [Interface Inventory][12] — Brad Frost
* [CSS Audits: Taking Stock of Your Code][13] — Susan Robertson
* [Styleguides.io: Tools][14] — Things to help you make your own style guide

### 7. Use a test harness

Once you have a __central repository of elements and components__, you can use it as your focus for testing. This is essential for large sites, but can be beneficial even for smaller sites.

This works best if:

1. The test harness and live site use the __same template sources__.
2. The components can be displayed in a __relevant context__. For example, if you design a component to be flexible, can you test it at different widths?
3. Component variations can be __created and tested easily__
4. Everyone on your team __shares and re-uses__ the same component examples for testing each time

### 8. Test your style guide

Our ‘central repository of elements and components’ is better described as a __style guide__. Or you might have heard of its fancier cousin, the __design system__. Style guides and design systems serve many purposes. They can act as design guidance. They can document consistent and common design patterns and principles. And they can act as implementation guides.

If you manage a style guide or want to as part of your next project, make sure that you think about how you will [use it as a test harness][15] from the start.

For existing style guides, consider how you can __improve support of cross-browser testing__.

If your style guide allows component variations and content manipulation, it can be a powerful tool for testing.

Links:

* [Test Your Design System Not Your Website][15] — on this site

### 9. Use consistent sample content

__Content variation__ is a big source of unexpected cross–browser bugs. I have often come across bugs that are due to an extra-long name or paragraph of CMS or user-generated content.

When testing components, it’s important to test both __typical content__ and __extreme content__ values. If your app dictates a username can be up to 255 characters long, how does your app display that? Likewise, what happens when values are missing?

It’s important that you test the __same content values over time__, particularly if you want to automate your tests. For manual tests, use a [test script](#create-test-scripts) to specify values to use.

Having a system that will create test components with content filled for you, based on a __shared data source__, is ideal. That way you can replicate test content without effort.

Links:

* [faker.js][16] — JavaScript library to fake data

---

## Make testing targeted

Aimlessly testing the few browsers and devices that you have to hand is a sure-fire way to __miss bugs__ and __drive yourself potty__ with tedium.

The devices you test on should __reflect what your audience use__. But most websites are accessed by hundreds or even thousands of unique device and browser combinations. You can’t test them all, so how do you target devices that will be most representative?

### 10. Create a browser support policy

There’s little point testing with browsers and devices that your users don’t use.

Being aware of the devices and browsers your audience use is also __key to the design and development process__. When you add features that use a new browser technology, what [proportion of your user base][18] will be able to experience that feature?

A _browser support policy_ should drive decisions like these, and __determine priorities for testing__. It provides an agreed means by which a team makes decisions about product features, customer support issues and ongoing maintenance.

So, how do you choose your support policy? For existing projects, examine your __analytics package__ for browser, OS and device usage metrics.

For new projects, you can use public resources like [GlobalStats][3] to find current metrics for a __targeted geographical audience__ as a starting point.

This is a big and complicated topic because __the browser and device landscape got big and complicated__. But it’s worth spending some time on getting it right.

Links:

* [Designing for different browsers and devices][17] — Gov.uk service manual
* [StatCounter GlobalStats][3] - Browser usage share data, with geographic filters
* [Can I use?][18] - Browser support tables

### 11. Create a testing policy

Once you know your browser support policy, you can use that to determine your device testing policy. Deciding in advance __exactly what you are going to test on__ an ongoing basis is a great way to be more efficient.

A testing policy should provide this for you by describing:

1. Which __specific browsers and devices__ you will be testing on. This should name physical test devices and specific browsers, not just vague descriptions like ‘Android 4 device’.
2. The __priority group__ of each device. This determines how often and how thorough your testing will be. The priority should depend on usage metrics.
3. The broad __testing approach__ for each priority group. For example, what kind of changes demand a retest for that group, and the test activities that will take place.

A good cross–browser testing policy takes advantage of the law of __diminishing returns__. You want to start with activities that will __expose the most bugs__ so that you get the most out of your work.

* [Prioritizing Devices: Testing and Responsive Web Design][25]

### 12. Focus on difficult browsers

If we dread testing our work on __older versions of Internet Explorer__, why is that we tend to leave it until later on in a project?

It should be obvious, but older browsers are likely to produce more bugs to fix than newer ones.

So to __front-load our bug discovery__, it makes sense to test the difficult and older browsers on our support list first.

I say this with confidence, but it’s amazing how hard this one is to adopt.

### 13. Don’t repeat yourself

Browser testing has changed a lot. Browsers like Chrome, Firefox and Microsoft Edge __update themselves__ automatically. It’s not necessary to support more than the one or two latest versions of these browsers.

Unfortunately, this does not apply to other browsers. Internet Explorer, the Android built-in browser, and Safari either __do not auto-update__ or are tied to specific operating system versions. These are still popular browsers, and so most projects will need to support them.

There’s no need to test the same browser version across different operating systems. Generally speaking, the differences are trivial. For most projects, it is not necessary to test the same browser in more than one OS.

The key here is to __get value out of all your testing time__ and not waste it on repeating tasks that will not surface new bugs.

### 14. Adopt a targeted testing plan

Once you have browser support and testing policies, you can __perform specific types of testing__ on different browsers. The idea is to take advantage of what we know about browsers to identify issues earlier.

For example, the bugs you are likely to find on an Android 2.3 device will be different to those you would see on the latest version of Chrome.

Instead of clicking about and resizing your browser window for each browser, __make a list of test activities__ for each device group. And then only do those activities.

Chris Ashton has written some great advice about [how you might develop a plan like this][19].

Links:

* [High-Impact, Minimal-Effort Cross-Browser Testing][19] — Chris Ashton

---

## Test more efficiently

Just as you want to choose the smallest possible set of representative browsers and devices, you also want to focus your actual testing activities.

There is no point aimlessly clicking, scrolling and resizing with each browser. It’s far better to __decide in advance the test activities__ you’re going to pursue. Then make the process of repeating those activities across browsers as painless as possible.

### 15. Create test scripts

Professional testers love test scripts because they provide a __repeatable list of activities__ for each test run. By repeating the same activities each time, you can increase the chances that you catch __regressions__ (bugs that reappear). These are all too common.

There’s no need to go formal here. At the least, manual test scripts should include clear __steps for performing the test__, and a statement of the __expected outcome__. For cross–browser layout testing, this can include visual references. For functional testing, include clear descriptions of expected behaviour.

If you have grouped your browsers by priority, you’ll want to have different scripts for each priority group.

### 16. Test many browsers at once

As a human, you have at most two hands, and like most other humans, the chances are that you’re only adept at using one of them for fine motor control. You can probably forget about your feet altogether.

Unfortunately, this means that manual testing is often __performed serially__. Each browser or device is tested one after the other. This is a classic case of inefficiency that we can use computers to help with.

Certain types of manual testing lend themselves well to __parallel testing__. For example, you can view a component at multiple viewport dimensions on multiple browsers and devices at the same time to check for inconsistency and layout bugs.

Tools like [Ghostlab][20] allow you to control multiple browsers with one set of human hands by __synchronising interactions__ across devices. It’s great for the parallel layout testing use case and is a handy tool for rapid feedback during development.

As an alternative, you could use [Browsershots][21] to make __screen grabs__ of a page in a variety of browsers. You can then compare statically rendered components in one place.

Links:

* [Ghostlab][20] – App for synchronised development, testing and inspection
* [Browsershots][21] – Free cross-browser screen shot service

### 17. Use hosted browsers and devices

Maintaining your own set of browsers and devices to test on can be a big drain on time and money. Even if you do have real mobile devices at hand, you have to keep them charged and ready to use. Don’t underestimate how much work goes into maintaining even a small device lab.

One alternative is to use __cloud testing services__ like [BrowserStack][22], [Sauce Labs][23] or [CrossBrowserTesting][24]. These services provide on-demand access to browser instances, simulators and real devices.

These services have improved a lot in recent years and are well worth the money if you need to do a lot of testing. They maintain a far wider range of target devices, browsers and operating systems than you’re likely to need.

These services also provide [automated testing](#automate) support using Selenium. You can test private URLs over a secure tunnel, and generate screen grabs of pages and components as you test.

Links:

* [BrowserStack][22] — Browser testing service
* [Sauce Labs][23] — Browser testing service
* [CrossBrowserTesting][24] — Browser testing service

### 18. Use a device lab

Given what I have said above about the cost of maintaining a device lab, you might think I am against them. I’m not. In fact, if you work in a team that has the time and money to maintain a lab, you should do it. The __benefits of testing on real devices__ are especially relevant for sites and applications with a larger user base.

If you don’t have your own device lab, you can always visit a [community lab][26] instead. This can be a much cheaper way of getting __good test coverage__ for one-off or smaller projects than building up your own lab.

But how a device lab result in less time spent testing? Big company labs or community labs are usually well-run. They keep devices charged and __ready for testing__. And they often provide tools for synchronised browsing or semi-automated testing.

If you follow the advice above about targeted and focused testing, you’ll make the __most of your time__ in the lab, and catch bugs before users do. It’s hard to debug a live user issue when you don’t have immediate access to the category of device they are using.

Links:

* [Open Device Lab][26] – Find an open device lab near you

---

## Catch problems before you test

A lot of bugs are due to __common mistakes__ or problems in HTML, CSS or JavaScript code. These mistakes are easy to detect. Instead of waiting for manual testing to find them, or picking over your code by eye, we can use tools to spot them for us.

If we’re confident that __certain classes of bugs can’t happen__ because our tools prevent them, we don’t need to test for them.

### 19. Use code linters

Linters are a class of _[static analysis][27] tool_ that __identify common problems__ with code and __suggest modifications__. Linters are available for HTML, CSS and JavaScript.

The [W3C Markup Validation Service][28] and [HTML Tidy][29] are examples of HTML linters that have been around for a long time. As an alternative, you could opt for something more recent like [htmllint][30]. It’s not always easy to spot if you’ve got some __invalid markup__ that could break your work in some browsers but not others.

CSS linting is gaining popularity, with tools like [CSS Lint][31] and [Stylelint][32]. They will both __check your CSS__ for common problems with syntax, cross–browser compatibility, performance and accessibility. You can even use them to enforce your own coding style. Both provide the ability to configure your own rule sets.

For JavaScript, check out [JSHint][33] and [ESLint][34] (for ES2015 and beyond). Again, both these tools can spot __potential JavaScript problems__ and enforce style rules. Users can configure which rules to include in checks.

The key with linters is to run them as early as possible so that you can catch potential problems and fix them __before you run other types of test__. You can run them as part of a build job, pre-commit hook, or right in your code editor.

Links:

* [Static program analysis][27] – Wikipedia
* [W3C Markup Validation Service][28] – Check HTML by URL or file upload
* [HTML Tidy][29] – Correct and clean up HTML documents
* [htmllint][30] – Unofficial HTML5 linter and validator
* [CSS Lint][31] – CSS code quality tool
* [stylelint][32] – CSS linter
* [JSHint][33] – JavaScript code quality tool
* [ESLint][34] – Pluggable JavaScript linter

### 20. Use a CSS prefix tool

A few years ago, browser vendors started using __vendor-specific prefixes__ on CSS rules and DOM API methods. The intention was to isolate technologies that are in progress until the spec and implementation became stable.

Unfortunately, if you want to __support current and future browsers__, you need to provide both prefixed and unprefixed rules or code. In some cases, you will also need to provide alternative syntax, as candidate specifications have changed over time.

The most common example of this at the moment is __CSS flexbox__. It gives us lovely new layout powers, but we have to provide prefixes and older syntax. Internet Explorer 10 and 11 used different syntaxes, for example.

If you are writing vendor prefixes out by hand, it can be easy to miss important rules or to make a mistake. You will only catch the problem by testing in the browser affected.

For this reason, it is best to __prefix your CSS rules automatically__. You could use popular preprocessor mixin libraries for [Sass][35] or [LESS][36], or maintain your own set of mixins. If you use [PostCSS][37], [Autoprefixer][38] will generate vendor-prefixes based on your own browser support preferences.

If you don’t use a CSS pre-processor or post-processor at all, you could __let your editor generate vendor prefixes__ for you. The HTML and CSS editor tool belt [Emmet][39] provides [vendor CSS rule expansion][40] for popular editors.

Links:

* [Bourbon][35] – A lightweight Sass toolset
* [LESS Elements][36] – A set of mixins for LESS
* [PostCSS][37] – A tool for transforming CSS
* [Autoprefixer][38] – Add vendor prefixes to CSS rules
* [Emmet][39] – HTML and CSS editor tool belt

### 21. Profile your CSS

Even if you use linting and prefixing tools, it is still possible to write CSS code that causes bugs and is [hard to debug and maintain][67].

The most common problem with a long-lived CSS code base is __specificity creep__. When developers add new CSS rules they want to avoid making knock-on effects elsewhere in the site. Adding an `!important` declaration or using selectors with high specificity are the most common ways that this happens.

To see how much of a problem with specificity you have, you can __profile your CSS__.

[Parker][42] is a CSS profiling tool that generates lots of useful __statistics about your CSS__. In particular, Parker will tell you what your most specific rule is, so you can hunt it down and refactor it. Check out Harry Roberts [article on how Parker can be used][43].

Another option for specificity is to generate a [specificity graph][44] for your CSS. The idea here is to organise CSS files so that the least specific rules are at the beginning, and the most specific are towards the end. __Specificity should trend upwards__ through the file, and you should avoid big fluctuations. You can generate graphs for your own CSS using an [online tool][45] or a [command line utility][46].

Links:

* [Are You Writing Legacy CSS Code?][67] – on this site
* [Specificity][41] – About CSS specificity on the Mozilla Developer Network
* [Parker][42] – Stylesheet analysis tool
* [Improving Your CSS With Parker][43] – Harry Roberts
* [The Specificity Graph][44] – Harry Roberts
* [CSS Specificity Graph Generator][45]
* [CSS Specificity Graph NPM script][46]

---

## Test as you go

It may seem better to wait until you have completed development work before moving on to testing. Focusing on one thing at a time is generally a good idea. This approach is also common in teams with dedicated testers.

But whether you work alone or not, it is more efficient to __identify problems and bugs as early in the process as possible__. It will be cheaper to fix them, and retesting is less arduous.

Here are some tips to get you testing more as you work, without it disrupting your flow.

### 22. Get into the early testing habit

It can be hard to maintain good habits. Testing while you’re in the full flow of design or development work can feel counterproductive. But it can have long-term benefits.

Many of the other tips in this article are designed to help you include testing more seamlessly into your workflow. For example, using a [linting](#use-code-linters) tool that runs in the background as you work is less intrusive than checking your code by hand.

You’ll still need to __develop testing habits as you work__, though. After years of experience, I am aware of what browsers are likely to be problematic for the work that I’m doing. So I will try to test in those first, as soon as I have something testable.

If you’re new to a technique, or if you are working on a challenging implementation, early testing is important for the feedback it provides. You might have to make a __fundamental change of approach__ once you try it in a few browsers.

If you’re not sure about an approach, boil it down to a __simplified test case__, put it on [Codepen][47] or another prototyping tool and test it across some browsers.

Start with the browsers that are __likely to be problematic__. It’s better to change your approach early with a rough prototype than later when you have spent time polishing your work.

You’ll only get into these kinds of habits if __browsers and devices are at hand__ and ready to use. See the sections on using [browser testing services](#use-hosted-browsers-and-devices) and [device labs](#use-a-device-lab) to get them close to hand.

Even better, [automate](#automate) as much as possible to free up your and your team’s creative thinking time.

Links:

* [Codepen][47] – Playground for the front end web

### 23. Little and often, not everything all at once

I used to wait until I had ‘finished’ to test my work in more than one browser. It was always a mistake. In truth, the ‘finished’ bit of work is just a __candidate implementation__ that works in one browser.

In practice, you have to fix a lot of bugs identified from cross–browser testing, and then __re-test the new implementation__. You may even need to change your approach completely.

In the long run, the Big Test approach __creates more work__ than it saves. You may work on a product with a rapid release cycle. Or you may be creating a set of templates for one-off delivery to a client. In both cases, getting cross–browser testing into your process as early as possible will pay dividends over time. It may feel intrusive at the beginning, but the early testing will pay off.

---

## Automate!

One sure-fire way of doing less testing yourself is to __get a computer to do it instead__.

As web development matures as a profession, tools have emerged to improve efficiency and cut out repetitive tasks. This phenomenon is consistent across all industries. Because __testing is right up there on the list of tedious and repetitive tasks__, there are now a lot of automated testing tools available.

### 24. Write unit tests

Unit testing isolates small pieces of imperative code and tests that a certain __input produces an expected output__.

In JavaScript, unit test frameworks like [Mocha][48] and [Jasmine][49] have become popular. There is an enormous array of supporting libraries and tools for unit testing. It’s a big topic, so I won’t cover it here, but there are [good][50] [books][51] to get you started.

If you are writing any non-trivial JavaScript code, unit testing skills will pay you back dividends in __robust and maintainable code__.

Test-driven development (TDD) is an approach that aims to encourage good code design. Developers __write tests before they write the implementation__ that will satisfy those tests. Unit tests are a key part of this approach, and most of the benefit of unit tests is in the way they enforce good code design.

Unit testing and TDD is common in JavaScript development. For CSS and HTML, the approach is less common, because neither is an imperative programming language. But the idea of testing __small pieces of functionality__ in isolation and writing tests before implementation can still be relevant.

Links:

* [Mocha][48] – JavaScript test framework
* [Jasmine][49] – Behaviour-driven development framework
* [Test-Driven JavaScript Development][50] – Book by Christian Johansen
* [JavaScript Testing Recipes][51] – Book by James Coglan

### 25. Test your website as a human would

_End-to-end_ or _functional_ tests are the test professional’s terms for testing a system from the __user’s point of view__. Instead of repeating the same manual steps for each test session, you can run automated end-to-end tests to perform the same user interactions.

Techniques and tools for web application end-to-end tests are improving all the time. [Webdriver.io][52] and [Nightwatch.js][53] are both JavaScript wrappers around [Selenium WebDriver][54], a browser automation and inspection tool that works with most popular browsers. You can run Selenium-based tests on your own PC. Or you can run them on browser testing services like Sauce Labs and BrowserStack.

End-to-end tests can also serve as a great way to __collaborate with others__ in the team and document the intended behaviour of the system. This is very much the goal of behavioural-driven development (BDD). [Cucumber][55] aims to provide this ability using __human- and machine-readable specifications__ that can be run as automated tests.

Be warned, though. There is some overhead associated with end-to-end tests. It can be frustrating trying to debug __intermittent test failures__. Automated functional tests are best suited to long-running projects with lots of user interactions to test. They can be a great way to ensure that your app is behaving whenever anyone commits code changes.

Links:

* [WebdriverIO][52] – Selenium bindings for NodeJS
* [Nightwatch.js][53] – Browser automated testing done easy
* [Selenium WebDriver][54] – Browser automation tools
* [Cucumber][55] – Behaviour-Driven Development framework

### 26. Automatically compare screen grabs

End-to-end tests focus on validating system behaviour and functionality. But it is also possible to __test for changes in rendered output__ using image regression testing.

Image regression tests work by taking screen grabs of a page or element and comparing them with a known ‘good’ image. An __image diff algorithm__ runs and differences between the two images are highlighted. You can set __thresholds for allowable differences__ to cover small changes that don’t affect users.

There is now a big range of image diff testing tools available. The most popular seem to be [Wraith][56], [BackstopJS][57] and [PhantomCSS][58]. There are also paid services that will do the configuration, testing and setup work for you, such as [Percy][59]. Check out this [useful comparison][60] of tools.

Links:

* [Wraith][56] – Responsive screenshot comparison tool
* [BackstopJS][57] – Catch CSS curve balls
* [PhantomCSS][58] – Visual regression testing with PhantomJS
* [Percy][59] – Continous visual integration for web apps
* [Top Visual Regression Testing Tools][60] (PDF) – Kevin Lamping

### 27. Automate testing against a spec

There are also tools that allow you to write __design and layout specs__ and run those specs as __automated layout tests across different browsers__. This can be a great way to test whether a website or application layout conforms to a designer’s intent.

[Galen Framework][61] is the most capable tool that incorporates this approach. It provides the ability to compare the relative positions and dimensions of elements in a layout. Galen can perform different checks at different viewport dimensions or different browsers. This is vital where a site makes use of __responsive design__ and feature detection.

I think Galen Framework deserves more attention. It’s a powerful tool, and not hard to set up. But again, it’s geared more towards long-lived projects that are subject to frequent change. It’s also ideal for [testing a design system][15].

If you’re interested in layout testing, check out my upcoming [step-by-step guide to testing responsive designs with Galen][62].

Links:

* [Galen Framework][61] – Automated responsive design testing framework
* [Automated Responsive Design Testing][62] – My step-by-step guide to using Galen

### 28. Test automatically when anything changes

[Continuous integration][63] (CI) is a development process in which team members commit code to a central repository. Each time the code base changes, a build process tests and validates the code. Only builds that pass these tests are suitable for release. If a build fails, the team should fix it quickly. The aim is to have __code in a releasable state__ at all times.

In the past, CI required a __dedicated server__ that someone in the team or organisation had to maintain, usually running [Jenkins][64]. Teams are increasingly using __cloud CI services__ like [TravisCI][65] and [CircleCI][66] to fulfil this function.

Almost all the automated linting and testing tools mentioned in this article can be integrated into a CI job. Including the ability to run __automated tests on browser testing services__.

With some investment of time and some ongoing costs, teams can reduce the amount of time they spend on manual testing and __speed up their release cycle__.

Links:

* [Continous Integration][63] – Thoughtworks
* [Jenkins][64] – Open source automation server
* [Travis CI][65] – Continous integration service
* [CircleCI][66] – Continous integration and delivery platform

---

## Delegate testing work

This might seem obvious: if you want to do less manual cross–browser testing yourself, __ask someone else to do it__. OK, I realise that means you might have to pay them.

### 29. Hire a professional

Test professionals generally go through a __certification process__, whether they specialise in manual testing or automation. I’m no expert on this process, but it should ensure that you’re hiring someone with a good grounding of professional testing expertise.

In practice, like all professionals, there is a big variation in skill and experience. When you have a good test professional on your team, the difference is noticeable. Everyone will be more committed to producing high–quality work. The best testers will help __transform the working practices of the whole team__ for the better.

Even if you aren’t able to hire a dedicated test professional, it can be useful to train someone in testing skills for the benefit of the team.

### 30. Include your testers in the development process

To get the best out of your testers, you should __avoid keeping them siloed__ in a separate team, or treating them like a black box just for testing your work. Test professionals can contribute at all stages of the development process, from planning and design through to deployment and maintenance.

Planning __how the team is going to test__ a new feature is of key importance before development starts. But it’s a consideration that often gets missed because testers are not included in planning conversations. The team is usually focused on how well the feature will work, not how well it will fail.

Likewise, __pairing with testers__ during development itself can be a great way to learn from one another.

Get your testers involved in everything that the team does. You won’t regret it.

### 31. In-source testing

You may have experience of working in a team that has an outsourced testing team, whose job it is to do a Big Test and then __report back all the bugs__ for you to fix. This might happen for each release, each week, or even nightly.

This approach developed when software release cycles were long, and the software itself distributed on disk. But it’s __monstrously inefficient__ for web development, where release cycles are quicker and changes can be made at any time.

Where I have seen an outsourced test team, it’s inevitable that the development team end up doing a lot of __tactical testing__ themselves. They do this to identify issues as soon as possible so they can press on with getting the work delivered.

Not all outsourced testing is bad, but if you end up waiting on the results of testing before moving on with your own work, you'll need to find ways to speed things up.

---

## Continuous improvement

That’s a lot of things you could do to improve your cross–browser testing. Which should you address first? The answer to this question will be __different for each project and team__.

You can start by gathering information. Get a good understanding of __what you and your team are currently doing__. How good is the current approach is at identifying issues and getting them resolved? What’s getting in the way of that happening?

If you have a __customer support team__, working with them to understand the trends in user feedback and support tickets can be revealing.

Gather as much information as possible so that you can __make changes with the biggest impact__. Do one thing at a time, see what improved and repeat.

---

If you enjoyed this article, you might be interested in my upcoming book [Automated Responsive Design Testing][62].

[1]: http://www.html5rocks.com/en/tutorials/detection/
[2]: https://modernizr.com/
[3]: http://gs.statcounter.com/
[4]: http://getbootstrap.com/
[5]: http://foundation.zurb.com/
[6]: https://hacks.mozilla.org/2016/04/you-might-not-need-a-css-framework/
[7]: http://bradfrost.com/blog/post/7-habits-of-highly-effective-media-queries/
[8]: http://alistapart.com/column/do-as-little-as-possible
[9]: https://davidwalsh.name/write-javascript-promises
[10]: https://medium.com/coding-design/writing-better-ajax-8ee4a7fb95f
[11]: http://caolan.github.io/async/
[12]: http://bradfrost.com/blog/post/interface-inventory/
[13]: http://alistapart.com/article/css-audits-taking-stock-of-your-code
[14]: http://styleguides.io/tools.html
[15]: {% post_url 2015-08-01-test-your-design-system-not-your-website %}
[16]: https://github.com/marak/Faker.js/
[17]: https://www.gov.uk/service-manual/technology/designing-for-different-browsers-and-devices
[18]: http://caniuse.com/
[19]: https://www.smashingmagazine.com/2016/02/high-impact-minimal-effort-cross-browser-testing/
[20]: https://www.vanamco.com/ghostlab/
[21]: http://browsershots.org/
[22]: https://www.browserstack.com/
[23]: https://saucelabs.com/
[24]: https://crossbrowsertesting.com/
[25]: https://www.smashingmagazine.com/2014/07/testing-and-responsive-web-design/
[26]: https://opendevicelab.com/
[27]: https://en.wikipedia.org/wiki/Static_program_analysis
[28]: https://validator.w3.org/
[29]: http://www.html-tidy.org/
[30]: https://www.npmjs.com/package/htmllint
[31]: http://csslint.net/
[32]: http://stylelint.io/
[33]: http://jshint.com/about/
[34]: http://eslint.org/
[35]:	http://bourbon.io/
[36]:	http://lesselements.com/
[37]: http://postcss.org/
[38]:	https://github.com/postcss/autoprefixer
[39]:	http://emmet.io/
[40]:	http://docs.emmet.io/css-abbreviations/vendor-prefixes/
[41]: https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity
[42]:	https://github.com/katiefenn/parker/
[43]:	http://csswizardry.com/2016/06/improving-your-css-with-parker/
[44]:	http://csswizardry.com/2014/10/the-specificity-graph/
[45]:	https://jonassebastianohlsson.com/specificity-graph/
[46]:	https://github.com/pocketjoso/specificity-graph
[47]: http://codepen.io/
[48]: https://mochajs.org/
[49]: http://jasmine.github.io/
[50]: http://tddjs.com/
[51]: https://jstesting.jcoglan.com/
[52]:	http://webdriver.io/
[53]:	http://nightwatchjs.org/
[54]:	http://www.seleniumhq.org/projects/webdriver/
[55]: https://cucumber.io/
[56]: http://bbc-news.github.io/wraith/
[57]: https://garris.github.io/BackstopJS/
[58]: https://github.com/Huddle/PhantomCSS
[59]: https://percy.io/
[60]: https://visualregressiontesting.com/VRT-Tools.pdf
[61]: http://galenframework.com/
[62]: /automated-responsive-design-testing/
[63]: https://www.thoughtworks.com/continuous-integration
[64]: https://jenkins.io/
[65]: https://travis-ci.org/
[66]: https://circleci.com/
[67]: {% post_url 2016-07-25-are-you-writing-legacy-css-code %}
