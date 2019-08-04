---
title: PHP 7 Spaceships 
date: "2015-12-03T16:52:01.197Z"
description: In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, this time is the spaceship operator
featuredImage: "./header.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/php-7-spaceships/index.md"
---
In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, I know we are all very busy bees, so this series gets to the point and may be useful for anyone just wanting to understand these features quickly.

* Part #1 - [Scalar Type Hints](https://www.richardbagshaw.co.uk/php-7-scalar-typehints)
* Part #2 - [Return Types](https://www.richardbagshaw.co.uk/php-7-return-types)
* Part #3 - [Spaceships](https://www.richardbagshaw.co.uk/php-7-spaceships)
* Part #4 - [Null Coalescing Operator](https://www.richardbagshaw.co.uk/php-7-null-coalescing-operator)

## The Combined Comparison Operator

The Spaceship Operator is the unofficial name for obvious reasons; the more professional sounding name is the "Combined Comparison Operator" but what does it do and why do we need it?

I've seen this explained in a few ways by various developers, and whilst they are correct, they don't explain what this operator does at a bare bones level.

So in PHP, we would compare two values and return a `boolean` to indicate if this comparison was `true` or `false`

```php
1 == 2    // false  
2 == 2    // true  
1 != 13   // true  
55 > 102  // false
```

In PHP 7 we can use the "combined comparison operator" (or spaceship) for comparing two variables, but instead of returning either `true` or `false` we will instead return `-1`, `0` or `1`. 

The `0` represents equality while `1` represents greater than and `-1` represents less than.

As an example, the kind of results we expect back from this operator are as follows.

```php
1 <=> 1       // 0   (1 is equal to 1 so return 0)  
2 <=> 1       // 1   (2 is greater than 1 so return 1)  
1 <=> 2       // -1  (1 is less than 2 so return -1)  
156 <==> 12   // 1   (156 is greater than 12 so return 1)  
19 <==> 20    // -1  (19 is less than 20 so return -1)  
```

At its core this is all the spaceship operator does, nothing more than comparing two values and returning either `-1`, `0` or `1`.

## Uhhhhh, why?

If you're anything like me then you might not see how useful this is right away, the first time I read about this I had no idea where I would use this or why, but my conclusion is ... sorting

## PHP 5 and usort()

In PHP 5 we have the ability to perform a user defined sort, this is what you might expect, you pass in an array that needs sorting, and a callable function that is used to compare items in the array to determine the order.

Within the callable we can return `-1` if it's less than, `0` if its equal and `1` if it is greater than.

```php
$smallPeople = ['Doc', 'Grumpy', 'Happy', 'Sleepy', 'Sneezy', 'Dopey', 'Bashful'];

usort($smallPeople, function($a, $b) {
    if ($a == $b) {
        return 0;
    }

    if ($a > $b) {
        return 1;
    }

    if ($a < $b) {
        return -1;
    }
});

var_dump($smallPeople);  
```
In this example, when we `var_dump()` the array we should now see that the elements are sorted in alphabetical order.

```shell script
array(7) {  
  [0]=>
  string(7) "Bashful"
  [1]=>
  string(3) "Doc"
  [2]=>
  string(5) "Dopey"
  [3]=>
  string(6) "Grumpy"
  [4]=>
  string(5) "Happy"
  [5]=>
  string(6) "Sleepy"
  [6]=>
  string(6) "Sneezy"
}
```

Sorting arrays like this is perfectly acceptable, if not a little verbose and this is where we can use the spaceship operator.

```php
$smallPeople = ['Doc', 'Grumpy', 'Happy', 'Sleepy', 'Sneezy', 'Dopey', 'Bashful'];

usort($smallPeople, function($a, $b) {  
    return $a <=> $b;    
});

var_dump($smallPeople);  
```

The `var_dump()` results in both examples are the same. To solidify this concept, we could also use this operator to sort the array by the number of characters in each name.

```php
$smallPeople = ['Doc', 'Grumpy', 'Happy', 'Sleepy', 'Sneezy', 'Dopey', 'Bashful'];

usort($smallPeople, function($a, $b) {  
    return strlen($a) <=> strlen($b);    
});

var_dump($smallPeople);  
```

Would sort the array in this manner.

```shell
array(7) {  
  [0]=>
  string(3) "Doc"
  [1]=>
  string(5) "Happy"
  [2]=>
  string(5) "Dopey"
  [3]=>
  string(6) "Grumpy"
  [4]=>
  string(6) "Sleepy"
  [5]=>
  string(6) "Sneezy"
  [6]=>
  string(7) "Bashful"
}
```

One thing to note, `usort()` will not return the sorted array, it's a destructive function and will act on the array that you pass it directly by reference.
