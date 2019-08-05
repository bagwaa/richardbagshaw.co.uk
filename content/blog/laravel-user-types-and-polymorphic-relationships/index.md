---
title: Laravel User Types and Polymorphic Relationships
date: "2016-06-02T22:40:32.169Z"
description: Polymorphic relations allow a model to belong to more than one other model, on a single association.
featuredImage: "./header.png"
icon: "./icon.png"
author: "Richard Bagshaw"
gitHubPageLink: "https://github.com/bagwaa/richardbagshaw.co.uk/blob/master/content/blog/laravel-user-types-and-polymorphic-relationships/index.md"
---

<div style="display: block; margin-bottom: 2em; padding: 1.4em 1.4em; background-color: #ec6656; color: white; font-size: 14px; font-family: monospace">
this article has recently been republished and updated, it was first published in 2016 when Laravel was quite different
</div>

Over the past few days I have been looking for the best way to extend a generic user login system in [Laravel](https://www.laravel.com) to allow for different types of users.

Setting up [user authentication in Laravel](https://laravel.com/docs/5.8/authentication) was ridiculously easy, but there was one major problem with the default implementation that was giving me some headaches, user types.

The issue was that I wanted to engineer a way for users to be able to login and then have the data that is applicable to their account type available, however I didn't want any of this hardcoded in anyway.

As an example lets use Employees and Freelancers, with one central login form, I wanted each use case to be able to login using exactly the same method, and then be presented with different profiles depending on the account type.

## Hack, Hack, Hack

Looking around I found so many ways to-do this, and if I am honest, they all seemed bad I wanted to make sure that the following rules applied to this solution.

- I wanted the generic user model to remain as simple as possible, I didn't want to 'smash in' lots of extra little fields.
- I didn't want to add meta data or serialised data, it had to remain well structured data that I could run queries on easily in the future.
- I didn't want to use any conditionals around this, I wanted to make sure that it was fully polymorphic.
- I didn't want any unnecessary dependencies in any part of this solution, the idea that they are working as independent parts was super important.
- I wanted every aspect of the code to be testable.
- I didn't want to **"shoehorn"** something into a pattern that didn't quite fit, for example a lot of solutions I saw around the internet were based around using **single table inheritance**, and whilst I liked the idea behind this for very similar models, I hated the thought of having todo this in my situation.
- I had to stick to as many of the SOLID principles) as possible.

## Single Table Inheritance

Throughout my research I kept running into the same solution, STI or single table inheritance, this is a method of having one table to store multiple models in, so for example it would be perfectly feasible to have a Vehicle model, with two subclasses of Car and Van.

The one point is that all these models would be different classes, but they would all share the same table in the database. So if the differences were very minor, then you would expect to see one or two empty fields on each entry as some data would only be applicable to certain types.

A lot of posts on the internet suggested that most people were fine with this solution, but I found this to be horrible. The greater the differences between the Car and Van types, the more fields we would have in one HUGE table, and a lot of them would be redundant, it just seemed wrong, I then looked into using something in Laravel called **"polymorphic relationships"**.

## What are polymorphic relationships?

[On the Laravel website](https://laravel.com/docs/5.8/eloquent-relationships#polymorphic-relationships) I found the following definition ...

> Polymorphic relations allow a model to belong to more than one other model, on a single association. For example, you might have a photo model that belongs to either a staff model or an order model.

This actually has many uses, one of them being exactly what we want to achieve, we want one User Model to have a relationship with another Model on a polymorphic basis, meaning that if we could for example switch out different types of user data models as long as they were in the defined relationship.

## Let's see an example.

The first thing we need todo is make sure that we have the User model setup correctly.

```php
class User extends Authenticatable {
    public function userable()
    {
        return $this->morphTo();
    }
}
```

this is pretty much the default user model for a Laravel install, however the important addition is the extra method we've added named userable().

This method gives the User model access to the other model that we want to associate with this one, this could be an Employee model or a Freelancer model.

## Employee / Freelancer Models

The Employee model would look something like this, it defines the inverse relationship of what we setup on the User model.

```php
class Employee extends Model {
    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }
}
```

The Freelancer model is a carbon copy, except we define a separate table to store this data.

```php
class Freelancer extends Model {
    public function user()
    {
        return $this->morphOne('App\User', 'userable');
    }
}
```

## Setting up the Database

The next step we will do manually in the database for the sake of this blog post, but this step needs to be built when you are creating a User from your website. This step could be built into some Factory or Repository pattern for your User class.

Not only will you need to make sure the Users table is populated, but also make sure the employees and freelancers tables are also populated correctly.

The structure for the tables are as follows

**Users table**

<table style="border: 1px solid #c8c8c8; font-size: 13px; font-family: Consolas, monospace">
    <tbody>
        <tr>
            <td class="font-bold border text-center">id</td>
            <td class="border text-center">auto-increment</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">username</td>
            <td class="border text-center">string</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">password</td>
            <td class="border text-center">hashed string</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">email</td>
            <td class="border text-center">string</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">userable_id</td>
            <td class="border text-center">integer</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">userable_type</td>
            <td class="border text-center">string</td>
        </tr>
    </tbody>
</table>

The userable id and userable type reference the model and the id for each association, so if a row in this table contained the userable_id of 1 and userable_type of Freelancer then this would then create a polymorphic relationship from the users table to the freelancers table on that foreign key.

**Employees table**

<table style="border: 1px solid #c8c8c8; font-size: 13px; font-family: Consolas, monospace">
    <tbody>
        <tr>
            <td class="font-bold border text-center">id</td>
            <td class="border text-center">auto-increment</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">salary</td>
            <td class="border text-center">integer</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">employee_number</td>
            <td class="border text-center">string</td>
        </tr>
    </tbody>
</table>

**Freelancers table**

<table style="border: 1px solid #c8c8c8; font-size: 13px; font-family: Consolas, monospace">
    <tbody>
        <tr>
            <td class="font-bold border text-center">id</td>
            <td class="border text-center">auto-increment</td>
        </tr>
        <tr>
            <td class="font-bold border text-center">day_rate</td>
            <td class="border text-center">integer</td>
        </tr>
    </tbody>
</table>

In terms of the additional data and relationships that need to be setup at the time of user creation its as simple as this.

- The users table needs to contain an extra field called userable_id which references the record in the associated model (foreign key)

- The users table needs to contain an extra field called userable_type which defines which model the relationship looks at for this particular record.

If for example, a row in the users table contained a userable_id of 13 and a userable_type of Freelancer, Laravel would then look at the Freelancer model, and associate the record with the id of 13.

## Testing the relationship

The final part of this puzzle is leveraging what we have built to push this into our views, in my profile controllers index method I can pass in the currently logged in User and then do the following to display the information we need.

```php
class ProfileController extends Controller
{
    public function index()
    {
        $data = [
            'user'  => Auth::user(),
            'type'  => get_class(Auth::user()->userable)
        ];

        return view('profile', $data);
    }
}
```

And then from within our profile blade view we access the data as follows (_make sure you try to access the correct data for the loaded type, you may need a simple conditional to a certain partial for each type_).

```html
<ul>
  <li>Data Type is {{ $type }}</li>
  <li>Dayrate is {{ $user->userable->dayrate }}</li>
</ul>
```

## Final Thoughts

Explaining this in a blog post feels far more complicated than the actual implementation, as with most things I would suggest just diving in and having a go yourself, if you have any questions, or need any help feel free to leave a comment below.
