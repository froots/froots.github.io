---
layout: post
title: Are you writing legacy CSS code?
date: '2016-07-08 12:07'
description: >-
  Anyone that has worked with CSS for long enough recognizes the pain of working
  with a legacy code base. But have you considered how to make your own CSS more
  understandable and maintainable by others? What do we mean by ‘legacy code’
  anyway? And how can you make sure you avoid creating it yourself?
---

It’s the first day of your new job. You couldn’t be more excited.

You bound into the company induction and try to internalize the company values. You meet some friendly people over lunch. You can’t wait to get started on that awesome, world-changing project you joined the company to work on.

You sit down at your desk, open your brand new laptop. Your ‘on-boarding buddy’ shows you how to check out the project from source control.

You take a look at the CSS code.

Oh.

Lots and lots of long and specific selectors. No obvious code organization. Even a smattering of `!important` declarations dotted around. Duplication. Oh, the duplication.

This is going to be tough. How are you going to work with this mess of spaghetti? You go home after your first day with a feeling of despair. How are you going to contribute without going bananas?

Why didn’t they tell you their CSS code is a giant hairball _before_ you accepted the job?

---

This is a scenario that plays out every day for countless web designers and developers. Don’t feel bad if it rings some bells for you. It has become the norm.

## Do you have a CSS hairball?

The typical web project now spans years rather than months or weeks. We are becoming all too familiar with large, long-lived CSS code bases that have grown organically.

Why and how does a CSS hairball happen?

Is it because CSS is terrible, and there is nothing we can do about it?

Are the people that preceded you incompetent? Or were they working with uncertainty and towards a deadline?

Perhaps you’re the one creating the hairball right now…

## The cycle of rewrites

I would be the first to admit to being responsible for many a CSS hairball in the past. I do my best, but as a long project progresses, it seems to get harder and harder to keep the code well organized. Decisions I make in the past come back to bite me, and I don’t have time just now to fix them. And so the problem worsens. Specificity creeps.

When faced with a giant hairball of CSS, our instincts are to rewrite the whole thing. More so if you didn’t create the hairball yourself. If only your boss would let you work on it for a few weeks, you could fix it.

I know from my own experience that it is better to refactor a large code base over time, rather than attempt to replace it in one big push. The history of the web is littered with companies that failed because they tried to rewrite everything and stopped creating stuff.

But the truth is that while we might say we’re refactoring CSS, what we’re often doing is rewriting it.

Here’s the cycle I’ve seen at various gigs in the past, and fallen foul of myself.

1. Become dissatisfied with the CSS code that we have. We need to simplify it, remove duplication and improve performance.
2. Start with small changes, but end up re-doing the whole lot. It’s good, though!
3. Start adding new features, change others, hire new team members, find out about new CSS frameworks and techniques.
4. Time passes…
5. Become dissatisfied with the CSS code that we have…

You get the picture. It took me a few cycles of this to realize what the real problem was, and it’s this:

We focus too much on getting the rewrite/refactor done right, and not enough on how the whole team is going to maintain quality in the future.

Anyone not involved in the refactoring work has a right to look at what you’ve done with trepidation if they have to maintain it.

What we’ve done is to create more legacy code.

## What do we mean by ‘legacy’ code?

In common use, we talk about ‘legacy’ code as if we mean anything we think sucks that someone else wrote in the past. ‘Legacy systems’ are those that we know we need to replace, or have already been superseded, but are difficult to eradicate.

They are tottering under the weight of tech debt accrued over time. Or they are based on an approach that is now considered old hat. CSS flexbox just made all your float-based layouts legacy, by the way.

But real people created those legacy systems, often with care and love. Sometimes, those people are still part of the team that is struggling to maintain them.

New team members even joke about the quality of the code, and those that created it joke back “yeah, what was I thinking, LOL”. It’s a cliché in software development to complain that you can’t even make sense of your _own_ code after a few short weeks (days? hours?).

## Rethinking ‘legacy’

I don’t like this common use of ‘legacy’. It’s subjective, relative, disrespectful and not at all useful.

One person’s legacy code base is another’s best work of their career (the good type of legacy). Just because code is old, doesn’t mean it is not elegant, organized, performant and understandable. Just because code is new doesn’t mean it is not a mess.

In his 2004 book, _Working Effectively With Legacy Code_, Michael Feathers describes a different definition of ‘legacy code’. He defines it as code that is _not covered by tests_. That’s it. If you think about it for a moment, it makes sense. It applies to old or new code. It focuses on maintainability and understandability. Code without tests is hard to change with confidence.

Although Feathers discusses imperative object-oriented languages like Java, we can apply the concept to CSS too. The complaints below apply to CSS as much as they do to Java or JavaScript:

* If you don’t have tests covering a particular bit of code, it’s hard to know how it is operating.
* The code might work, but you’re not sure how.
* You might not even know which parts of the code base are combining to produce the final system behaviour.
* Tracking down the code that produces the behaviour you’re interested in can be frustrating and time consuming.

So, how is this concept of legacy useful in CSS?

## Your refactor could be creating new legacy code

Think about the last time you refactored some CSS. How did you make sure you weren’t breaking anything? Did you test manually and by eye? Or did you cover your changes with visual regression tests using image diffs? How many browsers and devices did you run these tests on?

It’s OK to admit that you didn’t test as much as you would like. The problems with unstructured CSS code bases can be bad. Enough that the priority is just to get something — anything — to replace what’s there. I’ve done that too many times in the past to count.

