import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import userRoutes from  "./routes/user.js";
import addressRoutes from "./routes/address.js";
import WorkerRoutes from './routes/worker.js';
import projectRoutes from "./routes/project.js";
import proposalRoutes from "./routes/proposal.js"
import userRequestRoutes from './routes/userRequest.js';

dotenv.config();

const app = express();
const { MONGODB_URI, PORT } = process.env;

app.use(bodyParser.json());

// Use WorkerRoutes middleware
app.use(userRoutes);
app.use(addressRoutes);
app.use(WorkerRoutes);
app.use(projectRoutes);
app.use(proposalRoutes);
app.use(userRequestRoutes)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
