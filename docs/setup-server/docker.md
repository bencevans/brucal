# BruCal on Docker

## Running from registry

    $ docker run -d \
        -e BRUNEL_ID=1234567890 \
        -e BRUNEL_PASS=nq83uofnw \
        -p 3000:3000 \
        bencevans/brucal

## Building

    $ git clone ...
    $ docker build -t brucal .
    $ docker run -d \
        -e BRUNEL_ID=1234567890 \
        -e BRUNEL_PASS=nq83uofnw \
        -p 3000:3000 \
        brucal