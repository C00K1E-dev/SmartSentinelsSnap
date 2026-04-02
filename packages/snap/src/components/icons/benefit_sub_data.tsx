import React from "react";

import ArtDeals from "./icons-benefit-sub-cat/ArtDeals.svg";
import Airdrops from "./icons-benefit-sub-cat/Airdrops.svg";
import AccessPass from "./icons-benefit-sub-cat/AccessPass.svg";
import AvatarCollection from "./icons-benefit-sub-cat/AvatarCollection.svg";
import CulinaryAdventures from "./icons-benefit-sub-cat/CulinaryAdventures.svg";
import DigitalLand from "./icons-benefit-sub-cat/DigitalLand.svg";
import EarnRewards from "./icons-benefit-sub-cat/EarnRewards.svg";
import Fashion from "./icons-benefit-sub-cat/Fashion.svg";
import Education from "./icons-benefit-sub-cat/Education.svg";
import Entertainment from "./icons-benefit-sub-cat/Entertainment.svg";
import ExclusiveLicensing from "./icons-benefit-sub-cat/ExclusiveLicensing.svg";
import DigitalEvents from "./icons-benefit-sub-cat/DigitalEvents.svg";
import HealthAndWellness from "./icons-benefit-sub-cat/HealthAndWellness.svg";
import IrlEvents from "./icons-benefit-sub-cat/IrlEvents.svg";
import FamilyFun from "./icons-benefit-sub-cat/FamilyFun.svg";
import Lifestyle from "./icons-benefit-sub-cat/Lifestyle.svg";
import Luxury from "./icons-benefit-sub-cat/Luxury.svg";
import Experience from "./icons-benefit-sub-cat/Experience.svg";
import Metaverse from "./icons-benefit-sub-cat/Metaverse.svg";
import Memes from "./icons-benefit-sub-cat/Memes.svg";
import Networking from "./icons-benefit-sub-cat/NetworkingOpportunities.svg";
import CharityAndFundraising from "./icons-benefit-sub-cat/CharityAndFundraising.svg";
import Sports from "./icons-benefit-sub-cat/Sports.svg";
import StoryTelling from "./icons-benefit-sub-cat/StoryTelling.svg";
import Home from "./icons-benefit-sub-cat/Home.svg";
import Music from "./icons-benefit-sub-cat/Music.svg";
import Travel from "./icons-benefit-sub-cat/Travel.svg";
import Collectibles from "./icons-benefit-sub-cat/Collectibles.svg";
import GamingItems from "./icons-benefit-sub-cat/GamingItems.svg";
import WorldOfAnime from "./icons-benefit-sub-cat/WorldOfAnime.svg";

type BenefitSubCategoryProps = {
  Icon: React.FC;
};

const benefitSubCategoryMap: any = {
  Home: Home,
  Music: Music,
  Sports: Sports,
  Charity: CharityAndFundraising,
  AccessPass: AccessPass,
  Airdrops: Airdrops,
  Fashion: Fashion,
  Art: ArtDeals,
  Licensing: ExclusiveLicensing,
  Education: Education,
  Metaverse: Metaverse,
  "IRL Event": IrlEvents,
  Storytelling: StoryTelling,
  FamilyFun: FamilyFun,
  Networking: Networking,
  Collectibles: Collectibles,
  "Digital Land": DigitalLand,
  "Digital Event": DigitalEvents,
  Gaming: GamingItems,
  "Earn Rewards": EarnRewards,
  "Food & Beverages": CulinaryAdventures,
  "World of Anime": WorldOfAnime,
  "Avatar Collection": AvatarCollection,
  Travel: Travel,
  Lifestyle: Lifestyle,
  "Health & Wellness": HealthAndWellness,
  Memes: Memes,
  Experiences: Experience,
  Luxury: Luxury,
  Entertainment: Entertainment,
};

export { benefitSubCategoryMap };
export type { BenefitSubCategoryProps };
