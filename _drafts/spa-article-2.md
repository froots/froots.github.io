---
layout: post
title: TODO
date: '2018-10-30 00:00'
description: >-
  TODO
twitter_card:
  type: summary_large_image
  image: /images/posts/create-your-own-dysfunctional-single-page-app/og.jpg
og_data:
  image: /images/posts/create-your-own-dysfunctional-single-page-app/og.jpg
---

Step 0:

    * Psychological safety & blame-free approach
    * Acceptance that the problem is not just technical
    * Team and practices first, then tech

Remedial ideas from mistakes:

1. Under-estimate long-term development and maintenance costs

    * Increase situational awareness
    * Increase visibility of maintenance costs - expose waste using value stream maps
    * Create space for incremental improvements - cost of 100% utilisation, heuristics for proportion of effort on maintenance and improvement
    * Seek out prior art on long-term maintenance approaches, idiomatic patterns, refactorings

2. Use the SPA approach unilaterally

    * Focus on user needs first and develop approaches from there
    * Don't change approach for existing functionality for the sake of it
    * Good reason to switch: causing a lot of pain, user needs better served by a different approach

3. Under-invest in FE capability

    * Abandon your unicorn hiring policy
    * Allow teams to determine their own needs
    * Re-balancing
    * Hiring
    * (Cross-)Training
    * Mentoring

4. Use naïve dev practices

    * Identify a target problem area
    * Address the points in turn in rapid end-to-end iterations, i.e.
    * Test coverage - E2E characterization tests
    * Biggest riskiest knot first - de-couple. Read up on refactoring.
    * Test your ability to make changes
    * Don't give up too easily. The hardest part is the beginning
    * Work together - mobbing and pairing are great for motivating each other
    * Consider breaking up smaller apps, especially where multiple teams are working on the same repo and deploy pipeline
    * Make use of modern tooling for lazy loading and code splitting. But it's not the only approach. Gradual move to mini apps is possible.

5. Surf the waves of framework hype

    * Assess the benefits of making a shift for yourself.
    * Ignore _Why We Moved From X to Y_ articles and other framework marketing
    * Consider the benefits of boring technology
    * Plan it as a long-term migration, not a big bang rewrite
    * Expect it to take way longer than you think
    * Reduce risk by reducing cycle times relentlessly and releasing continuously
    * Benefit is not from better framework, but better practices and shared knowledge
    * Rewriting is deliberately forgetting and attempting to relearn.
    * Migrating forces you to learn the inherent value in the app, and assess whether it still holds or not. Chance to review product and design debt too.
