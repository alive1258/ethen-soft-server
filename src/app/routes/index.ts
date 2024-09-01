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
import { AboutHeroRoutes } from "../modules/aboutHero/aboutHero.route";
import { CompanyGalleryRoutes } from "../modules/companyGallery/companyGallery.route";
import { ProfessionalServiceRoutes } from "../modules/professionalServices/professionalService.route";
import { OurDealRoutes } from "../modules/ourDeals/ourDeal.route";
import { OurProductRoutes } from "../modules/ourProducts/ourProduct.route";
import { TeamRoutes } from "../modules/teams/team.route";
import { JoinUsRoutes } from "../modules/joinUs/joinUs.route";
import { CareerOpportunityRoutes } from "../modules/careerOpportunity/careerOpportunity.route";
import { PrivacyPolicyRoutes } from "../modules/privacyPolicy/privacyPolicy.route";
import { TermsConditionRoutes } from "../modules/termsConditions/termsCondition.route";
import { BlogRoutes } from "../modules/blogs/blog.route";
import { BannerRoutes } from "../modules/banner/banner.route";
import { CustomerRoutes } from "../modules/customers/customer.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    router: UserRoutes,
  },
  {
    path: "/customers",
    router: CustomerRoutes,
  },
  {
    path: "/heros",
    router: HeroRoutes,
  },
  {
    path: "/banner",
    router: BannerRoutes,
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
    path: "/home-about",
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
    path: "/blogs",
    router: BlogRoutes,
  },
  {
    path: "/our-clients",
    router: OurClientRoutes,
  },
  {
    path: "/faqs",
    router: FaqRoutes,
  },
  {
    path: "/about-heros",
    router: AboutHeroRoutes,
  },
  {
    path: "/company-galleries",
    router: CompanyGalleryRoutes,
  },
  {
    path: "/professional-services",
    router: ProfessionalServiceRoutes,
  },
  {
    path: "/our-deals",
    router: OurDealRoutes,
  },

  {
    path: "/our-products",
    router: OurProductRoutes,
  },
  {
    path: "/teams",
    router: TeamRoutes,
  },
  {
    path: "/join-us",
    router: JoinUsRoutes,
  },
  {
    path: "/career-opportunities",
    router: CareerOpportunityRoutes,
  },
  {
    path: "/privacy-policies",
    router: PrivacyPolicyRoutes,
  },
  {
    path: "/terms-conditions",
    router: TermsConditionRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
