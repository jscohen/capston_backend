[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Links

[Front End Repo](https://github.com/jscohen/capstone_front_end)

[Back End Repo](https://github.com/jscohen/capston_backend)

[Front End Deployment](https://jscohen.github.io/capstone_front_end/#)

[API Deployment](https://young-savannah-37906.herokuapp.com/)

# Writr

Writr is a functioning word processor and text translator.

## ERD

[ERD](http://i.imgur.com/abwRZfl.jpg)

## Functionality

The major functionality aside from the doc resources' RESTful routes is the translation feature.  The translation is a patch request at a custom route /translate/:doc_id.  From that route, expressJS sends an API call to yandex with the API key, text, current language, and translation language and returns a JSON value.  That value is cleaned and put into the text field of the doc using the Mongoose update function.  On the front end, that value is dynamically added to the Ember textarea.

## General Approach
I attempted to make this a client-focused app and minimize the calls on the back end.  There is only one resource, docs, to contain the document.  On the front end, you can access the New Document view which prompts you to write a document, create it, and then allows you to translate and save.  You can access your docs to edit them as well.  The translation involves selecting the langugae you are translating from and then the language you are translating to.  The translation occurs dynamically, and will update your text immediately.

I originally wanted to make this app a full word processor like Google Docs, but I couldn't find a framework that would work with Ember.  Ember uses its own custom text field components instead of the normal HTML textarea and it is impossible to add CSS to the text inside.  So I abandoned this idea and reused the Yandex translation service from my second project to make the app a text translator.

Because of the flexibility of expressJS (which I prefer to Rails), I was able to focus on Ember on the front end and make changes on the fly, especially when I shifted focus from word processing to translation.  I generated routes and components for each piece of functionality, and worked on building the views and the logic using "the Ember way".  Although Ember is convention over configuration unlike expressJS, I was still able to make the functionality I needed, even if it is sometimes inelegant or not necessarily "the Ember way".  An example of this is the API calls: for the GET request to retrieve a user's documents, I made use of Ember's native features to make the call in the route model and then use a handlebars template to populate each document.  However, I also needed to make other API calls such as translation and updating and I made those in the docs service with custom API requests.  Overall, I got the functionality done that needed to be there although I'm sure there are better ways using Ember's capabilities.

## API routes

The following API routes are used by Writr:

Authentication:
1. Sign-Up: Submits information from the client to create a new user (POST)
2. Sign-in: Submits information from the client to log in and create a session for an existing user (POST)
3. Change Password: A PATCH request to take a new password from the client and save it to the user's field in the database.
4. Sign-out: Log the user out of the app and destroy the current session (DELETE)

Docs:
1. Create: A POST route that creates a new document with the title and text provided on input
2. Update: A PATCH request that takes changes from the client and saves them in the database
3. Read: A GET request to get all of the documents for the current user.  There is no way on the client side of getting all docs.
4. Delete: A Delete request that destroys the selected document.

Translation:
1. Translate: A custom route at translate/:doc_id that takes in the doc title, the text, the language you are translating from and the language you are translating into.  The translate function calls the Yandex API and returns the text in the language you are translating into.  Then, using the Mongoose update function it changes the doc's text to the translation.

## Hurdles and Unresolved Issues

I am fairly happy with the final product of the app, but it was not entirely smooth. I originally planned to make a word processor with a Google Docs style interface where the user could edit and style text. I was using standard HTML textarea elements for this. I decided to build the core of the app (i.e. CRUD, authentication, building out routes and components) before working on the interface. When I tried to work with the HTML textarea, I couldn't get it to work and after some researched I discovered Ember actually uses custom components in place of the HTML textarea and input fields and that it was impossible to edit the text in the way that a word processor would need.

I switched focus to add a translation feature, which proved challenging but doable. My primary difficulty was making the actual call to the third party API within an express API route. I created a custom route called translate/:doc_id to do this with a standard javascript function providing the call to the translation API. I had a lot of difficulty making this work, because the process consisted of:

API call to custom translate route
Using Mongoose findById to get the right doc, which is asynchronous
Calling a synchronous function with the text and language as paramters to call the Yandex API asynchronously and get the translation
Using Mongoose update function asynchronously to change the document's text to the result of the translation
Essentially when I set up this process, nothing ran in the order that I expected it to and it didn't work. I finally settled on a regular function within the translate route that had the URL for the API call and a callback function that updated the doc. Inside that function, I used Node's request module to make the API call and parse the returned JSON into the callback function passed into it. In the callback, I updated the Doc's text. See the docs.js controller on the back-end repo for code.

## Technologies

For the API, I used expressJS in the same way as we did in the team project.  Aside from the custom translate route, all routes are RESTful.  I did not make any special use of express other than managing the translation.

For the translation, I reused the Yandex API that I used on my second project as I already have it set up.  I used node's request module to send requests to the API and parse the results into a Javascript object.  A typical call might look like this:

https://translate.yandex.net/api/v1.5/tr.json/translate?&key= + API KEY + &lang= + from language code-to language code &text= + TEXT TO TRANSLATE

If you were translating "Hello" from English to Italian the call would be as follows:

'https://translate.yandex.net/api/v1.5/tr.json/translate?&key= + API KEY + &lang=en-it&text=hello'

The response comes back in JSON along the following lines if successful:

{"response": 200, "text": "ciao"}

[Yandex API Documentation](https://tech.yandex.com/translate/doc/dg/concepts/About-docpage/)

## Installation Instructions

API Side:

On the command line, type in npm install.  You can type in nodemon to run the API side of the app.

## [License](LICENSE)

1.  All content is licensed under a CC­BY­NC­SA 4.0 license.
1.  All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
