export interface Items {
       id: number
       name: string
       productId: number
}

export interface OptionalParams {
  vendorOption: VendorOptions;
  averageOpton: AverageOptions<any>;
  informationOptions: InformationOptions;
}
 
 export interface VendorOptions {
   vendorId: number;
   vendorLogo:MediaImage;
   vendorName: string;
   vendorWebsiteUrl: string;
   vendorDescription: string;
   vendorAddress: string;
 }
 export interface AverageOptions<T> {
  averageLastWeek: number;
  averageMonthly: number;
  averageYearly: number;
  lastWeekPrice: number;
  averageMonthlyPrice: number;
  averageYearlyPrice: number;
};
export interface InformationOptions {
descriptionofItem: string;
ItemCategory: 'Meats' |  'Seafoods' | 'Poultry' | 'Frozen' |  'Dry' |  'FrontBathroom' | 'FrontCleaning' | 'BackCleaning' | 'Other' 
ItemEntrees: string[] | string;
Portion: number[] | number;
}

 
 