---
layout: post
title: Are you writing legacy CSS code?
date: '2016-07-25 07:02:00Z'
description: >-
  Anyone that has worked with CSS for long enough recognizes the pain of working
  with a large legacy code base. How can we make sure that our next CSS refactor
  sticks? How can we avoid creating legacy code ourselves?
intro: >-
  Anyone that has worked with CSS for long enough recognizes the pain of working
  with a large legacy code base. How can we make sure that our next CSS refactor
  sticks? How can we avoid creating legacy code ourselves?
twitter_card:
  image: /images/cards/cables.jpg
og_data:
  image: /images/cards/cables.jpg
convertkit: 112499
hero:
  src: /images/posts/2016-07-25/mesh.jpg
  alt: A mesh of cords
  caption: Photo
  credit:
    name: Clint Adair
    url: https://unsplash.com/photos/BW0vK-FA3eg
---

I've created many terrible CSS code bases.

As long-lived projects progressed, it became harder and harder to keep the code well organized. Decisions I made in the past came back to bite me later in the project when I didn't have time to fix them. Selector specificity crept up as I opted for quick fixes to avoid addressing the real problem.

For many projects, the problem ended there, because I moved on.

But for the big, important projects with a maintenance cycle of forever and a larger team, this can get really frustrating. All the time we were introducing technical debt through incremental additions. CSS practices were changing, and new and shiny tools would appear, promising a shangri-la of CSS developer happiness. Fear of Missing Out took hold, and we would start to daydream about a better world.

When I first started out as a developer, I just wanted to create stuff. Then, when I began working on bigger projects with an existing team, I started to get frustrated that the ‘legacy code’ was holding me back from this aim. If only the team leader would let me refactor it all!

Eventually, I became a team leader myself, and realised that *I* had been the one creating legacy code all along.

## The cycle of rewrites

When faced with a giant dissatisfying mess of CSS, our instincts are to rewrite the whole thing. More so if we didn’t create the mess ourself.

This is the cycle I’ve fallen foul of:

1. Become dissatisfied with the CSS code that we have. We need to simplify it, remove duplication and improve performance.
2. Start with small changes, but end up re-doing the whole lot. It’s good, though!
3. Start adding new features, change others, hire new team members, find out about new CSS frameworks and techniques.
4. Time passes…
5. Become dissatisfied with the CSS code that we have…

You get the picture. It took me a few cycles of this to realize what the real problem is.

We focus too much on getting the rewrite/refactor right, and not enough on how the whole team is going to maintain quality in the future.

Anyone not involved in the refactoring work has a right to look at what we done with spepticism and trepidation if they have to maintain it.

What we’ve done is to create more legacy code.

## What do we mean by ‘legacy’ code?

In common use, we talk about ‘legacy’ code as if we mean anything that someone else wrote in the past that is a pain to work with. ‘Legacy systems’ are those that we know we need to replace, or have already been superseded, but are difficult to eradicate.

They are tottering under the weight of tech debt accrued over time. Or they are based on an approach that is now considered old hat. CSS flexbox is busy making all your float-based layouts legacy right now.

But real people created those legacy systems, often with care and love. Sometimes, those people are still part of the team that is responsible for maintaining them.

