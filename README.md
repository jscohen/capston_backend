[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Links

[Front End Repo] (https://github.com/jscohen/capstone_front_end)
[Back End Repo] (https://github.com/jscohen/capston_backend)
[Front End Deployment] (https://jscohen.github.io/capstone_front_end/)
[API Deployment] (https://young-savannah-37906.herokuapp.com/)
# Writr

Writr is a functioning word processor and text translator.

## ERD

[ERD](http://i.imgur.com/abwRZfl.jpg)

## Functionality

The major functionality aside from the doc resources' RESTful routes is the translation feature.  The translation is a patch request at a custom route /translate/:doc_id.  From that route, expressJS sends an API call to yandex with the API key, text, current language, and translation language and returns a JSON value.  That value is cleaned and put into the text field of the doc using the Mongoose update function.  On the front end, that value is dynamically added to the Ember textarea.

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
