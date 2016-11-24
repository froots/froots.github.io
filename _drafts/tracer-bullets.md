---
layout: post
title: Shoot Down Front-End Fatigue With Tracer Bullets
date: '2016-11-24 12:00'
description: >-
  Modern front-end engineering is beset by overwhelming choice. We can address it together by using an underused agile practice known as Tracer Bullet Development.
intro: >-
  Yes, another hot take reckon on front-end fatigue. This one talks about tracer bullets, though, which sound fast and exciting.
twitter_card:
  type: summary_large_image
  image: /images/posts/2016-11-24/tracer-og.jpg
og_data:
  image: /images/posts/2016-11-24/tracer-og.jpg
hero:
  src: /images/posts/2016-11-24/tracer.jpg
  alt: Fireworks
  caption: Photo
  credit:
    name: Jimmy Musto
    url: https://unsplash.com/@jmust13
---

The experience of overwhelming choice and complexity that we refer to as _front-end fatigue_ is not unique to front-enders or even developers generally. It's just that barriers to entry for creating front-end tools, approaches and libraries are so low.

A lot of choice could be good for the field as a whole, but individually we can experience choice paralysis and stress when deciding what to focus our learning on, or when choosing an approach for the projects we work on.

American psychologist Barry Schwartz refers to this as the [_Paradox of Choice_][5]. Essentially, unbounded choice is often paraded as an objectively good thing, but the experimental evidence suggests that too much choice can impact decision making behaviour. Think of those giant menus at your local restaurant, or the store with 50 kinds of jean. [Barry talks about his preference for crappy ill-fitting jeans][1] in this TED talk. He is not a sartorial man.

Choosing a technology or framework to learn or to use for a project is particularly daunting, because the choice can have long-term implications. So we also experience the opportunity cost of _not_ using the alternatives. As soon as any little thing goes wrong with our framework of choice, we start questioning are decision, and can become susceptible to alternative arguments. This is why _[Previously Uncontroversial Technology] Considered Harmful_ posts drive so much traffic.

All-in-all, this leaves us in a constant state of dissatisfaction with our own set of knowledge and the choices we've made on projects.

## Collective Contextual Learning

It bothers me a little that [advice][2] for [dealing with front-end fatigue][3] focuses on individual actions. Although the authors are being helpful, some of the advice is dogmatic and too general. Individual study plans and attitude adjustments are fine, but they have to take account of individual needs.

We can also benefit from a collective approach with some goal-driven learning, accountability and support. That's what I'm going to bang on about here.

If you work in a project team, constant learning should be built in to the fabric of what you do. I've learned something from every project I ever worked on, whether I was aware of it at the time or not. It makes sense to embrace it as part of the work.

You'll see this at the core of lean approaches. _Lean UX_, _lean customer development_, _lean agile_. All of these things emphasise collective learning driven by experimentation as the engine for product development.

Anchoring learning to the specific goals of a project provides it with direction and meaning. That's a big contrast to the generic marketing approach taken by library maintainers, developer evangelists and so on. They can only present generic capabilities. It's up to you to learn whether these capabilities will address your project needs.

Instead of asking 'Do we all need to learn React and Redux because that's where the industry is headed?' we should ask 'What benefits will using React and Redux for this project give us?'

And if you work individually on projects, you need to be wary of using projects as a guinea pig for your general learning goals. This is why we have text-heavy blogs written in Angular with over-engineered client-side routing.

## Exposing assumptions and hypotheses

Imagine you work in a team of 6 people, and you've been tasked to create a new web-based custom CRM tool to be used by MegaSalesCorp's field sales staff. It's natural for developers on the team to start mentally exploring technology choices and architecture almost immediately. Even before the audience and scope of the project have been defined. We can too easily jump to solutions based on general assumptions and accepted dogma.

What follows might be a loose game of negotation to get to some consensus. Or someone in a leadership role might just unilaterally impose a direction for the team to follow. Neither approach is great.

Instead, I suggest starting the project by gathering your team's assumptions about technology choices, approach and architecture, and make them explicit. Turn them into specific hypotheses of the form:

> We believe that adopting Redux will provide a predictable and robust way to manage data flow through the MegaSales RealTimeCRM dashboard"

You might have a whole bunch of these. Start with a small number of the most important ones. What are the really gnarly, controversial problems?

## Testing hypotheses

The next question is: How do you properly test these hypotheses?

You could:

* _Create a prototype_: Prototypes are really for testing user interfaces with real users. They get thrown away once you've learned what you needed to. This is about testing development approach and technology choice.
* _Spike a solution_: A 'spike' is where you rapidly develop a scrappy solution using candidate technology. It can help at very early stages, but because you haven't written production-quality code or tests or got your code into production, your'e not really testing what it's like to live with the choice in the long term
* _Create a proof of concept_: This sounds like a weird combination of a prototype and a spike. I don't really know what people mean when they say this.
* _Do some research_: This will help, but you're in danger of analysis paralysis.

