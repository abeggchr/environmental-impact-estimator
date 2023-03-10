# Environmental Impact of Software Estimator

## Purpose

This tool estimates the carbon footprint for an average enterprise-software project.
A set of decorates allows to play around to see the impact of different optimization measures.

## Getting started

The easiest way to start is to run and adopt `MasterTest` in the `api` project.

1. Clone repo
2. `cd api`
3. `npm i`
4. `npm run test -- Master.test.ts`
5. Inspect the console log. You'll see the estimates for the baseline plus the decorated (aka. optimized) version. It's a CSV, so for advanced analysis, copy it to Excel.

### Starting the web frontend

There's a frontend, but not much visible there. Lot's of ideas though!

1. Clone repo
2. `cd api`
3. `npm i`
4. `npm start`
5. `cd ../web`
6. `npm i`
7. `npm run dev`
8. Open given URL in browser. You will not yet see much though.

## Structure

* `/api` contains an Express REST endpoint with the estimation logic
* `/web` contains a React user interface
* `/talks` contains preparation files to present the findings

### API

![api structure](./api/api.structure.png)
