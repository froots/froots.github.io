---
layout: post
title: Create your own dysfunctional single-page app in five easy steps
date: '2018-10-30 00:00'
description: >-
  Single-page apps can be hard for product organisations to execute well. Here are five common mistakes I've seen. Spoiler: they are mostly about people rather than technology.
twitter_card:
  type: summary_large_image
  image: /images/posts/create-your-own-dysfunctional-single-page-app/og.jpg
og_data:
  image: /images/posts/create-your-own-dysfunctional-single-page-app/og.jpg
---

Single-page web applications damage businesses.

OK, now that we have the attention-grabbing, controversial introductory premise out of the way, I want it to be known that I love a well-executed single-page app (SPA) as much as the next JavaScript developer – in the right circumstances.

But I do believe my opening statement is true for many organisations that have gone head first into developing an all-JavaScript browser-based app without asking themselves whether it's necessary, whether they are set up to succeed or what the alternatives could be.

## The Vision

It's all too easy to look at prime examples of single-page apps like Google Maps and think _"we could build something like that!"_

After all, it's just a website, right? There are open source JavaScript frameworks like React and Angular that can help us build it. Other teams have built amazing things with these technologies. We know because we use them ourselves all the time.

But it's far easier to create a single-page app that doesn't fulfil this vision. We can easily end up with a sluggish app that resists improvement and repels new features. There is a very long tail of quality in JavaScript apps, especially in enterprise settings.

I've seen this often in my consulting work with product teams. They can struggle with single-page apps because they underestimated the investment of time, expertise and energy required to make them anywhere near as good as the Google Maps of this world. 

Let's look at how this can happen. Spoiler alert: it's got very little to do with the technology and a lot to do with teams and people.

## Assumed user benefits

Product teams are drawn to single-page apps in the first place because there are some implied or assumed universal benefits to users (and therefore to the bottom line of the business).

Curiously, we don't often talk about the user benefits of SPAs, preferring to talk about features and characteristics instead.

I think are three broadly assumed user benefits of single-page apps:

1. __Improved user experience__. We are providing application-like patterns of interaction comparable to native desktop or mobile apps, focusing on data and tasks rather than an arbitrary page and document model.
2. __Improved perceived performance__. Instead of interrupting task flow with full page refreshes we can provide visual feedback, and allow users to continue other tasks in parallel.
3. __It's still the web__. We can take advantage of all the benefits of the web platform: universal access and device compatibility, no installation, deep linking, sharing, indexing, etc.

These benefits depend on execution, building on the approach we've taken. They do not come free with the JavaScript frameworks and libraries we have adopted, despite any messages propagated by marketing or hype.

Single-page apps represent a shift of complexity to browser-based code. Not just away from the server, but in some cases away from browser-native features too. We've seen this before. They used to be called _thick clients_. In the latter days of Flash, they were _Rich Internet Applications_. Now, many people just refer to them as _web apps_.

Unfortunately, plenty of teams end up creating a mess, because they fail to adapt their approach for developing thick clients applications, where the complexity is concentrated in JavaScript code that runs on the uncertain and varied computing environment that is a user's device.

## 5 mistakes to create a dysfunctional single-page app

Below are five common mistakes I've seen teams make when building a SPA-based product. Each of these are people or practice problems that we often interpret as pure technology problems.

Unfortunately, each mistake can lead to the next, compounding the overall situation.

### Mistake 1: Under-estimate long-term development and maintenance costs

Many teams underestimate the time and cost necessary to make a high-quality single-page app.

There are a lot of conspiring reasons for this.

#### Framework marketing focuses on the early developer experience

Framework marketing and discussion tends to focus on the ease of early development work, rather than on long-term maintenance. How much of the framework marketing makes claims of helping you to write code that's easy to refactor? Not much. Likewise, educational resources around refactoring are rare compared to the army of introductory tutorials.

#### Low visibility of the true maintenance costs

This is true of all software of course, but many technical managers have limited experience of running the development of JavaScript-heavy apps, so the maintenance and continual improvement tax of single-page apps can come unexpected if you haven't been there.

#### Incremental improvement work is de-prioritised

In small product companies, UI product work is often expected to go at a break-neck pace. Continual improvement, refactoring and gradual long-term migration work can be seen as an unnecessary tax on feature velocity. The long-term result can easily be utter seizure due to technical and product debt.

### Mistake 2: Use the single-page app approach unilaterally

This mistake reflects the most common argument against using the single-page app approach. It's not the right approach to take in many circumstances.

