---
title: Javascript and the meaning of this
date: "2019-07-28T23:35:00.000Z"
description: One of the most confusing aspects when learning either plain old Javascript or even a Javascript framework is understanding what the `this` keyword means and why it's not bound by default.
featuredImage: "./header.png"
icon: "./icon.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/javascript-and-the-meaning-of-this/index.md"
---

When it comes to the meaning of `this` in Javascript, it can be one of the most confusing things to learn and also the source of many bugs and issues. In this article, I want to talk about how to figure out what the `this` keyword refers to and under what conditions it might not be what you expect.

## Figuring out what `this` means

There are four ways to figure out what the `this` keyword is referencing within your Javascript, these have some seemingly technical names but stick with me here as they are quite simple.

- Implicit Binding
- Explicit Binding
- new Binding
- Window Binding

## What is binding?

Binding in Javascript refers to the idea that we can bind our function calls to particular contexts, we can do this implicitly and just let Javascript do its thing for us, or we can be very explicit and let Javascript know exactly what we want the `this` keyword to reference.

if that makes no sense, don't panic as I will be elaborating on each of these concepts with some examples, let's take a look at the most basic example first.

## Implicit Binding

As you can see we have a Javascript object with three properties, a `name`, an `age` and a `sayName()` function.

```javascript
const me = {
  name: "Richard",
  age: 42,
  sayName() {
    console.log(this.name)
  },
}

me.sayName()
```

Inside the `sayName()` function we are printing the `name` property out using `console.log()`, however, what does `this` refer to?

The key to understanding what the `this` keyword refers to, is to look at where the invocation occurs, in most cases, you can simply look to the left of the dot and see exactly what `this` will reference.

```javascript
me.sayName()
```

Quite clearly, the `this` keyword in this particular case is referencing the `me` object, this is called **implicit binding** because at no point did we declare we wanted this, it just happened implicitly as part of Javascript.

In most cases this is what you will see in Javascript, however, there are some occurrences, especially in React components where we have to be explicit about our bindings.

## Explicit Binding

Explicit binding is where you as a developer are explicitly defining what you want the `this` keyword to reference within your Javascript, this can be done using three separate functions which all provide us with the ability to bind to a context, but do it in slightly different ways.

- `call()`
- `apply()`
- `bind()`

## Call()

Let's jump in with a code example first, I will then explain exactly what we are looking at with the `call()` method.

```javascript
const sayName = function() {
  console.log(this.name)
}

const author = {
  name: "Richard",
  age: 42,
}

sayName.call(author) // Outputs Richard
```

In this example we start off by declaring a simple Javascript function, this function is not part of any object and as you can see the `this` keyword is used within the function.

We also have an `author` object which contains a `name` and an `age`.

If we were to call the `sayName()` function on its own it would throw an error because within the function, the `this` keyword doesn't reference anything.

We can explicitly set what the `this` keyword points to by using the `call()` function. Using the `call()` function like this gives our `sayName()` function a context to work in and points `this` to `author`.

```javascript
sayName.call(author) // Outputs Richard
```

We can also provide arguments with the `call()` function, let's look at another example of how that works

```javascript
const sayName = function(food1, food2, food3) {
  console.log(this.name + ` likes ${food1}, ${food2}, and ${food3}`)
}

const author = {
  name: "Richard",
  age: 42,
}

const food = ["Pizza", "Tacos", "Lasagne"]

sayName.call(author, food[0], food[1], food[2])
```

As before, we are calling the `sayName()` function and using `call()` to provide the context in which we wish to call it, in this case `author`.

We are then passing through three arguments which we are pulling from an array of `food`, as you can see these arguments are then passed into the `sayName()` function like regular arguments which will allow us to `console.log()` them out.

## Apply()

One thing you might not like is the idea of passing all these individual `food` items in with the context we wish to use, surely it would be better to just pass in the whole array?

