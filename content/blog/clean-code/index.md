---
title: Clean Code
date: "2016-06-16T09:43:31.169Z"
description: Does clean code matter? or is it simply a vanity metric for developers and programmers to get over-excited about?
featuredImage: "./header.jpg"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/clean-code/index.md"
---

Does clean code matter? or is it simply a vanity metric for developers and programmers to get over-excited about?

Obviously, as a developer, my answer is yes, clean code is incredibly important, but let's take a look at what happens when the clean code isn’t considered important enough.

[Inspired by Clean Code Episode One by UncleBob Martin](https://cleancoders.com/video-details/clean-code-episode-1)

## Why is clean code relevant?

I have experienced first hand these types of comments at one point or another during my career, from both large multi-national organisations to tiny one-man start-ups.

> Clean code is a “nice to have” it’s more important that we just deliver this feature.

> Clean code matters, but it's not a first-class citizen.

> Clean code doesn’t matter, making money matters.

> First to market is the ONLY thing that matters.

> Code quality is nothing but a vanity metric.

The truth is, writing clean code is incredibly important, and for a business providing an online web application, it can quite literally be the difference between success and failure of the business.

## Two ways bad code affects a business

The two primary ways bad code can have an impact on business are:-

- Insecure and vulnerable code open to attacks and hack attempts.
- Code that is hard to comprehend by other developers, increasing development time which then increases the overall cost to ship and maintain.

What I want to focus on here is the second issue, the idea that making code impossible to develop and maintain will drive the costs through the roof and can destroy budgets on any project.

## Why write bad code?

If writing bad code destroys budgets and can cripple a company, surely the answer is to STOP writing bad code, and you would be correct, but why do some developers write bad code?

The main issue is pressure, the tactic of applying as much pressure to a team of developers is usually the number one factor. I once worked with a group of around thirty developers, and I would often hear:-

> we need to ship this tomorrow, so don’t do any of the unit tests, we will add those later.

Obviously _later_ never happened, we shipped that product anyway.

In that same team I once heard a colleague of mine say:-

> I know this feature has a couple of nasty bugs in it, but I have been told to ship this today and under no circumstances should I allow this deadline to slip.

However you want to phrase it, first to market, deadlines, budget constraints, it all results in “rushing through code” and that's not a good idea, ever.

## The Productivity Trap

At the start of any new project we build features quickly, feature after feature just gets implemented, and morale is very high, everyone feels great, developers are no longer just developers, they are rockstars and ninjas. 🎸💪

But, those rockstars and ninjas have a huge problem, they are not writing clean code, they are just hacking on the codebase. Adding in feature after feature is quick, but without careful consideration and thought the developers end up in a tangled web of code that is hard to understand and almost impossible to maintain.

As this big ball of mud codebase gets bigger and bigger, the development team starts to move slower, features that once took a day to implement now take a week.

From the outside, it can be hard to understand why developers are now moving so much slower than when they did at the start of the project, tensions rise, and decisions are made to hire more developers to combat the issue.

## Brooks Law

According to Wikipedia, [Brooks Law](https://en.wikipedia.org/wiki/Brooks%27s_law) is defined as follows :-

> Adding manpower to a late software project makes it later

According to Brooks, there is an additional person who, when added to a project, makes it take more, not less time.

Consider the following scenario, we have "Team X" working on a project, but we need this feature to be delivered in one week. With our current burn down charts we predict we can deliver this in 10 days, so we make the decision to hire more developers.

The problem is that the new developers impede the seasoned developers as they get up to speed, so their output drops, but over time the new people start to become productive so the productivity output should rise above where it was previously.

However, if developers are writing bad code, the old developers teach the new developers how things are done, adopting the same techniques and eventually compounding the issue, company salaries get higher, developers productivity continues to drop slowly, and the big scary gap between these two elements gets bigger and bigger.

## The Big Rewrite

At some point someone will suggest that we “do a rewrite”, developers often love the idea of a total rewrite as the thought of strolling through a shiny new greenfield project is all but a distant dream, others might no be so convinced, they know how much money went into developing the first iteration, so understandably they might be hesitant.

In the end, the developers often win, and a rewrite starts, once again everyone is happy, rejoice the rewrite!

The biggest problem is that all the requirements for the project are buried in the old codebase, too many "quick fixes" have been put in place without documentation, so the team has to trawl through the old code to find all the behaviours that they can implement into the new system.

Meanwhile, while this is happening, new features and hot fixes are being added to the old codebase, so the requirements are changing underneath them.

## Why is clean code relevant? (again)

Clean code is important because if we write anything other than clean code we will eventually write ourselves into a corner, code modules have to be simple, do one thing, and be easy to work with.

Techniques such as test driven development are always super important when it comes to developing a product, its the only way to go fast, rushing code will always result in problems further down the line, in both the short-term and the long-term.

An excellent example of this is the Sushi Chef, a few years back I watched a documentary called Jiro Dreams of Sushi and it follows this same principle.

`youtube: https://www.youtube.com/watch?v=I1UDS2kgqY8`
