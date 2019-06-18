# MeanCourse

This is a Full stack project MEAN (Mongodb, Express, Angular and Node) starter project. It's a simple app where you can upload your pictures and view other pictures as well. You can sign up, login, upload and edit your picture description. Feel free to break this simple application. Enjoy!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.9.

## Database

I used Mongodb Atlas to house data. I also have commented out codes that uses local mongodb that you have to install first.

## Development server

Run `ng serve` for a front end server. 

Run `npm run start:serve` for back end server. 

Navigate to `http://localhost:3000/` to access APIs and `http://localhost:4200` to access front end.

## Production server

Used AWS Elastic Beanstalk and AWS S3. 

Uploaded backend zip to Elastic Beanstalk.

Built front end using `ng build --prod` to build distribution and uploaded it to S3.

## Live application view
http://mean-course-front-end.s3-website.us-east-2.amazonaws.com/

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