I like to remind myself of the [prime directive of agile retrospectives](http://retrospectivewiki.org/index.php?title=The_Prime_Directive) when getting familiar with existing code bases. It helps me to avoid petty snarkiness. It also helps me feel better about returning to my own code after a few months.

> “Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand.”

## Rethinking ‘legacy’

I don’t like this common use of ‘legacy’. It’s subjective, relative, disrespectful and not at all useful.

One person’s legacy code base is another’s best work of their career (the good type of legacy). Just because code is old, doesn’t mean it is not elegant, organized, performant and understandable. Just because code is new doesn’t mean it is not a mess.

In his 2004 book, _Working Effectively With Legacy Code_, Michael Feathers describes a different definition of ‘legacy code’. He defines it as code that is _not covered by tests_. That’s it. If you think about it for a moment, it makes sense. It applies to old or new code. It focuses on maintainability and understandability. Code without tests is hard to change with confidence.

Although Feathers focuses on imperative object-oriented languages like Java, we can apply his thinking about legacy code to CSS too. The complaints below apply to CSS as much as they do to Java or JavaScript:

* If you don’t have tests covering a particular bit of code, it’s hard to know how it is operating.
* The code might work, but you’re not sure how.
* You might not even know which parts of the code base are combining to produce the final system behaviour.
* Tracking down the code that produces the behaviour you’re interested in can be frustrating and time consuming.

So, how is this concept of legacy useful in CSS?

## Your refactor could be creating new legacy code

Think about the last time you refactored some CSS. How did you make sure you weren’t breaking anything? Did you test manually and by eye? Or did you cover your changes with visual regression tests using image diffs? How many browsers and devices did you run these tests on?

It’s OK to admit that you didn’t test as much as you would like. The problems with unstructured CSS code bases can be bad. Enough that the priority is just to get something — anything — to replace what’s there. I’ve done that too many times in the past to count.

Manual cross-browser testing is time-consuming and difficult to repeat with consistency. Automated testing of layout and design has been difficult to achieve in the past, and is rare.

When we do a big refactor or rewrite, we may have fixed most or all of the explicit code problems. But how do we prevent our new shiny creation from becoming as much of a hairball as the thing we replaced?

By Michael Feathers’ definition, unless you put tests in place to keep things on track, you’ve just created more legacy code. You may have improved the situation for now, but your code will trend towards entropy like the rest of the universe.

How do we stop the rot?

## CSS is a team sport

The next person that comes along to work on your code (or you in six months time) will have to understand and adopt the same approach as you. They will need to understand how to avoid specificity creep. They will need some confidence that they haven’t caused knock-on regressions in other parts of the code.

Remember that CSS is often a team endeavour, and many people will read and contribute to the code, now and in the future. Even if you are the only the person responsible now, who will maintain this code in the future?

Modern CSS architecture techniques like [BEM](http://getbem.com/), [SMACSS](https://smacss.com/) or [ITCSS](http://itcss.io/) encourage maintainability for teams as well as individuals. They do this by providing specific patterns for low specificity, modularity and consistent naming. This helps readability for others that need to understand what your code is doing. It helps them to make changes and additions of their own by enforcing constraints for how they should be done.

But the most important thing is to agree and maintain a consistent approach. To share that approach with everyone on the team, and to make sure that the team helps itself to maintain standards in the long term.

When taking on refactoring work, it’s important to look beyond the here-and-now of getting your code working. You should also consider how you and others will maintain the code for the long term.

## Always Be Refactoring

When I think about the many Big CSS Rewrites I’ve been a part of in the past, a pattern emerges. The refactors or rewrites we do are big tasks in the first place because we aren’t taking on smaller ones along the way. Big rewrites are always painful. We usually have to negotiate time away from working on feature development, for little visible outcome to users. Then, 18 months later, we negotiate another big rewrite.

One of the reasons this happens is because of testing overhead. Validating that even small changes don’t cause knock-on effects takes time. So team-members shy away from making lots of small improvements beyond the work they have to deliver.

These small improvements and fixes often don’t get done. Inefficient and inconsistency strays into the codebase. Tech debt adds up, and you end up with another hairball.

We should be making small refactors as we go along. We don’t need to negotiate any special work, because this is part of the work of delivering new features.

We can only do this if testing changes is a low-friction exercise, or even better, happens automatically.

## A machine for preventing new legacy code

Most articles about CSS refactoring focus on specific refactoring techniques. They rarely even mention testing as a safety net for changes. Those that do describe ad-hoc manual testing or [visual regression testing](https://decadecity.net/blog/2014/11/04/css-refactoring-wraith) using image diff tools such as [Wraith](https://github.com/BBC-News/wraith), [PhantomCSS](https://github.com/Huddle/PhantomCSS) or [BackstopJS](https://github.com/garris/BackstopJS). These tools take a little setting up, but they can quickly tell you if a page or component differs from an expected ‘reference’ image. You can use visual regression tests if you want to refactor code to produce the same result that you already have.

Visual regression testing tells you that _something_ has changed. The tests themselves do not describe how we expect the system to behave. When a test fails, we still have to interpret the visual diffs to identify both what the expected layout is, and how our implementation differs from it. It's really a more consistent, sensitive and faster version of manual cross-browser testing.

In contrast, most other types of automated testing compare the _behaviour_ of the system with a specific expectation. We can test the system as a whole (end-to-end tests) or individual units of code in isolation (unit testing). For example, the [Cucumber](https://cucumber.io/) framework provides a way to create human-readable specifications that can also serve as automated end-to-end tests. It is just as much about team communication and collaboration as it is about automated testing.

[Galen Framework](http://galenframework.com/) provides a way to test responsive layouts against human– and machine–readable specifications. You can run tests on different browsers and devices, and you can even use cloud testing services like [BrowserStack](https://www.browserstack.com) or [Sauce Labs](https://saucelabs.com/). All this can be part of a continuous integration task so that tests run whenever anyone commits code changes. You could use this approach in isolation, or in combination with visual regression tests.

The important thing to consider is how you or your team will be able to test CSS changes fast enough to reduce friction for making these changes.

## Testing is more than just automated tests

Having a suite of visual regression tests or layout specification tests will help, but they are only part of a bigger picture.

### Design systems as test cases

We would usually want to [avoid running design tests across our whole site]({% post_url 2015-08-01-test-your-design-system-not-your-website %}). Doing so would take far too long for anything but the most simple website. This is where a living style guide or design system can be useful. If every component has a URL, we can run tests in a predictable environment, rather than on a site with content that changes often.

Get yourself a testable style guide site. It doesn’t have to be super sophisticated. Check out [styleguides.io](http://styleguides.io/) for heaps of helpful resources.

### Agreed code style, linting and code reviews

Automated layout tests or visual regression tests only tell you if your components are rendering as expected. To ensure consistency of approach in your team, you’ll need to do more. To keep the benefits of a refactor or rewrite in the long term, you’ll need a shared and agreed coding style. And you'll need regular code reviews to keep on top of it.

## Give it a go

If you are in charge of a CSS code base, your job is to create a process where maintaining high quality happens by default and legacy code creation is minimised.

Keeping your CSS in good shape for the long term is about more than a good architecture. It needs to encourage others to contribute. Combine design systems, coding style guidelines, code reviews, testing, CSS architecture patterns and help with contributions to keep everyone focusing on long-term quality.

Setting up these things are not so hard by themselves. You can introduce them one by one. Give them some consideration so that your next refactor is a considerate, future-friendly one.
