// Import the express in typescript file
import express, {json} from 'express';
import cors from 'cors';
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

app.use(cors());

// Handling '/' Request
app.get('/', (_req, _res) => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    _res.json(baseline.gC02eq);
});

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});