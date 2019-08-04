---
title: PHP 7 Null Coalescing Operator 
date: "2015-12-03T16:52:01.197Z"
description: In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, this time is the null coalescing operator. 
featuredImage: "./header.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/php-7-null-coalescing-operator/index.md"
---
In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, I know we are all very busy bees, so this series gets to the point and may be useful for anyone just wanting to understand these features quickly.

* Part #1 - [Scalar Type Hints](https://www.richardbagshaw.co.uk/php-7-scalar-typehints)
* Part #2 - [Return Types](https://www.richardbagshaw.co.uk/php-7-return-types)
* Part #3 - [Spaceships](https://www.richardbagshaw.co.uk/php-7-spaceships)
* Part #4 - [Null Coalescing Operator](https://www.richardbagshaw.co.uk/php-7-null-coalescing-operator)

## The null whut .... ?

Firstly, judging a book by its cover you would probably expect this blog post to be quite a lengthy one. However, the opposite is probably true. The null coalescing operator is simple and used when you want to set a default for a variable.

To illustrate this, you may be familiar with this type of code.

```php
$firstname = isset($user->firstname) ? $user->firstname : 'guest';
```

In PHP5 there is a way todo this using what I would consider a hack, it works exactly the same way, and is less code, but it doesn't really read that well.

```php
$firstname = @$user->firstname ?: "guest";
```

Essentially, all we are doing here is using a ternary operator to check that `$user->firstname` has been assigned a value, if it has, then we assign that to `$firstname`

If `$user->firstname` hasn't been set, then we assign the string `'guest'` to the `$firstname`.

Simple, and something that I have personally used countless times, however, PHP 7 makes this much easier to handle.

```php
$firstname = $user->firstname ?? 'guest';
```

Look how much cleaner that is, and it achieves the same task, so no more need to use a verbose ternary operator todo something so simple.
