---
layout: post
title: How ethnography can help you understand code
date: '2018-08-29 00:00'
description: >-
  Becoming productive when joining an existing product team is more about understanding the social and cultural context than it is about getting your head round the code.
twitter_card:
  type: summary_large_image
  image: /images/posts/how-ethnography-can-help-you-understand-code/team-og.jpg
og_data:
  image: /images/posts/how-ethnography-can-help-you-understand-code/team-og.jpg
hero:
  src: /images/posts/how-ethnography-can-help-you-understand-code/team-hero.jpg
  alt: A team discusses a design
  caption: Photo
  credit:
    name: Štefan Štefančík
    url: https://unsplash.com/photos/UCZF1sXcejo
thumb:
  image: /images/posts/how-ethnography-can-help-you-understand-code/team-thumb.jpg
  alt: A team discusses a design
---

Last month, Harry Roberts described how he goes about [getting to know a legacy CSS codebase](https://csswizardry.com/2018/07/getting-to-know-a-legacy-codebase/). It's a really useful post full of great technical advice and tool suggestions for tackling CSS code archaeology.

But one thing about Harry's post stuck out. For me, __he underplays the importance of talking to people about how the codebase got into its current state__.

Harry's post describes an individual journey of discovery, by poking around in the code using analysis tools and techniques. Only towards the end does he mention talking to team members as a valuable source of insight.

This reflects our instincts as developers to get to grips with code. As a new team member, getting your head down into code is the obvious first thing to do. After all, the code itself is the focus and end point of all our work as software developers, isn't it?

## Code archaeology

There's plenty of guidance and tooling for undertaking _code archaeology_ on the web. Most of it focuses on procedural languages and enterprise systems. Harry's post is useful because there is relatively little out there that focuses on CSS. You'll come across systematic techniques such as static analysis, reverse engineering and code walk-throughs.

But for me, by far the most valuable way of gathering information about an existing software product is to __talk to the people that have worked on it__.

After all, real-life archaeologists usually don't have the benefit of talking to the people that lived the lives they are trying to find out about. But we usually do.

Current and previous team members can take you through the history of the work, the key decisions that were made, the background behind apparently odd choices, and the impact that company culture and priorities have had over time. Why dig around in code when you have this rich vein of data to draw on?

Awareness of the the team's social dynamics and the history of their decision-making are far more valuable insights than those given up by looking at git history or current file structures.

This is not code archaeology. It's __team anthropology__.

## We're all instinctive anthropologists

It's possible that we take these team insights for granted because much of it happens naturally. When we join a new team, we are rarely told just to get on with it in isolation. That's not really an onboarding strategy.

Instead, the existing team share their war stories with us over lunch, during pair-programming sessions, in sprint planning, in the corridor and at the company social event.

Like that time that Josh brought down the production system by running an untested SQL query on the production database; or when the Denise, Paolo and Maria had to work long hours because of an unrealistic partnership deal deadline, and so ended up writing some of the worst code in the system. If we were to stumble on that same knot of code with only the context provided by curse-laden commit messages, we wouldn't get the same insight.

Because we come across these stories in the natural course of socialising into the team, we can easily miss the impact they have on our understanding of the project, and over-estimate the impact of code inspections.

## Taking inspiration from ethnography

If we embrace the importance of informal team anthropology, why not embrace some more formal research techniques from the discipline?

_Ethnography_ has origins in 18th Century western imperialist expeditionary research, but it has shaken off those connotations and is now a widely used research approach, not least in software development.

Ethnographers take part in various research methods, including _participant observation_, which involves embedded observation, interaction and participation with a group over a long period of time. They gather large amounts of descriptive, qualitative data, which they write up as an account of the group's culture, itself called an _ethnography_. Yes, you _do_ ethnography in order to create _an_ ethnography.

These techniques have been used increasingly in software development in the last twenty years, particularly by global technology companies with a vested interest in understanding how technology can fit within existing cultural and social systems. Some groundbreaking uses of ethnographic research methods for software design were developed by Genevieve Bell and Tony Salvador at Intel in the late 1990s, for example.

But we can also take inspiration from ethnographic research methods when we join a team. Taking part in team rituals, interviewing team members, observing group behaviours, taking note of stories, shared beliefs, cultural constraints and recording important artifacts. These are some of the things that ethnographers focus on.

## The ethnographer mindset

Approaching team socialisation with an ethnographer's mindset really helps to make this process more explicit. Kelly Moran [describes three key factors for ethnographic research in software design](http://www.methodsandtools.com/archive/softwareethnography.php):

### 1. Description

The aim is to _describe_, not quantify. We are interested in _thick descriptions_. For example, a description of someone winking as 'closing and opening of one eye' has no cultural content and explains nothing of what happened before and after. We need more information to understand the intent and meaning.

### 2. Context

Research must take place in the participants' environment. In other words, conduct field work, not laboratory work. We should also resist studying artifacts (like codebases) in isolation from their social and cultural context. The importance of this is clear to anyone who has joined a new team. You can be the world's most knowledgeable programmer, but still be flummoxed by unfamiliar team language and jargon.

### 3. Shared perspective

We must recognise that we bring our own biases to observations of another group. An objective appraisal is impossible. For example, if a team collectively disdains test-driven development, a new member who is a big believer in it will struggle to describe the team's beliefs impartially. Recognising this fact is important. We shouldn't pretend we are objective, but we should also make an effort to learn more about others' perspectives and language.

## Explore the social context first

The artifact that is a project's codebase is just one product of the social and cultural system to which we belong as software developers. By our relentless focus on the technical, we've been taught to think of code as being free of social, cultural and political meaning.

But team-based software development is a social endeavour first. If we fail to treat it as such and act as if joining a team is just a matter of getting our head round a collection of technical artifacts, we'll quickly run into problems that no amount of code will warn us about.

Instead, if we can develop a sensitivity to the language, shared beliefs and social systems of the team, we're far more likely to help that team create positive and meaningful change, both to the code, and the way they work together.

---

If you want to find out more about ethnography in design and software, check out these resources:

* [An Ethnographic Approach to Software](http://www.methodsandtools.com/archive/softwareethnography.php) - Kelly Moran
* [[PDF] Design Ethnography](https://www.ida.liu.se/~TDDD32/docs/DesignEthnography.pdf) - Tony Salvador, Genevieve Bell and Ken Anderson
* [[Video] Engineers, Go Wild!](https://www.youtube.com/watch?v=OudPLC-N7fc&index=28)
* [[Video] Genevieve Bell interview](https://www.youtube.com/watch?v=b0VsRmr0v9E)
* [[Video] Learning from your users: Ethnography in Software](https://www.youtube.com/watch?v=Guy-COUbDqI) - Kelly Moran

There's also a wonderful niche of research focusing on ethnographies of agile software development teams, for example this PhD thesis: [[PDF] Everyday Practices of Agile Software Developers](https://opus.lib.uts.edu.au/bitstream/10453/20388/5/02Whole.pdf)
