interface Category {
  name: string;
}

interface Collection {
  name: string;
  contractAddress: string;
  chain: string;
  url: string;
}

export interface Benefit {
  longTitle: string;
  longDescription: string;
  thumbnail: string;
  validFrom: string;
  validTo: string;
  url: string;
  location: string;
  actionDate: string;
  process: string;
  official: boolean;
  categories: Category[];
  eventFrom: string | null;
  eventTo: string;
  chain: string;
  contractAddress: string;
  contractSlug: string;
  collections: Collection[];
}