```javascript
const sayName = function(food1, food2, food3) {
  console.log(this.name + ` likes ${food1}, ${food2} and ${food3}`)
}

const author = {
  name: "Richard",
  age: 42,
}

const food = ["Pizza", "Tacos", "Lasagne"]

sayName.apply(author, food)
```

This is exactly what `apply()` does, it's the same as `call()` but instead of passing in the individual `food` items, we can just pass them in as a complete array and then call the function.

## Bind()

The final way to explicitly bind is to use the `bind()` function, `bind()` is almost identical to `call()` but with one difference, instead of calling the function right away, it simply returns a new function with the required binding, let's take a look at an example.

```javascript
const sayName = function(food1, food2, food3) {
  console.log(this.name + ` likes ${food1}, ${food2}, and ${food3}`)
}

const author = {
  name: "Richard",
  age: 42,
}

const food = ["Pizza", "Tacos", "Lasagne"]

const newFn = sayName.bind(author, food[0], food[1], food[2])

newFn() // "Richard likes Pizza, Tacos, and Lasagne"
```

As you can see, this works in exactly like `call()` except the function isn't called right away, in this case, the new function is assigned to a constant called `newFn` and we then invoke it on the line after (we could invoke this at anytime we like). This particular type of binding is often seen in React components, but I will go into that a little more later.

## new Binding

The `new` binding is a very simple one to explain, anytime you use the `new` keyword in Javascript, you are binding `this` to the new object you're creating, a quick example of this might look as follows.

```javascript
const Book = function(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

const greatBook = new Book("Refactoring", "Martin Fowler", "0-201-48567-2")

console.log(greatBook)
```

The output of the above would be the new object we have created, which contains the `title`, `author` and `ISBN` which were set using the `this` keyword

```json
[object Object] {
  author: "Martin Fowler",
  isbn: "0-201-48567-2",
  title: "Refactoring"
}
```

## Window binding 🤮

The final binding I want to mention is `window` binding, I don't recommend using window binding as its essentially polluting the global scope, this can lead to bugs and all sorts of issues, but it's worth mentioning as it is still widely used sadly.

As always, let's look at an example.

```javascript
const sayName = function() {
  console.log(this.name)
}

sayName() // undefined
```

In this context `this` is referring to the global scope on the `window`, we have nothing to the left of the invocation, no `new` binding, and no explicit binding. We could, in theory, fix this by specifying the missing `name` property on the `window` but please don't do this or `<INSERT LIGHT-HEARTED THREAT HERE>`

```javascript
const sayName = function() {
  console.log(this.name)
}
window.name = "Richard"
sayName() // "Richard"
```

## Why is knowledge about all `this` binding useful to know?

In our React components, we often have to be explicit about our bindings, this is because at the time of invocation from within our JSX we have no idea what the context is, and since components can be reused everywhere by nature, it may not always be the same.

Take a look at this example, at the end of the `constructor()` you can see that we are explicitly binding our `switchOff()` method to React component.

```javascript
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: "on",
    }

    this.switchOff = this.switchOff.bind(this)
  }
  switchOff() {
    this.setState({
      mode: "off",
    })
  }
  render() {
    const { mode } = this.state

    return (
      <div>
        {mode === "on" && <button onClick={this.switchOff}>Switch Off</button>}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"))
```

In the above example we have a simple React component, the most important line is where we `bind()` the `this` keyword to this particular component at the end of the `constructor()` using the following

```javascript
this.switchOff = this.switchOff.bind(this)
```

Without this line, the `switchOff()` function will not know what context to be called in since it was invoked from JSX.

## Conclusion

As you can see, the `this` keyword is quite easy to understand when we look at each concept individually, I think the confusion arises around these little "Gotchas" which seem to be all over the place in Javascript.

As always, any questions or comments then please feel free to leave them in the comments section below, and if you see any mistakes please feel free to click on the Github link at the top of this page and submit a pull request.