When we start a project, many development teams make a single default choice of technical approach to cover all anticipated functionality. This usually means that your framework of choice absorbs everything, irrespective of user needs. "At BobsWidgets we use React!" screams the developer job advert.

This pre-emptive decision-making can be risky. Using the SPA pattern for everything can be overkill. After all, your typical business app is a Create-Read-Update-Destroy (CRUD) affair – possibly with one or two key features that demand a genuinely dynamic, data-driven UI. Mapping and real-time data visualisation are obvious examples.

But that doesn't mean the other parts should suffer as a result. We are assuming that the user benefits of creating all functionality with JavaScript apply evenly across a product. I'm not convinced from what I've seen.

We ask "What framework should we use for this whole app?" for new products up front, when we don't even understand what we're building yet. It's far less wasteful to ask "What technical approach best supports this user need?" on a case-by-case basis as we learn more about those user needs during incremental product design and development.

This up front decision making often means that progressive enhancement (PE) goes out of the window immediately, sacrificed for the benefit of developer convenience and consistency of tooling and approach. Instead we assume universal JavaScript operability and hope the framework we have chosen will provide adequate performance and accessibility capabilities out of the box.

This is just one example of a collective bias towards focusing on work inputs (the tools we use and the code we write) over their outcomes (the value our product brings to users and customers).

### Mistake 3: Under-invest in front end capability

Complexity in web apps has shifted from back end to front end in the last ten years. Or, more accurately, we're attempting to offer more capability, which results in more complexity overall. The front end is taking on most of this new complexity.

Front end JavaScript application development patterns are still in a developing phase, in the face of a rapidly evolving language, web platform and uncertain execution environments. This means more work has to go into providing equivalent complexity than in the back end.

The balance in product team capabilities has not always shifted in line with this. Perhaps attitudes and habits are slower to change than technology adoption.

We've also seen the rise of the _full-stack developer_ role in recent years. This is the industry's collective attempt to deal with this shift in complexity as cheaply as possible, by forcing these skills to become a commodity. While individuals with genuinely incredible full-stack expertise do exist, they are rare, and not easily accessible to most companies.

The industry hypothesis that the full-stack developer represents is that software development expertise is portable from back end to front end without the need for a lot of expensive re-training. The same set of principles apply. This is true to some extent, but does not magically apply to knowledge of the web as a medium and platform. The transferability of skills is partial at best.

Here is one of the many jokes about full-stack developers:

{% include tweet.html
  text="“Fullstack” developer. <a href=\"https://t.co/yfymQmJJgq\">pic.twitter.com/yfymQmJJgq</a>"
  author="Brian Holt"
  username="holtbt"
  url="https://twitter.com/holtbt/status/977419276251430912"
  date="March 24, 2018" %}

