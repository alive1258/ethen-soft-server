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
import { OTPVerificationRoute } from "../modules/OTPVerification/OTPVerification.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PricingCategoryRoutes } from "../modules/pricingCategory/pricingCategory.route";
import { PricingFeatureRoutes } from "../modules/pricingFeature/pricingFeature.route";
import { PricingRoutes } from "../modules/pricing/pricing.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ServiceImageRoutes } from "../modules/serviceImage/serviceImage.route";
import { ServiceFAQRoutes } from "../modules/serviceFAQ/serviceFAQ.route";
import { ClientReviewRoutes } from "../modules/clientReview/clientReview.route";
import { FeatureAssignedPricingRoutes } from "../modules/FeatureAssignedPricing/FeatureAssignedPricing.route";
import { RefundPolicyRoutes } from "../modules/refundPolicy/refundPolicy.route";
import { ContactUsRoutes } from "../modules/contactUs/contactUs.route";
import { PaymentRoutes } from "../modules/payments/payment.route";

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
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/otp",
    router: OTPVerificationRoute,
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
    path: "/refund-policies",
    router: RefundPolicyRoutes,
  },
  {
    path: "/terms-conditions",
    router: TermsConditionRoutes,
  },
  {
    path: "/pricing-categories",
    router: PricingCategoryRoutes,
  },
  {
    path: "/pricing-features",
    router: PricingFeatureRoutes,
  },
  {
    path: "/pricing",
    router: PricingRoutes,
  },
  {
    path: "/feature-assigned-pricing",
    router: FeatureAssignedPricingRoutes,
  },
  {
    path: "/services",
    router: ServiceRoutes,
  },
  {
    path: "/categories",
    router: CategoryRoutes,
  },
  {
    path: "/service-images",
    router: ServiceImageRoutes,
  },
  {
    path: "/service-faqs",
    router: ServiceFAQRoutes,
  },
  {
    path: "/client-reviews",
    router: ClientReviewRoutes,
  },
  {
    path: "/contact-us",
    router: ContactUsRoutes,
  },
  {
    path: "/payments",
    router: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.router);
});

export default router;