So, how can we test or hypothesis under realistic conditions? Enter the _tracer bullet_.

## Tracer Bullet Development

Andy Hunt and Dave Thomas first wrote about tracer bullets in _[The Pragmatic Programmer][4]_ back in 1999. I think it's an approach that a lot of front-end developers could benefit from.

The idea is to pick a tiny user-facing feature and get it running in a production environment. Along the way, you do all the things that you would do to get something into production. You write tests, write production-quality code, set up automated continuous integration and continuous delivery pipelines, commission production hardware, set up monitoring and solve all the tiny annoyances that crop up randomly when shoving code onto production servers.

Instead of missing a deadline because you waited too long, you front-load the hard-to-estimate job of shipping to the start of the project.

(Note that the idea is not about getting stuff in front of users, though you can do that too. 'Shipping' here just means getting software on final production systems).

You might be integrating with systems that don't exist yet. Don't wait. Those can be stubbed out with canned responses using an agreed-upon contract at the joins.

By front-loading all of this work, your team will probably learn an enormous amount about what the system will be like running in production.

If you ship later, you're only learning what it's like to work with a development environment. And this is the big point: modern front-end engineering has embraced the build step. It used to be that the code you ran during development was the same code that ran in users' browsers. That's not the case any longer.

What's more, browsers present "the most hostile software engineering environment imaginable". Getting production code to browsers early gives you more time to address performance issues, cross-browser bugs and other fun stuff that front-end engineers _really_ enjoy.

## A tracer bullet example

I first came across tracer bullet development when working on Sky TV's web-based programme guide. We were considering using Backbone.js, which has only recently been released. We decided to test out whether Backbone would help us write an app that could lazy-load a lot of scheduling data from a yet-to-be released API as the user scrolled both vertically down a channel list, and horizontally across a full day schedule.

To do this, we performed two tracer bullet experiments. The first just involved requesting a canned list of channels to the page, and the second involved scrolling across a full day's worth of programme data, to test assumptions about rendering, scrolling and lazy loading performance challenges. We had identified these as being key to the success of the app.

Along the way, we also worked on small spikes, usually before a tracer bullet. These are quick-and-dirty hands-on research exercises to poke at a possible solution. They differ from tracer bullets because they are designed to be thrown away. No production code and no tests.

In this example, our initial choices worked out well enough. But there were changes of tack along the way. jQuery plugins had to be dropped for performance reasons. We refactored the whole Backbone view component tree because of design changes. Those are still not easy, but if you have a full pipeline to production in place, it makes these challenges less likely to put your whole project at risk.

By committing to shipping early, you're not necessarily committing to a specific approach early. Instead, you should focus on [optimising for deleting code][6]. You're aim is to learn as much about your solution in a realistic setting.

## Experiments

So, you should be able to see how you can use tracer bullets like these to test the specific hypotheses you've gathered right at the beginning of the project. You might even write a feature with two or three different frameworks or libraries to allow your team to make an informed decision about how to proceed for the rest of the project.

It's important that these experiments are written using production-quality code and released to a production environment. A quick-and-dirty proof of concept or spike tells you little about the qualities of software running in the wild, or what it will be like to maintain over a long period of time.

You might find that that lauded framework just doesn't cut it for your use case. It's better to find that out at the start of project when correcting it is cheaper.

## Applied learning

There are other big benefits to tracer bullet development.

By setting a clear path to production early on, and making explicit choices, you are providing a framework and set of constraints for how development work is done. This is important. Junior developers in particular may need more explicit guidance on how to contribute. It's why some people love opinionated frameworks like Rails and Ember.

You're also embracing and embodying learning in the development process. You're collectively admitting to not knowing what you're doing until you try it. And even then, decisions can be reversed later if new discoveries come to light. You've accidentally set up a shared learning environment.

In that Sky project, none of us had used Backbone before, so there was a good spirit of working it out as we went along. It was also on this project that I really focused on improving my JavaScript unit testing skills. It was on-the-job learning, but it wasn't just tolerated with separate study time, _it was how the team worked_.

Of course, I'm embarrassed to look at the code now, and I wonder what it would have been like to write it in React, or Elm, or with ES6, or with RxJS.

But I'm not embarrased about the approach we took and how much we learned in the course of that project.

And we shipped on time too.

[1]: https://www.ted.com/talks/barry_schwartz_on_the_paradox_of_choice
[2]: https://www.smashingmagazine.com/2016/11/not-an-imposter-fighting-front-end-fatigue/
[3]: https://medium.freecodecamp.com/a-study-plan-to-cure-javascript-fatigue-8ad3a54f2eb1#.one6kd167
[4]: https://www.amazon.com/Pragmatic-Programmer-Andrew-Hunt/dp/020161622X
[5]: https://www.amazon.com/Paradox-Choice-Why-More-Less/dp/0060005696
[6]: http://programmingisterrible.com/post/139222674273/write-code-that-is-easy-to-delete-not-easy-to
