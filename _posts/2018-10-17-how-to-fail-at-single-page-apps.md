---
layout: post
title: How to fail at single page apps
date: '2018-10-17 00:00'
---

Single page apps damage businesses.

Now that we have the controversial clickbait premise out of the way, I want to make it clear from the start that I love a well executed single page app (SPA) in the right circumstances.

But I do believe my opening statement to be true for a lot of businesses that have gone head first into developing a single page app without asking themselves whether it's necessary, or whether they can afford to make it good enough.

## The Vision

It's all too easy to look at prime examples of single page apps like Google Maps and think _"we could build something like that!"_

After all, it's just a website. And there are JavaScript frameworks like React and Angular that can help us build it. Other teams have built amazing things with these technologies.

Our app can be just like one of those slick apps that we all know and use regularly.

But it's far easier to create a single page app that doesn't fulfil our vision, and in fact end up with one that's sluggish, resists improvement and repels new features. There is a very long tail of JavaScript apps, and it's not at all pretty.

Anecdotally, in my work with product teams, I've seen this often. Small product organisations struggle with single page apps because they underestimated the investment of time, expertise and energy required to make them anywhere near as good as the Google Maps of this world. Let's see how it can happen.

## Assumed user benefits

Product teams are drawn to single page apps in the first place because there are some implied or assumed universal benefits to users (and therefore to the bottom line of the business).

There are broadly three user benefits:

1. __Improved user experience__ - because we are providing application-like patterns of interaction, focusing on data and tasks rather than an arbitrary page and document model.
2. __Improved perceived performance__ - because instead of interrupting users' task flow with full page refreshes we can instead manage expectations with visual feedback
3. __It's still the web__ - because we can continue to take advantage of the benefits of the web platform: universal access and device compatibility, no installation, deep linking, sharing, indexing, etc.

These benefits depend on execution, not on the approach we've taken. They do not come free with the approach we've taken or the JavaScript frameworks we have adopted, despite any marketing or hype around it.

Single page apps represent a shift of complexity to browser-based code. Not just away from the server, but in some cases away from browser native features too. We've seen this before. They used to be called _thick clients_. In the latter days of Flash, they were _Rich Internet Applications_. Now, many just refer to them as _web apps_.

Unfortunately, plenty of teams end up creating a mess, because they fail to adapt their approach for developing thick clients applications, where the complexity is concentrated in JavaScript code that runs on the user's device.

## How to create a failing single page apps

Below are five common mistakes I've seen teams make when building a SPA-based product. Unfortunately, each mistake can lead to the next, compounding the overall situation.

### Mistake 1: Under-estimate long-term development and maintenance costs

Many teams simply underestimate the time and cost necessary to make a high-quality single page app.

There are a lot of conspiring reasons for this.

1. Framework marketing and hype tends to focus on the ease of early development work, rather than on long-term maintenance. How many framework marketing sites claim it is 'easy to refactor'. Indeed, the sector has a checkered (but improving) history of breaking API changes and upgrade difficulty.

2. There is low visibility of the true maintenance costs. This is true of all software of course, but many technical managers have limited experience of running the development of JavaScript-heavy apps, so the maintenance and continual improvement tax of single page apps can come unexpected.

3. Refactoring and incremental improvement work is often de-prioritized. In small product companies, front end work is frequently expected to go at a break-neck pace. Continual improvement can be seen as an unnecessary tax on feature velocity. The inevitable end result is seizure due to technical and product debt.

### Mistake 2: Use the single page app approach unilaterally

When we start a project, many dev teams make a default single choice of technical approach to cover all functionality. This usually means that your framework of choice absorbs everything, irrespective of user needs. "We're using React!" screams the developer job advert.

There's nothing to say we need to do this. Using the SPA pattern for everything could be overkill. After all, your run-of-the-mill business app is mostly just a Create-Read-Update-Destroy (CRUD) affair, possibly with one or two key features that are far more valuable with highly interactive, JavaScript-heavy enhancements such as mapping or real-time data visualisation. 

But that doesn't mean the other parts should suffer as a result. We are assuming that the user benefits of creating all functionality with JavaScript apply evenly across a product.

We ask "What framework should we use for this whole app?" up front, rather than "What technical approach best supports this user need?" on a case-by-case basis as we learn more about those user needs during incremental product design and development.

This can mean that progressive enhancement goes out the window from the beginning, sacrificed for the benefit of developer convenience and consistency of tooling and approach. Instead we rely on universal JavaScript operability and assume the framework we have chosen will provide adequate performance and accessibility capabilities out-of-the-box.

We focus far too much on the inputs (the tools we use and the code we write) over the outcomes (the value our product brings to users and customers).

### Mistake 3: Under-invest in front end capability

Complexity in web apps has shifted from back end to front end in the last ten years. But the balance in team capabilities has not always shifted to match. Old attitudes and habits are slower to change than technology adoption.

We've seen the rise of the 'full-stack developer' in this time as a way of dealing with this shift in complexity, but it has occurred more often in name only. The actual shift in expertise to genuinely cover the full stack is lagging behind.

Here is another one of those jokes about full-stack developers.

{% include tweet.html
  text="“Fullstack” developer. <a href=\"https://t.co/yfymQmJJgq\">pic.twitter.com/yfymQmJJgq</a>"
  author="Brian Holt"
  username="holtbt"
  url="https://twitter.com/holtbt/status/977419276251430912"
  date="March 24, 2018" %}

