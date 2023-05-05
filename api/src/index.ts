import express from "express";
import cors from "cors";
import routes from "./routes";
import * as dotenv from "dotenv";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => {
	console.log(`Server is listening on port ${port}...`);
});
