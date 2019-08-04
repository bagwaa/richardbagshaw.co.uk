---
title: Stack PHP Middleware 
date: "2015-02-12T16:52:01.197Z"
description: In this post lets take a look at middleware and StackPHP
featuredImage: "./header.jpg"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/stack-php-middleware/index.md"
---

Middleware isn't something that exclusive to any particular framework and it has in fact been around for a long time. 

As a freelancer I frequently get to work on really interesting stuff, and recently I have been building a super lightweight custom framework based on illuminate components, one of the requirements was to build in an easy to use middleware component based on [StackPHP](https://stackphp.com/)

## The Decorator Pattern

Before we can really talk about middleware and [StackPHP](https://stackphp.com/) we need to understand the decorator pattern, there have been many articles regarding this pattern over the years so I won't try and concoct anything new here, instead I will be like so many others before me and quote wikipedia.

> The decorator pattern can be used to extend (decorate) the functionality of a certain object statically, or in some cases at run-time, independently of other instances of the same class, provided some groundwork is done at design time. This is achieved by designing a new decorator class that wraps the original class.
>
> This pattern is designed so that multiple decorators can be stacked on top of each other, each time adding a new functionality to the overridden method(s).

So the idea is basically this, you take an object, and you wrap this object in another object which provides additional functionality, and you keep wrapping extra classes repeatedly for each additional requirement. 

As an example, we could take a web application and wrap that using the decorator pattern with another class that provides logging, we could then wrap this again with another class that provides caching, on so on.

This is basically achieved by implementing an interface on your original class, and then having each decorator class implement that same interface, because of this we can then safely wrap either our object or a previously decorated object and be confident that it will react in the same way.

## Stack PHP

So armed with the knowledge of the decorator pattern, we can now talk about [StackPHP](https://stackphp.com/), they say a picture is worth a thousand words, so with that in mind.

![Onion](./onion.png)

Looking at this we can easily see that in the center we have our application which will implement some common interface, and around it we can see additional middleware layers for `Authentication` and `Session`, both of these will also implement this common interface. 

As our request / response travels through our application we can modify or alter behaviour as necessary.

At this point you may be thinking about this interface? for this to work surely we would need a common interface that is almost an industry standard? .. right?

## HttpKernelInterface

HttpKernelInterface is just that, its single responsibility is to handle a `request` and convert this into some kind of `response`, that's it, nothing more.

If we take a look at the code for this you will see how simple this interface really is.

```php
<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Component\HttpKernel;

use Symfony\Component\HttpFoundation\Request;  
use Symfony\Component\HttpFoundation\Response;

/**
 * HttpKernelInterface handles a Request to convert it to a Response.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 *
 * @api
 */
interface HttpKernelInterface  
{
    const MASTER_REQUEST = 1;
    const SUB_REQUEST = 2;

    /**
     * Handles a Request to convert it to a Response.
     *
     * When $catch is true, the implementation must catch all exceptions
     * and do its best to convert them to a Response instance.
     *
     * @param Request $request A Request instance
     * @param int     $type    The type of the request
     *                         (one of HttpKernelInterface::MASTER_REQUEST or HttpKernelInterface::SUB_REQUEST)
     * @param bool    $catch   Whether to catch exceptions or not
     *
     * @return Response A Response instance
     *
     * @throws \Exception When an Exception occurs during processing
     *
     * @api
     */
    public function handle(Request $request, $type = self::MASTER_REQUEST, $catch = true);
}
```

As you can see, this ensures that we implement a method called handle() that receives a `Request` and returns a `Response` object. 

So with this interface we simply make sure our main `application class` (IoC container) implements this interface, and any additional middleware we develop should also implement this.

## Quick Example

```php
$app = new Cartisan\Core\App;

$app->get('/', function () {
    return 'Hello World!';
});

$app = new Cartisan\Middleware\Logger($app);
```

In the above example we are creating a new instance of `Cartisan\Core\App`, adding a route and then finally creating a new instance of our middleware and passing in the core application, therefore "wrapping" it.

The middleware in this example could look something like this.

```php
namespace Cartisan\Middleware;

use Cartisan\Core\App;  
use Symfony\Component\HttpFoundation\Request;  
use Symfony\Component\HttpKernel\HttpKernelInterface;

class Logger implements HttpKernelInterface  
{
    protected $app;

    public function __construct(HttpKernelInterface $app)
    {
        $this->app = $app;
    }

    public function handle(Request $request, $type = self::MASTER_REQUEST, $catch = true)
    {

        // Add logic here to be placed in the request response cycle

        return $this->app->handle($request);
    }
}
```

A few important points to notice here.

1. We must implement the `HttpKernelInterface` this makes sure that we have a `handle()` method available on all middleware.
2. When we instantiate this class, we need to make sure that we pass in `$app`, this can be either the original `$app` or a previously decorated one, it doesn't matter as we are type hinting the interface in the constructor, as long as it implements that interface, then we accept it as an argument.

At this point the rest is simple, as a request passes through our application it first goes through the `handle()` method for the middleware, which then in turn calls the `handle()` method on the next layer, and the next and so on.

**Awesome!! .. right?!**

## Stack/Builder

So in the previous example we decorated our app with a really simple logger, but in the real world (as you know) it's not always that simple, we may also pass in additional options when using the decorator, essentially it can start to look more like this.

```php
use Symfony\Component\HttpKernel\HttpCache\Store;  
use Symfony\Component\HttpKernel\HttpCache\HttpCache;

$app = new Silex\Application();

$app->get('/', function () {
    return 'Hello World!';
});

$app = new Stack\Session(
    new HttpCache($app, new Store(__DIR__.'/cache'))
);
```

Whilst this is not the most verbose thing in the world, it's ugly and I have to think when I look at this. [StackPHP](https://stackphp.com/) also offers some neat tools, one of them being `Stack/Builder`

Using `Stack/Builder` converts the code above into something like this.

```php
$stack = (new Stack\Builder())->push('Stack\Session')->push(
    'Symfony\Component\HttpKernel\HttpCache\HttpCache',
    new Store(__DIR__ . '/cache')
);

$app = $stack->resolve($app);
```

Some would argue that this is not much cleaner, but you can take this one step further by creating a helper to iterate over an array of middleware and push them onto the stack.

```php
$stack = $app->middleware([
    'Stack\Session',
    'Symfony\Component\HttpKernel\HttpCache\HttpCache'
]);

$app = $stack->resolve($app);
```

You **COULD** go even further by abstracting the array out into a config file, but I think you understand my point here.

## Conclusion

Middleware is awesome, and with `HttpKernelInterface`, StackPHP its really easy to implement and makes your code really easy to read and understand.
