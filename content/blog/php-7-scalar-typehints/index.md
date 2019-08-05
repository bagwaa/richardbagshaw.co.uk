---
title: PHP 7 Scalar Type Hints
date: "2015-12-02T16:52:01.197Z"
description: In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, this time is scalar type hints
featuredImage: "./header.png"
icon: "./icon.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/php-7-scalar-typehints/index.md"
---

In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, I know we are all very busy bees, so this series gets to the point and may be useful for anyone just wanting to understand these features quickly.

- Part #1 - [Scalar Type Hints](https://www.richardbagshaw.co.uk/php-7-scalar-typehints)
- Part #2 - [Return Types](https://www.richardbagshaw.co.uk/php-7-return-types)
- Part #3 - [Spaceships](https://www.richardbagshaw.co.uk/php-7-spaceships)
- Part #4 - [Null Coalescing Operator](https://www.richardbagshaw.co.uk/php-7-null-coalescing-operator)

## PHP5

Previously in PHP we would pass arguments to a method by just declaring the name of the argument as part of the method declaration like so.

```php
function setPrice($price) {
    $this->price = $price;
}
```

This code is perfectly valid. However PHP has no idea as to what `$id` should be, if we were passing in an object or an array, then we could type hint this to prevent an unexpected argument type.

```php
function setPerson(Person $person) {
    $this->person = $person;
}
```

At this point, this method will only allow us to pass in a `Person` object, which makes perfect sense considering the method is called `setPerson()`.

But up until now there has been no way to-do this for scalar types in PHP.

## PHP7

With PHP 7, we are now able to type-hint this scalar argument, effectively making sure that we are only passing through a type of variable that we expect.

```php
function setPrice(int $price) {
    $this->price = $price;
}
```

In this example, you can see that we are specifying that the argument should be of type `int`, if we attempt to pass anything other than an integer here then a `TypeException` will be thrown.

```php
setPrice('fishcakes');
Fatal error: Uncaught TypeException: Argument 1 passed to setPrice() must be of the type integer, string given
```

## Caveat

One **rather large** caveat here is that by default [at least at the time of writing in 2015] this is not exactly as strict as you might think.

PHP 7 will do what it can to try and figure out what it thinks you are trying to get at, so the following example will be valid even though we are passing in a string.

```php
function setPrice(int $price) {
    $this->price = $price;
}
```

```shell script
setPrice('1');
```

A lot of developers, including myself find this type of behaviour a little odd, so we can use the declare statement to let PHP 7 know that you want to enable strict types.

```php
declare(strict_types=1);

function setPrice(int $price) {
    $this->price = $price;
}
```

```shell script
setPrice('1');
```

```shell script
Fatal error: Uncaught TypeException: Argument 1 passed to setPrice() must be of the type integer, string given
```

This will then throw an exception as expected since we are passing in a string value to the method and not an integer.

I prefer strict types, I know some developers would probably like the magic that PHP 7 brings by trying to take an educated guess at what the type should be, It's mostly a personal preference.
