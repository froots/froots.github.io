---
layout: post
title: How to prevent big front-end rewrites with lean technology choices
date: '2018-01-26 00:00'
description: >-
  Front-end technology choices should not feel like such a risky long-term commitment. Here's how to use lean engineering principles to tread softly through the maze of front-end tech. 
canonical: https://medium.com/cto-craft/how-to-prevent-big-front-end-rewrites-with-lean-technology-choices-103841b5f024
twitter_card:
  type: summary_large_image
  image: /images/posts/how-to-prevent-big-front-end-rewrites/lizard-og.jpg
og_data:
  image: /images/posts/how-to-prevent-big-front-end-rewrites/lizard-og.jpg
hero:
  src: /images/posts/how-to-prevent-big-front-end-rewrites/lizard-hero.jpg
  alt: A gecko leaps across a gap
  caption: Photo
  credit:
    name: Denny Luan
    url: https://unsplash.com/photos/ovm_b91yEgY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText
thumb:
  image: /images/posts/how-to-prevent-big-front-end-rewrites/lizard-thumb.jpg
  alt: A gecko leaps across a gap
---

You have probably read articles on front-end technology choices and big rewrites along the lines of _Why SnackWoot switched from Angular to React_, which might make for interesting reading, but they should come with a health warning that goes beyond ‘your mileage might vary’.

Articles of this type usually present explicit criteria that were used to make the decision, such as performance or documentation quality. Some also present the rational decision-making process by which the criteria were evaluated and the final choice made. In reality however, technology choices are made in wildly varying circumstances. They are influenced at least as much by implicit personal biases and interpersonal effects that play out over time.

To make good choices, you need an approach that allows you to focus on the needs and constraints of your own users, product, team and organisation. The goal is not necessarily to make rational, correct decisions, but **appropriate and sustainable ones.**

## Front-end change is a fact of life

In the user-facing parts of a modern product, evolution is the norm. Even in a mature product, user-facing changes happen at a much faster rate than in back-end systems. A REST API transforms more slowly than the client applications that are built around it; by comparison, the database schema is glacial. What’s more, rapid development of the web platform creates even more pressure for continuous change. In the past, paradigm shifts like Ajax, Websocket and responsive design fundamentally changed web product design — we’re now seeing the same with offline support, progressive web apps (PWAs) and CSS grid.

Change is a constant, so resisting it in your development practices is futile and does no-one any favours.

The ‘big problem’ that usually triggers a front-end rewrite is the difficulty of making changes to the product. This is generally caused by software entropy and mounting tech debt, but the framework can often get a big portion of the blame. And in many cases a shiny new framework is posited as the solution to ‘the big problem’, at least in part. But, this is short-term thinking. How will you prevent the slow creep of software entropy and tech debt with the new framework? Does your choice of technology help prevent it? Or, are you just scratching the itch of the development team?

You should instead be looking to continuously fix small problems using small solutions.

## A lean approach to front-end systems

Since change is a given, you can apply lean principles to front-end technology choices that support continuous improvement instead of trying to fix everything, all at once, with the latest framework. Mary and Tom Poppendieck’s [_Lean Software Development: An Agile Toolkit_](https://www.amazon.co.uk/Lean-Software-Development-Agile-Toolkit/dp/0321150783) presents a collection of ‘lean principles and thinking tools’ for software development — I’ve found three to be especially useful for guiding changes in UI design, architecture and tooling.

### Lean principle 1: Amplify learning

You’ll know from experience that software development is an exercise in discovery; agile and lean practices embrace this. But, often people behave as if they’re just delivering something that is already well known. In the early stages of a product, you may know little about your customers, the problems you are trying to help them with, and how your product will do that. Yet it is common — even at this early stage — to settle on a set of technologies and stick with them throughout the process, long beyond their usefulness.

Choosing a framework early based on popularity and sticking with it implies that you know what problems it will help solve, or that you think it will be applicable to most of the problems you’ll face in the future. If however, you’re learning about customers, the product and business domain as you go, a different approach makes more sense: why not learn about technology in parallel with these efforts?

Instead of focusing on selection criteria and rational decision-making early on, aim to achieve a shared understanding of the constraints your team is working within and let the solution emerge from multiple experiments.

### Lean principle 2: Decide as late as possible

Product development is a ongoing learning process, so it helps to delay big, hard-to-change decisions as long as possible. You’re more likely to make the right decisions when you’re informed by the specific facts of your product, rather than those based on speculation, past experiences and personal preference.

During the search for product-market fit, you won’t want to lock yourself into a single approach. Instead, seek disposability and flexibility so that you learn quickly. Look for good-enough, temporary, off-the-shelf solutions. For more mature products, spend time assessing the suitability of different options against the constraints you’re aware of. Product development takes place over months and years; you should be able to justify short parallel development experiments in the name of ‘technology fit’. Crucially, this doesn’t mean you should over-analyse every single choice along the way. Where constraints are well understood, intuitive decisions based on expertise and experience are often better than rational, analytical approaches.

### Lean principle 3: Empower the team

If you emphasise expertise over process, then develop and empower your team so they can make informed decisions that affect them. Prescribing a supposedly rational collaborative decision-making process with checklists and weighted criteria has the veneer of autonomy, but limits the impact of your teams’ expertise over time.

It’s not enough just to tell your team they have autonomy, either. Poppendieck and Poppendieck also emphasise the importance of enabling ‘local signalling’: making learning visible, holding daily meetings, integrating code frequently and testing comprehensively. The best scrum master I ever worked with spent most of his time creating an environment strong in local signalling.

High team autonomy means you have a chance of responding rapidly to change and building it into your working practices. It’s the foundation for avoiding big rewrites.

## Don’t just default to the most popular choice

Once upon-a-time, front-end choices were limited. A default position existed: just use jQuery and get cracking. Most of the work of complex web applications was in the back-end anyway. Now, however, there is more choice in the JavaScript ecosystem than for any other programming language or platform. With more of the product ending up as browser-based code, making these choices is no longer a trivial matter of little importance.

You need to give the front-end as much care and attention as your back-end systems, and ensure that your team is doing the same. So, before you agree to ‘just use React’, resist the urge to make the decision prematurely and encourage your team to take a more incremental, learning-based approach.

---

This article was originally published on the [CTO Craft](https://medium.com/cto-craft/how-to-prevent-big-front-end-rewrites-with-lean-technology-choices-103841b5f024) blog. Many thanks to [Rachel Murray](https://www.rachelmurray.co.uk/) and Andy Skipper for editing and reviewing it.
