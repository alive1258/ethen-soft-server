import { Router } from "express";
import { UserRoutes } from "../modules/users/user.route";

import { TechnologyRoutes } from "../modules/technologies/technology.route";
import { HeroRoutes } from "../modules/HeroDescription/hero.route";
import { TrustUsRoutes } from "../modules/trustUs/trustUs.route";
import { TestimonialRoutes } from "../modules/testimonials/testimonial.route";
import { OurClientRoutes } from "../modules/ourClients/ourClient.route";
import { FaqRoutes } from "../modules/faqs/faq.route";
import { OurServiceRoutes } from "../modules/ourServices/ourService.route";
import { HomeAboutRoutes } from "../modules/homeAbout/homeAbout.route";
import { OurWorkRoutes } from "../modules/ourWorks/ourWork.route";

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
  {
    path: "/technologies",
    router: TechnologyRoutes,
  },
  {
    path: "/our-services",
    router: OurServiceRoutes,
  },
  {
    path: "/home-about ",
    router: HomeAboutRoutes,
  },
  {
    path: "/trust-us",
    router: TrustUsRoutes,
  },
  {
    path: "/our-works",
    router: OurWorkRoutes,
  },
  {
    path: "/testimonials",
    router: TestimonialRoutes,
  },
  {
    path: "/our-clients",
    router: OurClientRoutes,
  },
  {
    path: "/faqs",
    router: FaqRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
