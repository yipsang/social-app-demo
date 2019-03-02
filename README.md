# Social App Demo

This is a mobile app developed using React Native with Expo.

The app uses RESTFul API provided by `https://jsonplaceholder.typicode.com` to fetch remote data.

It has been tested on iPhone X (12.1) and Pixel2 XL emulator (Android 6.0).

## Initiate the project

```
yarn install
```

## Run the project

```
yarn start
```

P.S. In order to test on real device, you need to install Expo app on your device.

## Development

This project uses typescript. Therefore everytime you commit, please ensure your code is type safe by running:

```
yarn tsc
```

## Features

*   Two tabs - Post and Album
*   In Post tab, you can view posts with infinity scroll implemented
*   Pressing each post, you can see all the comments
*   Pressing the name bubble in the top of the post details page, you can view the user information, with his other posts
*   In Album post, you can view albums with infinity scroll implmented
*   Pressing each album, you can view all the photos in the album
