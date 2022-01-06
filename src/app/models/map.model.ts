export interface MapModel {
  listID?: string;
  type?: string;
  properties?: {
    order?: 0;
    propertyID?: number;
    name?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    pets?: boolean;
    washerDry?: string;
    photo?: string;
    favorite?: false;
    highestSentCommissions?: number;
    onsiteManager?: any;
    management?: any;
    proximity?: any;
    section8?: boolean;
    seniorHousing?: boolean;
    studentHousting?: boolean;
    floorplans?: [
      {
        bedrooms?: number;
        type?: string;
        price?: number;
      }
    ];
    highValueAmenities?: string[];
    paidUtilities?: string[];
  };
  geometry?: {
    type?: string;
    coordinates?: [number, number];
    Percision?: string;
    IsValid?: boolean;
  };
}
