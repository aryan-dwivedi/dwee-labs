import { usersRouter } from "@/routes/users.route";

import { Router } from "express";

const router = Router();

const defaultRoutes = [
  {
    path: "/users",
    route: usersRouter,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