Manual cross-browser testing is time-consuming and difficult to repeat with consistency. Automated testing of layout and design has been difficult to achieve in the past, and few teams have adopted it.

When we do a big refactor or rewrite, we may have fixed many of the problems for now. But how do we prevent our new shiny approach from becoming just as much of a hairball as the thing we just got rid of?

By Michael Feathers’ definition, unless you put tests in place to keep things on track, you’ve just created more legacy code. You may have improved the situation for now, but your code will trend towards entropy like the rest of the universe.

How do we stop the rot?

## CSS is a team sport

The next person that comes along to work on your code (or you in six months time) will have to understand and adopt the same approach as you. They will need to understand how to avoid specificity creep. They will need some confidence that they haven’t caused knock-on regressions in other parts of the code.

Remember that CSS is often a team endeavour, and many people will read your code, now and in the future.

Modern CSS architecture techniques like [BEM](http://getbem.com/), [SMACSS](https://smacss.com/) or [ITCSS](http://itcss.io/) encourage maintainability for teams as well as individuals. They do this by providing specific patterns for low specificity, modularity and consistent naming. This helps readability for others that need to understand what your code is doing. It helps them to make changes and additions of their own by enforcing constraints for how they should be done.

But the most important thing is to agree and maintain a consistent approach. To share that approach with everyone on the team, and to make sure that the team helps itself to maintain standards in the long term.

When taking on refactoring work, it’s important to look beyond the here-and-now of getting your code working. You should also consider how you and others will maintain the code for the long term.

## Always Be Refactoring

When I think about the many Big CSS Rewrites I’ve been a part of in the past, a pattern emerges. The refactors or rewrites we do are big because we aren’t taking on smaller ones along the way. Big rewrites are always painful. We usually have to negotiate time away from working on feature development, for little visible outcome to users. Then, 18 months later, we negotiate another big rewrite.

This happens because of testing overhead. Validating that even small changes don’t cause knock-on effects takes time. So team-members shy away from making lots of small improvements beyond the work they have to deliver.

These small improvements and fixes don’t get done. Inefficient and inconsistency strays into the codebase. Tech debt adds up, and you end up with another hairball.

We should be making small refactors as we go along. We don’t need to negotiate any special work, because this is part of the work of delivering new features.

But we can only do this if testing changes is a low-friction exercise, or even better, happens automatically.

## A machine for preventing new legacy code

Most articles about CSS refactoring that I’ve seen focus on specific refactoring techniques. They generally don’t even mention testing as a safety net for changes. Those that do describe ad-hoc manual testing or visual regression testing using image diff tools such as [Wraith](https://github.com/BBC-News/wraith), [PhantomCSS](https://github.com/Huddle/PhantomCSS) or [BackstopJS](https://github.com/garris/BackstopJS). These tools take a little setting up, but they can quickly tell you if a page or component differs from an expected ‘reference’ image. You can use visual regression tests if you want to refactor code to produce the same result that you already have.

Visual regression testing only tells you that _something_ has changed. The tests themselves do not describe exactly how we expect the system to behave. When a test fails, we must still interpret the visual diffs to identify both what the expected layout is, and how our implementation differs from it. It's just a more consistent, sensitive and faster version of manual cross-browser testing.

Most types of software testing compare the _behaviour_ of the system with a specific expectation. We can test the system as a whole (end-to-end tests) or individual units of code in isolation (unit testing). For example, the [Cucumber](https://cucumber.io/) framework provides a way to create human-readable specifications that can also serve as automated end-to-end tests. It is just as much about team communication and collaboration as it is about automated testing.

[Galen Framework](http://galenframework.com/) provides a way to test responsive layouts against human– and machine–readable specifications. You can run tests on different browsers and devices, and you can even use cloud testing services like [BrowserStack](https://www.browserstack.com) or [Sauce Labs](https://saucelabs.com/). All this can be part of a continuous integration task so that tests run whenever anyone commits code changes. You could use this approach in isolation, or in combination with visual regression tests.

The important thing to consider is how you or your team will be able to test CSS changes fast enough to reduce friction for making these changes.

## Testing is more than just automated tests

Having a suite of visual regression tests or layout specification tests will help, but they are only part of a bigger picture.

### Design systems as test cases

We would usually want to [avoid running design tests across our whole site]({% post_url 2015-08-01-test-your-design-system-not-your-website %}). Doing so would take far too long for anything but the most simple website. This is where a living style guide or design system can be useful. If every component has a URL, we can run tests in a predictable environment, rather than on a site with content that changes often.

Get yourself a testable style guide site. It doesn’t have to be super sophisticated. Check out [styleguides.io](http://styleguides.io/) for heaps of helpful resources.

## Agreed code style, linting and code reviews

Automated layout tests or visual regression tests only tell you if your components are rendering as expected. To ensure consistency of approach in your team, you’ll need to do more. To keep the benefits of a refactor or rewrite in the long term, you’ll need a shared and agreed coding style. And you'll need regular code reviews to keep on top of it.

## Give it a go

Keeping your CSS in good shape for the long term is about more than a good architecture. It needs to encourage others to contribute. Combine design systems, code style guides, code reviews, testing and CSS architecture patterns to keep everyone focusing on long-term quality.

These things are not so hard by themselves. You can introduce them one by one. Give them some consideration so that your next refactor is a considerate, future-friendly one.
