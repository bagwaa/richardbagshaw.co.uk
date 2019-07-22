---
title: Laravel User Types and Polymorphic Relationships
date: "2016-06-02T22:40:32.169Z"
description: Polymorphic relations allow a model to belong to more than one other model, on a single association.
featuredImage: "./header.png"
author: "Richard Bagshaw"
---

<div style="display: block; margin-bottom: 2em; padding: 1.4em 1.4em; background-color: #ec6656; color: white; font-size: 14px; font-family: monospace">
this article has recently been republished and updated, it was first published in 2016 when Laravel was quite different
</div>

Over the past few days I have been looking for the best way to extend a generic user login system in Laravel to allow for different types of users.

Setting up user authentication in Laravel was ridiculously easy, but there was one major problem with the default implementation that was giving me some headaches, user types.

The issue was that I wanted to engineer a way for users to be able to login and then have the data that is applicable to their account type available, however I didn't want any of this hardcoded in anyway.

As an example lets use Employees and Freelancers, with one central login form, I wanted each use case to be able to login using exactly the same method, and then be presented with different profiles depending on the account type.

## Hack, Hack, Hack

Looking around I found so many ways to-do this, and if I am honest, they all seemed bad I wanted to make sure that the following rules applied to this solution.

1. I wanted the generic user model to remain as simple as possible, I didn't want to 'smash in' lots of extra little fields.
2. I didn't want to add meta data or serialised data, it had to remain well structured data that I could run queries on easily in the future.
3. I didn't want to use any conditionals around this, I wanted to make sure that it was fully polymorphic.
4. I didn't want any unnecessary dependencies in any part of this solution, the idea that they are working as independent parts was super important.
5. I wanted every aspect of the code to be testable.
6. I didn't want to "shoehorn" something into a pattern that didn't quite fit, for example a lot of solutions I saw around the internet were based around using single table inheritance, and whilst I liked the idea behind this for very similar models, I hated the thought of having todo this in my situation.
7. I had to stick to as many of the SOLID principles) as possible.
