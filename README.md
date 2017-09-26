# BruCal

> iCal Web Service for Brunel Timetables. Automatically add your Brunel timetable to Google Calender, GNOME Calender or any other calender application providing support for Web iCal.

**USE AT YOUR OWN RISK. I take no responsibility for the use or security of this project.**

## Run your own

### Heroku

Heroku is a Paas (Platform as a Service) which allows you to run your web applications without worrying about the infrastructure. Also providing a free tier which is surfice for running BruCal. WARNING: By using Heroku you are entrusting them with your university credentials.

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Linux

Ensure `node` (v8+), `npm` and `git` are installed.

    $ git clone https://github.com/bencevans/brucal.git
    $ cd brucal
    $ npm install
    $ BRUNEL_ID=yourstudentid BRUNEL_PASS=brunelpassword ACCESS_TOKEN=arandomsecuretoken npm start

## Related

* [brutime](https://github.com/bencevans/brutime) - node.js module for scraping Brunel's timetabling system
