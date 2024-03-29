export type PriceHistoryItem = {
  price: number;
};

export type UserType = {
  _id?: string;
  email: string;
  phoneNumber: string;
  name: string;
  password: string;
};

export type Product = {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: UserType[];
};

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
};

export interface RestaurantProps {
  _id?: string;
  user?: string;
  scrapeData?: RestaurantCardProps[];
  createAt?: string;
  updateAt?: string;
}

export interface RestaurantCardProps {
  _id?: string;
  logo?: string;
  name?: string;
  category?: string;
  address?: string;
  phone?: string;
  socialLinks?: string[];
  visitorsReview?: string;
  blogReview?: string;
  reviews?: Review[];
  trendingKeywords?: string[];
  menu?: any[] | string;
  naverKeywords?: NaverKeywordData[];
}

interface Review {
  type: string;
  count: number;
}
export type NaverKeywordData = {
  relKeyword: string;
  monthlyPcQcCnt: number;
  monthlyMobileQcCnt: number;
  monthlyAvePcClkCnt: number;
  monthlyAveMobileClkCnt: number;
  monthlyAvePcCtr: number;
  monthlyAveMobileCtr: number;
  plAvgDepth: number;
  compIdx: string;
};
