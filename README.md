# Commute Helper

## Description

A chrome extension for quickly looking up the next departures between two stations in Sweden.

## Install

Commute helper is published on the chrome web store and can be installed [here](https://chrome.google.com/webstore/detail/commute-helper/dclghcafhdikahhookjkphbfpbckienm).

## Run locally

You will need an API key from [https://www.trafiklab.se/](https://www.trafiklab.se/) for the [ResRobot v2.1 service](https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/). It is free!

1. Clone this repository
2. Create a `.env` file and add your API key `VITE_API_KEY="YOUR-API-KEY"`
3. Install dependencies - `pnpm install`
4. Build project - `pnpm build`
5. Move the `dist` directory to some path where you wont remove it (if the folder is removed after setup the extension will stop working)
6. Open your browser and go to [chrome://extensions](chrome://extensions)
7. Enable `developer mode` in the top right
8. Click the `Load unpacked` button in the top left and select the folder

🎉 Voila, the extension is now installed
