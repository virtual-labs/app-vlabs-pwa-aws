# Virtual Experiments

---

# Overview

---

This app displays all experiments hosted under the virtual labs site. It allows users to filter and search for experiments that interest them. The app is also a PWA and what this means is that the app is mobile compatible and can run completely offline.

The app has also been converted to an apk and hosted on the android play store. The app works seamlessly and due to using MUI Joy in combination with React, the app looks and feels like a native android app.

# Target Audience

---

The app will be used primarily by students looking to learn certain topics and by educators that use this app to complement the material being taught.

# Technology Used

---

The app is a single page, static website that is built with Node.js and Javascript. The frontend is produced with React, rendered with Astro and made beautiful and functional with MUI Joy. Bundling all the js files and allowing a final build to be produced is done with Vite.

The app requests its data from an AWS route that connects to a DynamoDB table and supplies the application with its data. The app uses the Service Worker API in the browser to cache this data and reduce the amount of network requests.

# Design Decisions

---

- **MUI Joy**
Initially, pure React with Bulma.css was being used to render the site, however, due to the mobile nature of this app, coupled with the need for responsiveness, MUI Joy was chosen as it adheres to the Material Design 3 style choices documented by google and allows the app to blend into the android ecosystem.
- **Astro**
The app requires quick load times, this was achieved with the server side rendering capabilities of a framework called Astro.
- **AOS - Animate on Scroll**
The app initially had animations for each card on scroll but this had to be removed since the library added significant delay to the TTI (Time to interactive).

# Feature List

---

1. **Expandable Cards**
Experiment Cards can be expanded on with the ‘Learn More’ button, this pops up a modal containing other information relevant to the experiment.
2. **Responsiveness**
The website is fully responsive, the application works on any screen size and shifts itself to better suit the screen size. For example, the huge hero section is removed on smaller screens and replaced with a simple logo and title.
On bigger screens, 4 experiment cards are displayed per row and on smaller screens this is reduced to 2.
The filter options are replaced with a clickable icon which produces a modal on smaller screens.
3. **Search**
Fuzzy search using the fuse.js library was used to allow the user to search for experiments without the worry of spelling errors and uncertainty.
4. **Filters**
One could filter the experiments shown on a particular discipline or lab name. This allows users to find only the experiments they want to find and not all experiments.
5. **Pagination**
The user can find more experiments by moving to the next page, by default only 25 experiments are shown per page. This was done to reduce page load times and javascript delay times.
6. **Recents**
The user can click on a tab that only shows the labs recently used by the user. This allows users to find frequently used labs quickly instead of having to search for the lab every time he/she/them uses the app.
7. **Offline Processing**
The user can use the application even offline, this is possible due to service-workers that cache all the assets needed to produce the site and render them on load. It also significantly reduces the page load as the data does not need to be fetched from the network.
8. **CORS**
Only authorized websites can request data from the backend. This is done to prevent malicious use. Currently the list of sites that can access the URLs is mentioned on the AWS API Gateway console
9. ********Authorization for Post Route********
    
    In order to post new data to DynamoDB table, the user must pass certain credentials in the request header.
    
10. ****On Demand Updation of DynamoDB Table****
    
    A google app script has been deployed to the current `Experiment Database` google sheet, which when run, will push all the eligible experiments to the DynamoDB table.
    
11. **Deployed on the Android Play Store**
The android app has been deployed on the android play store and thus mobile users can download and experience it in native app form.

# Configuration Files

---

We only have one config file. Its named `config.json` in the node directory. It only contains two fields, the title and description used for the main hero section on larger screens. This is to allow for a smaller description or a different title in case for a need of change.

# Code Explanation

---

Only major / important files are described.

## Frontend