These jokes are a little unfair on individuals, who are just trying to create a rewarding career for themselves. (There's also a lot of bad and inconsistent advice out there on how to do this, by the way.)

For me, the full-stack developer mythos distracts from the need to think about the _team_ as the unit of expertise.

In reality, everyone has qualitatively different capabilities and potential. Reducing capability to _front end_ vs _back end_ is over-simplistic, as is lumping a very broad set of skills into the _full-stack developer_ role. It's symptomatic of treating individuals as commoditised resources.

Shifting an existing product team's capabilities more toward the front end to match the shift in system complexity requires a considered combination of training, coaching and recruitment. In other words: investment.

Unfortunately, this investment rarely happens intentionally, by the organisation that needs it, at the team level. Instead, teams are typically expected to learn on the hoof, sometimes at their own expense and in their own time.

Even worse, front end work is often given as an isolated piece of work to an inexperienced developer or intern to figure out by themselves without much in the way of mentoring or training. Learning on the job, in the W. Edward Deming sense, is fine. But leaving someone inexperienced to do it without guidance doesn't count.

Underlying much of this is the persistent belief that front end development is relatively easy. As an opinion, it is stated overtly less often now, but its impact can still be seen in the way that teams behave and are managed.

### Mistake 4: Use naïve dev practices

Under-investing in front end skills has knock-on effects.

The relative ease with which we can create working software with JavaScript frameworks is alluring. But naïve development practices can threaten the long-term maintainability and quality of products.

Poor development practices reinforce each other:

* Poor or no test coverage, results in...
* Highly-coupled code, that encourages...
* Over-engineered solutions, that leads to...
* Big monolithic balls of mud, that forces us to deliver...
* Giant monolithic asset bundles

All of this makes it unlikely that we'll deliver on those assumed user benefits we talked about earlier.

[Performance in particular is a big problem with JavaScript-heavy apps](https://www.youtube.com/watch?v=4bZvq3nodf4), and particularly on mobile devices. While framework maintainers are working hard to improve the situation, we still have our existing apps to deal with.

If you want to improve the situation, you first need a code base that is amenable to improvement. For example, [Addy Osmani's excellent advice in his post about modern JavaScript application performance](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4) is hard to implement for existing apps if you don't have well-structured foundations.

Skills in the gradual rescuing, rejuvenation, profiling and speeding up of existing JavaScript applications are hard to learn. So they are hard to come by in the employment market. Which leads us to the alternative approach…

### Mistake 5: Surf the waves of framework hype

Once we find ourselves with a poorly-executed single-page app (using our simple four-step plan!), we naturally want to do something about it. This is a very dangerous situation. It's here where we can do serious compounding damage to the business.

It's all too easy to blame a failing app on the technology and tools that were used to create it. In this case, the most common target for our rancour is the JavaScript application tooling we chose. After all, all that shiny marketing and positivity at the outset promised us a Google Maps or at least something we'd enjoy working on.

Our team's inability to move the product forward at speed; the redesign of that core piece of functionality that took six months instead of six weeks; those two developers that left the company out of frustration; the poor UX and performance. These are easily blamed on the technology we chose a couple of years ago. (Or that _someone else_ chose a couple of years ago.)

So, we look at the alternatives.

And the quickly changing attitudes of the wider JavaScript community provide plenty of alternatives to tempt us.

The regularity with which new JavaScript frameworks, libraries and their associated ecosystems have risen to popularity in the last five years seems to match the cadence at which product teams get frustrated with their technology choices. Is this a coincidence?

I'm going to make a questionable argument in favour of this using The Gartner Hype Cycle. This infamous chart plots the visibility of a technology over time.

Could it be that product teams complain about their web app about here...

![The Gartner Hype Cycle, showing the visibility of technology over time. The visibility takes a sharp dip after 'the peak of inflated expectations'.](/images/posts/how-to-fail-at-single-page-apps/hype-cycle1.jpg)

... just as an alternative tool is rising in popularity?

![Two Gartner Hype cycles, with React and Vue.js staggered one after the other](/images/posts/how-to-fail-at-single-page-apps/hype-cycle2.jpg)

In extreme cases we can end up in a situation like the one below, as various attempts to rewrite a whole app or significant parts of it are undertaken, leaving a trail of frameworks and libraries throughout the code.

![Lots of cycles, one after the other, focusing on hype only](/images/posts/how-to-fail-at-single-page-apps/hype-cycle3.jpg)

This is another way of illustrating the [developer experience bait-and-switch](https://infrequently.org/2018/09/the-developer-experience-bait-and-switch/), as described robustly by Alex Russell.

I _may_ have been responsible for allowing something like this to happen in a rapidly growing product myself. I apologise unreservedly to anyone I've ever worked with who has had to deal with this. But I wouldn't be the only one, by a long shot.

The fickleness in the JavaScript community has died down a little in the last few years. We may actually be seeing some consolidation around component-based approaches as offered by _ecosystems_ (don't say _framework_) like React, Angular or VueJS.

But there is still plenty of churn around other application capabilities like state management, handling of CSS and the use of platform native capabilities. Change is constant, but inconsistent.

Even if you're a committed vanilla JS (no framework) advocate, there is still change around the JavaScript language itself, build and developer tooling, dependency management, utility libraries, browser support and the web platform itself to contend with. Not using a framework at all doesn't sidestep the problem.

## So, what's the solution, Mr. Grumpy?

This article is far too negative and long enough thank you, so I'll be looking at approaches to getting some way out of this mire in a future post.

Few teams will have encountered all five of the problems above. They can surface at different times in a product's lifecycle.

As pointed out at the start, the common thread of the problems I've identified above is not technology in itself, but people. We focus far too much on technology as the solution to problems that are not based in technology.

We don't talk enough about team structure, dynamics, skills and capabilities, about the cost of writing and maintaining multi-platform asynchronous browser-based software, and about healthy and sustainable long-term software development practices.

That should give you some clues as to how product teams can start to address the situation.

---

This article is based on my talk [_How to Survive the Single-Page App-ocalypse_](https://www.youtube.com/watch?v=1SRO-1HBE6E), first presented at _The Lead Dev London_ conference in June 2018. [Slides for this talk are available on Noti.st](https://noti.st/froots/ICNNZT/how-to-survive-the-single-page-app-ocalypse).
