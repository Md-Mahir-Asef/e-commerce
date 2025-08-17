import { Router } from "express";
import { pingResponder } from "../controllers/ping.controller";

const routes = Router();

routes.get("/ping", pingResponder);

export default routes;