- `App.jsx`
This component GET requests data and saves it in state. It handles the overall design of the webpage and the different tabs the user can click on.
- `OrderTable.jsx`
This file contains another react component that displays all the interactive parts of the webpage. This includes the filters, search and the grid of experiments. It also deals with pagination.
The file contains a separate react component called `RenderFilter` that renders the filters that filter the data shown. Any new filters added must be added here alone, a state function should be passed so as to edit the experiment list in the parent component (`OrderTable`).
Search is implemented with `fuse.js` and after search, a final list of experiments is set in the `Results` variable. Pagination is implemented on this variable. The number of cards per page is set in `cardsPerIndex` . A cascade of `useEffect` functions are set for a standard implementation of pagination.
- `ExperimentCard.jsx`
This file contains the component that renders the actual experiment card. It also contains the information displayed in the modal when the user clicks on the ‘Learn more’ button.
- `intro.jsx`
This part contains the component at the top of the page, the introduction to the site. The heading “Virtual Labs” has an effect of changing its letters randomly and then slowly fixing itself, producing a hacker like effect. Also the description is also in this component. The background also has a effect of splitting colors according to the mouse position.
    
    This component is not visible on phone. On the phone the component is replaced by just the heading.
    
- `service-worker.js` 
This file handles all service-worker duties. It caches relevant assets and periodically requests new data from the [aws link](https://8kne7udek3.execute-api.ap-southeast-2.amazonaws.com/items). The `urls` list contains the list of all assets to be cached.
The service worker operates by controlling events,
    - `install` event
    This event occurs when the PWA is initially registered in the browser. It adds all URL assets to cache.
    - `activate` event
    The simply logs when the service worker has been activated and is functional.
    - `fetch` event
    This event intercepts all network requests made form the application and decides whether to fulfill the request from the cache or make a network request. If the request is made for the experiment data, the fetch handler intercepts it and checks if its been 10 days since the last request. If it has been, a network request is made and the cache is updated else the cached request is served.
    The service worker saves the time of the last request in the header of the cached request.

## Backend

- `pwa.gs`
    
    This is a google app script that pushes data to DynamoDB table. It only pushes those records that have the image, description and column fields as non-empty. It pushes the records via a post request
    
- `PWA_Get.py`
    
    This lambda function is executed when a GET request is made to the DynamoDB table. It returns all the items in the table
    
- `PWA_Post.py`
    
    This lambda function is executed when a POST request is made to the DynamoDB table. It use the `BatchWrite` function to write all the items provided in the body of the request to the DynamoDB table. 
    
- `PWA_Delete.py`
    
    This lambda function is executed when the DELETE request is made to the DynamoDB table. It deletes a particular item in the DynamoDB table based on the `id` parameter based in the URL
    
- `PWA_Post_Authorizer`
    
    This lambda function checks the header of the POST request and only passes on the request, if the credentials provided are correct
    

# Source Files

---

- [All_Experiments_Spreadsheet](https://docs.google.com/spreadsheets/d/1x12nhpp0QvnsA6x-O1sV4IA9SAbfVsq_wiexWkutOmU/edit#gid=1722069818)
This spreadsheet contains every experiment hosted by the virtual labs platform. It was used in testing.

# Future Scope

---

1. Expanding the experiment database to include more experiments.
2. Add rating and filters to allow further search options.
3. Add bookmarking to allow users to save favorite experiments.
4. AOS integration with an optimized build.
5. Expand CORS to allow for wildcard VLabs URLs.
6. Currently, the network request is made every 10 days, it should change to having a separate service to check if the data has been updated periodically. This further reduces network load.

# Deployment / Usage

---

## Frontend

To create the static website, simply run `npm run build` inside the node folder. Static website is then hosted on the backend, other steps taken to run the app is mentioned below.

## Backend

### Google App Script

Upon running this script, all the eligible records in the google sheet will be pushed to the DynamoDB table. Currently the credentials being used is an environment variable named `pwa_auth`. In order to change the value or to add more variables, go to the `Project Settings` of the App Scripts page of the Google sheet and make the necessary changes.

### AWS

The AWS backend needs no deployment as it has already been set up. 

For any changes to be made, the following is a roadmap of functionality of the AWS backend.

The `API Gateway` page is place where the API routes to different AWS services are configured.

Here the PWA_API is the api configured for this project. 

This page is where the various routes, integrations, authorizations and CORS are configured. 

The `AWS Lambda` page is where all the lambda functions are hosted and can be modified. 

The names of the Lambda functions are as follows:

- PWA_Delete
- PWA_Post
- PWA_Get
- PWA_Post_Authorizer

The DynamoDB table that has been created is named `PWA_EXP`

All these have been configured in the `ap-southeast-2(Sydney)` region.