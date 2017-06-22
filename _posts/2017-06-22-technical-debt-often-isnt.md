---
layout: post
title: Technical Debt Often Isn't
date: '2017-06-22 16:30:00'
description: >-
  Developers talk a lot about technical debt. But what about the product and UX debt that often goes along with it?
intro: >-
  I'm not convinced technical debt is always what we think it is. Let me try to explain why.
twitter_card:
  type: summary_large_image
  image: /images/posts/technical-debt-isnt/debt-og.jpg
og_data:
  image: /images/posts/technical-debt-isnt/debt-og.jpg
hero:
  src: /images/posts/technical-debt-isnt/debt-hero.jpg
  alt: Until debt tear us apart
  caption: Photo
  credit:
    name: Alice Pasqual
    url: https://unsplash.com/@downtherabbithole
thumb:
  image: /images/posts/technical-debt-isnt/debt-thumb.jpg
  alt: Until debt tear us apart
---

It's becoming increasingly common to develop products in cross-functional teams using lean, experimental approaches.

A product manager, designers, developers, testers, scrum masters, domain experts and UX researchers take shared responsibility for developing a product. Success is defined by the degree to which they can affect conversion and engagement metrics.

This cross-functional approach is great for rapid customer feedback, 'small batch' iterations, hypothesis-driven experimentation and ultimately can help to make products that customers actually want.

## Product development is messy

In reality, though, products get messy over time. Without diligent housework they will accrue hacks, customer-specific features, vestiges of past experiments and grinding inconsistencies. This in itself is not necessarily bad if users can still do what they need and want to do. But eventually, these things add up and make it increasingly difficult to deliver further improvements.

We tend to call these problems _technical debt_, one of the most exercised terms in software development. I won't write about technical debt here when [Martin Fowler explains it efficiently][1].

Taking on technical debt intentionally can be both a useful lever for gaining rapid feedback, but also a potential ball-and-chain by which product teams can limit their ability to move quickly. Again, Martin Fowler [presents a nice way to think about the pros and cons of technical debt][2].

## It's not just technical...

Because debt is almost always associated with 'technical' aspects of the product, the onus is usually on the developers in the team to manage it and pay it off. This results in pleas to take time out from feature development to pay it down, maintenance sprints, rewrites, team turnover, and other unfortunate problems.

The experimental approach can also take a heavy toll on the front-end of your product. 'Can't we just hack it in to the front-end for now?' is a phrase you might have heard before...

More recently, there has been some recognition that debt is not exclusive to code and systems. The concepts of [_product debt_][3] and [_UX debt_][4] have been used to describe the experiments, custom functionality, and dusty bits of a product that go unloved and untouched, on the assumption that they cost nothing to keep around.

This is emphatically not true. It's called 'debt' for a reason. Leaving it alone incurs interest costs that can only be reduced by paying down the debt. It's just that it's hard to measure the intangible costs incurred by slightly fluffier product concerns (not that measuring technical debt is easy).

## Product debt becomes enshrined

Product teams often choose to forego an elegant approach to a feature because it's too expensive or would take too long. Instead, a quicker but hacky approach is taken to get some quick feedback and deliver value sooner. The intention being to iterate towards a better approach. That's fine, and completely embraces the lean approach.

But then the team moves on to focus on other things. Members of the team leave; new team members arrive. It doesn't take long for the team to collectively forget that that quick UX hack wasn't the favoured long-term approach. It becomes enshrined as a successful part of the product.

It is usually more obvious when technical debt starts becoming a bigger problem. System performance suffers, code is harder to change, big parts of the business logic only exist in UI code.

What's needed is a clear documented history of intentionally incurred debt. There should be no shame in being honest about these decisions, but if they aren't documented and shared, people make all sorts of assumptions about why things are as they are.

## Debt comes as a package

Tech debt, product debt and UX debt are all linked. When a product team adds an experimental feature, they are potentially incurring:

* product debt - e.g. by distracting users from other features or approaches that might be more useful to them
* UX debt - e.g. confusing users by interrupting them
* UI design debt - e.g. by creating special-case design patterns
* tech debt - e.g. by hacking business logic into the UI layer

As long as the whole team is aware of the tactical nature of the work, taking on debt can work well. But the team should also consider what actions will be necessary once the experiment is done - whether it's deleting all aspects of a failed experiment, to embodying a successful experiment in data structures and platform services.

I consider technical debt, product debt and UX debt to be much the same thing.

They are facets of the same organisational behaviour. They are all forms of organisational debt. Just as [Conway's Law][5] holds that your systems will reflect your organisational structure, so does a product's incurred debt over time reveal much about company and team culture and attitudes.

## It's a people problem

I have worked at companies that are so focused on market share and user numbers as a key metric that working on paying off bad technical debt was seen as counter-productive to this effort.

Half the problem was the engineers' tendency to focus on technical aspects of organisational debt. In reality, the separation of engineering and product functions was the source of the problem, from which high levels of closely associated technical and product debt emanated.

Bad debt is often incurred along the seams where regular communication should be happening, but isn't. This is why the UI layer can often be rife with debt, as it's a boundary between product, design and engineering practices.

When talking about 'technical debt', consider its origins and associations with other forms of debt, and encourage your cross-functional team to consider technical, product, design and even organisational change along with code changes.

This makes managing debt a shared concern and responsibility, and not just a by-product of writing code under uncertain circumstances.

[1]: https://www.martinfowler.com/bliki/TechnicalDebt.html
[2]: https://www.martinfowler.com/bliki/TechnicalDebtQuadrant.html
[3]: http://andrewchen.co/product-design-debt-versus-technical-debt/
[4]: https://blog.polkadotlabs.com/user-experience-debt-c9bd265d521b
[5]: https://en.wikipedia.org/wiki/Conway%27s_law
