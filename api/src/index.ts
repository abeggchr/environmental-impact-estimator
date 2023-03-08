// Import the express in typescript file
import express  from 'express';
import cors from 'cors';
import {ProjectEstimator} from "./estimation/ProjectEstimator";
import {BaselineProject} from "./scenario/BaselineProject";
import {NoDistributedDevelopment} from "./decorator/NoDistributedDevelopment";
import {IProject} from "./interfaces/IProject";

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3000;

app.use(cors());

// Handling '/' Request
app.get('/baseline', (_req, _res) => {
    const baseline = new ProjectEstimator().estimate(new BaselineProject());
    console.log(baseline.print("baseline"));
    _res.json(baseline.gC02eq);
});

app.get('/decorated', (_req, _res) => {
    let project:IProject = new BaselineProject();
    project = new NoDistributedDevelopment(project);
    const decorated = new ProjectEstimator().estimate(project);
    console.log(decorated.print("decorated"));
    _res.json(decorated.gC02eq);
});

// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});