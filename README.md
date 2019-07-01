# Ensono Recruitment App

Project was to develop small application according to provided instructions. It should process text file (A Christmas Carol, Charles Dickens) and provide list of 10 words that occur most often acording to user input and type. 

As it was mentioned in requirements I used Node.js to build tools to process file + server to send http requests. Application also provide front part build in React where user can make inputs and see list of words that server returns.

This project was generated using node 10.13.0 and npm 6.4.1 and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Concept

I decided to process file at initialization of application. I know that this process can take a lot of time and in this approach we are doing it once. Also advantage for this idea is fact that file wont change when app is running. So when app is starting there can be small delay on to fulfill user request, but after file is fully processed, delay can be caused only by delivering data according to user input from prepared list of words.

When app is initialized, process of reading file begins line by line. From the line's data I am extracting only words using RegExp and I am building big object with unique keys as words. I enter value 1 or add 1 depending on existence of word in list. Using object give me certain that there are no duplicates. After file is full read I am parsing this object to Array and then sort it. Then I am using array to display filtered data according to users input.

## First step
To run application in production on your local machine, firstly download or clone the repo, then You need to install all dependencies. Please go to Command Line or Terminal and go to folder with application. In root directory of application please run `npm install`. It will install all necessary dependencies and build project to provide dist folder. After successful installation You can proceed with starting server. 

## Production server

Run `npm start` for a production server. Navigate to address that is shown in console window. If you run it on Your local machine it will probably be http://localhost:3001/. 
I also deployed this app on Heroku so You can use this link https://ensono-rec-app.herokuapp.com/ to see application is working on server. Please have in mind that on Heroku after page is not used for a while it goes to sleep mode. When You will proceed with link it can have some delay to show the page - usually few seconds.

## App instruction

When You open page in browser, you will see main page with white box on middle of page. Inside this box you can see tabs to change type of search. Put into text box 2 letters or number describing length of word you are looking for and click search. When server respond list of words will show and you can see results. When you want change result click reset or start inputing new value and once again click search

## GIT and Heroku repository for this application

Heroku: https://ensono-rec-app.herokuapp.com/
GIT: https://github.com/lmar13/ensono-rec-app

### Error

Sometimes You can see error in console `Node / Express: EADDRINUSE, Address already in use`. That's mean that the port I provided can be occupied already. To deal with that error go to root folder and find `app.js` file. There go to line 83 and change number `3001` to another one for example `3000`. Save file and proceed to step run `Production server`.