These are a little unfair on individuals, who are just trying to create a rewarding career for themselves. There's a lot of bad and inconsistent advice out there on how to do this.

For me, the full-stack developer mythos distracts from the need to think about the _team_ as the unit of expertise.

In reality, everyone has qualitatively different capabilities. Reducing capability to 'front end' vs 'back-end' is over-simplistic, as is lumping a very broad set of skills into 'full-stack developer'. 

Shifting an existing product team's capabilities more toward the front end to match the shift in system complexity requires a considered combination of training, coaching and recruitment. In other words: investment.

Unfortunately, this investment rarely happens intentionally, by the organisation that needs it, at the team level. Instead, teams are typically expected to learn on the hoof, sometimes at their own expense and in their own time.

Even worse, 'the front end' is often given to an inexperienced developer or intern to figure out by themselves without much in the way of mentoring or training.

On top of all this, the attitude that front end development is easy persists in software development. It is less often explicitly stated these days, but its effects are still visible in how teams are managed and behave.

### Mistake 4: Use naive dev practices

Under-investing in front end skills has knock-on effects.

The relative ease with which we can create working products with JavaScript frameworks is alluring. But naïve development practices can threaten the long-term maintainability of products.

Poor development practices mount up quickly:

* Poor or no test coverage, results in...
* Highly-coupled code, that encourages...
* Over-engineered solutions, that leads to...
* Big monolithic balls of mud, that forces us to deliver...
* Giant asset bundles

All of this makes it vanishingly unlikely that we'll truly deliver on those assumed user benefits we talked about earlier.

Performance in particular is a big problem with JavaScript-heavy apps, and particularly on mobile devices. There have been plenty of recent articles voicing deep concerns about this. While framework maintainers work on improving the situation, we still have our existing apps to deal with.

If you want to improve the situation, you first need an code base that is amenable to improvement. For example, [Addy Osmani's excellent advice in his post about modern JavaScript application performance](#) is hard to implement for existing apps if you don't have well-structured foundations.

Skills in rescuing existing applications are hard to learn, and hard to come by in the employment market. Which leads us to the alternative approach…

### Mistake 5: Surf the waves of framework hype

Once we find ourselves with a poorly executed single page app (using the above four-step plan!), we naturally want to do something about it.

This is a very dangerous situation. It's here where we can really do serious damage to the business.

It's all too easy to blame a poorly executed app on the technology and tools that were used to create it.

In this case, the primary target for our rancour is the JavaScript application framework we chose. After all, all that shiny marketing and positivity at the outset promised us a Google Maps or at least something we'd enjoy working on.

Our team's inability to move the product forward at speed; the redesign of that core piece of functionality that took six months instead of six weeks; those two developers that left the company out of frustration.

All of these are easily blamed on the technology we chose just a couple of years ago. (Or that _someone else_ chose a couple of years ago.)

So we naturally look at alternatives.

And the rapidly changing attitudes of the wider JavaScript community provide plenty of alternatives to tempt us.

The regularity with which new JavaScript frameworks have risen to popularity in the last five years seems to closely match the cadence at which product teams get frustrated with their technology choices. Is this a coincidence?

The Gartner Hype Cycle gives us a clue. This infamous chart plots the visibility of a technology over time.

Could it be that product teams complain about their web app about here...

![The Gartner Hype Cycle, showing the visibility of technology over time. The visibility takes a sharp dip after 'the peak of inflated expectations'.](/images/posts/how-to-fail-at-single-page-apps/hype-cycle1.jpg)

... just as an alternative tool is rising in popularity and hype?

![Two Gartner Hype cycles, with React and Vue.js staggered one after the other](/images/posts/how-to-fail-at-single-page-apps/hype-cycle2.jpg)

In extreme cases we can end up in a situation like the one below, as various attempts to rewrite a whole app or significant parts of it are undertaken, leaving behind a trail of frameworks throughout the code.

![Lots of cycles, one after the other, focusing on hype only](/images/posts/how-to-fail-at-single-page-apps/hype-cycle3.jpg)

This is the [developer experience bait-and-switch](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/), robustly described by Alex Russell.

I may have been responsible for allowing something like this to happen in a rapidly growing product myself. I apologise unreservedly to anyone I've ever worked with who had to deal with this.

The fickleness in the JavaScript community has died down a little in the last few years. We may actually be seeing some coalescence around component-based approaches as offered by 'ecosystems' like React, Angular or VueJS.

But there is still plenty of flapping around framework add-ons and sub-systems like state management, CSS approaches and the use of platform native capabilities. Change is constant, but inconsistent.

Even if you're a committed vanilla JS (no framework) advocate, there is still change around build and developer tooling, dependency management, utility libraries and the web platform itself to contend with. Not using a framework at all doesn't sidestep the problem.

## So, what's the solution?

This article is far too negative and long enough thank you, so I'll be looking at approaches to getting out of this mire in a future post.

The common thread of the problems I've identified above is not technology, but people. We focus far too much on technology as the solution to problems that are not based in technology.

We don't talk enough about team structure, dynamics, skills and capabilities, about the cost of writing and maintaining single page apps, and about healthy and sustainable long-term software development practices.

That should give you some clue as to how product teams can start to address the situation.
