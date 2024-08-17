import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";
import { HeroRoutes } from "../modules/HeroDescription/hero.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    router: UserRoutes,
  },
  {
    path: "/heros",
    router: HeroRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
