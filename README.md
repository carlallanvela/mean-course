# MeanCourse

This is a Fullstack MEAN (Mongodb, Express, Angular and Node) starter project. It's a simple app where you can upload your pictures and view pictures uploaded by others as well. You can sign up, login, upload and edit your picture details if you're authenticated to do so. 

Feel free to use (and break) this simple application. Enjoy!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Database

I used MongoDB Atlas to house data which is a fully-managed cloud database.

You can also use MongoDB in local for development purposes. I have commented out these codes but feel free to play around it on your local environment.

## Development server

Run `ng serve` for a front end server. 

Run `npm run start:serve` for back end server. It will fail initially as there are components that you need to install first on your local machine.

Navigate to `http://localhost:3000/` to access Backend APIs and `http://localhost:4200` to access Front End / UI.

## Production server

Used AWS Elastic Beanstalk and AWS S3. 

Uploaded backend ZIP file to Elastic Beanstalk.

Built Front end using `ng build --prod` to build distribution folder and uploaded it to S3 for hosting.

## Live application view
http://mean-course-front-end.s3-website.us-east-2.amazonaws.com/

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

