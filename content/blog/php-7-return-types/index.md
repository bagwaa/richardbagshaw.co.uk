---
title: PHP 7 Return Types
date: "2015-12-02T16:52:01.197Z"
description: In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, this time is return types.
featuredImage: "./header.png"
icon: "./icon.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/php-7-return-types/index.md"
---

In this series of blog posts I will be covering some of the new features available in the upcoming release of PHP 7, I know we are all very busy bees, so this series gets to the point and may be useful for anyone just wanting to understand these features quickly.

- Part #1 - [Scalar Type Hints](https://www.richardbagshaw.co.uk/php-7-scalar-typehints)
- Part #2 - [Return Types](https://www.richardbagshaw.co.uk/php-7-return-types)
- Part #3 - [Spaceships](https://www.richardbagshaw.co.uk/php-7-spaceships)
- Part #4 - [Null Coalescing Operator](https://www.richardbagshaw.co.uk/php-7-null-coalescing-operator)

## PHP 5

Currently in PHP 5 there is no way to specify what type should be returned by a method, you could argue that you can cast the returned value, which I guess is specifying the return type, but it's not ideal and susceptible to all sorts of weirdness.

```php
function getId() {
    return (int) $this->id;
}
```

## PHP 7

PHP 7 makes this very easy, we just apply the return type to the method declaration.

```php
function getUser() : User {
    return new User;
}
```

If we attempt to return anything other than a User in the above example, then we are met with a `TypeException`.

```php
function getUser() : User {
    return 'Mince Pies!';
}

$user = getUser();
```

```shell script
TypeException: Return value of getUser() must be an instance of User, string returned
```

## Interfaces

We can also use these return types when defining our interfaces.

```php
interface UserInterface {
    public function getUser() : User;
    public function getUserProfile() : UserProfile;
}
```

We are then able to implement this interface in the usual way with the type hints added on the return types.

```php
class UserRepository implements UserInterface {
    public function getUser() : User {
        return new User;
    }

    public function getUserProfile() : UserProfile {
        return new UserProfile;
    }
}

(new UserRepository)->getUser();
```

I like this new approach; it feels like a much cleaner way of doing things, but what if we implement the interface and then return something unexpected?

```php
class UserRepository implements UserInterface {
    public function getUser() : User {
        return 'foo';
    }

    public function getUserProfile() : UserProfile {
        return 'bar';
    }
}
```

At this point the code will not error because we haven't called the method yet, the application will only throw an exception at runtime when the `foo` and `bar` strings are returned.

```php
(new UserRepository)->getUser();

Uncaught TypeException: Return value of UserRepository::getUser() must be an instance of User, string returned
```
