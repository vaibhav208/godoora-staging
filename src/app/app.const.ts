import { localhost4200 } from "./vendors/localhost";
import { demohotelExperiences } from "./vendors/demohotel-experiences";
import { aatapiWonderlandExperiences} from "./vendors/aatapi-wonderland-experiences";
import { amara_ayurveda } from "./vendors/amara-ayurveda-retreat";
import { thebesttrip } from "./vendors/beta.thebesttrip";
import { clarksinnExperiences } from "./vendors/clarksinn-experiences";
import { cloudfront } from "./vendors/cloudfront";
import { fortunehotelsExperiences } from "./vendors/fortunehotels-experiences";
import { godigital } from "./vendors/godigital";
import { godoora } from "./vendors/godoora";
import { goyaana } from "./vendors/goyaana";
import { kemps_corner } from "./vendors/hotel-kemps-corner";
import { littlearth } from "./vendors/littlearth";
import { nature_resorts } from "./vendors/nature-resorts";
import { pridehotelExperiences } from "./vendors/pridehotel-experiences";
import { RoyalOrchidExperiences } from "./vendors/royalorchid-experiences";
import { storiiamoharetreatExperiences } from "./vendors/storiiamoharetreat-experiences";
import { travelDeals } from "./vendors/traveldeals";
import { raddisonHotelsExperiences } from "./vendors/radissonhotels-experiences";
import { nikooSalon } from "./vendors/nikoo-salon";

export const Vendors = {
    ...localhost4200,
    ...demohotelExperiences,
    ...aatapiWonderlandExperiences,
    ...amara_ayurveda,
    ...thebesttrip,
    ...clarksinnExperiences,
    ...cloudfront,
    ...fortunehotelsExperiences,
    ...godigital,
    ...godoora,
    ...goyaana,
    ...kemps_corner,
    ...littlearth,
    ...nature_resorts,
    ...pridehotelExperiences,
    ...RoyalOrchidExperiences,
    ...storiiamoharetreatExperiences,
    ...travelDeals,
    ...raddisonHotelsExperiences
}


export class LoginType {
    constructor(
        public normalLogin?: boolean,
        public fbLogin?: boolean,
        public googleLogin?: boolean
    ) {
    }
}

export class VendorDeatil {
    constructor(
        public id?: string,
        public branch?: string,
        public idCategory?: number,
        public logo?: string,
        public theme?: string,
        public storeImg?: string,
        public label?: string,
        public editShopLabel?: string,
        public loginType?: LoginType,
        public adminLogin?: string,
        public updateShopLocation?: string,
        public mainLocation?: string,
        public searchBar?: string,
        public addressLabel?: string,
        public serviceLabel?: string,
        public departments?: Array<any[]>,
        public conceirge?: boolean,
        public comingSoon?: any,
        public offSeason?: any,
    ) {
        this.loginType = new LoginType();
    }
}