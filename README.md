# BruCal

> iCal Web Service for Brunel Timetables. Automatically add your Brunel timetable to Google Calendar, GNOME Calendar or any other calendar application providing support for Web iCal.

## Run your own

### Heroku

Heroku is a Paas (Platform as a Service) which allows you to run your web applications without worrying about the infrastructure. Also providing a free tier which is surfice for running BruCal. WARNING: By using Heroku you are entrusting them with your university credentials.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/bencevans/brucal)

Deploying...

0. Click on above 'Deploy to Heroku' button.
1. Login / Signup to Heroku if required.
2. Fill in your BRUNEL_ID (7 digit student number) and BRUNEL_PASS (Brunel network password) and click 'Deploy App'.

Finding the iCal URL...

3. Wait for deployment process to finish.
4. In the top right, click 'More' then 'View Logs'.
5. Here you will find the URL to your iCal, copy the path of the URL.
6. Click 'Open app'. This will give you an error message for now, paste the ICal path to the end of this app's URL.

### Linux

Ensure `node` (v8+), `npm` and `git` are installed.

    $ git clone https://github.com/bencevans/brucal.git
    $ cd brucal
    $ npm install
    $ BRUNEL_ID=yourstudentid BRUNEL_PASS=brunelpassword ACCESS_TOKEN=arandomsecuretoken npm start

## Related

* [brutime](https://github.com/bencevans/brutime) - node.js module for scraping Brunel's timetabling system
