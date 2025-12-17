export class AvailableDays {
    constructor(
        public day?: string,
        public startTime?: string,
        public endTime?: string,
        public durationInMin?: string,
        public slotLimit?: string,
        public checked?: boolean
    ) {
        this.durationInMin = '30';
        this.slotLimit = '3';
        this.startTime = '08:00';
        this.endTime = '19:00';
    }
}

export class ShopKeeperDetail {
    constructor(
        public name?: string,
        public phonenumber?: string,
        public description?: string,
        public idCategory?: number,
        public formattedAddress?: string,
        public photoReference?: string,
        public locationId?: number,
        public lat?: number,
        public lng?: number,
        public firstTime?: boolean,
        public type?: string,
        public userId?: number,
        public loginId?: string,
        public availableDays?: Array<AvailableDays>,
        public shops?: Array<ShopKeeperDetail>
    ) {
        this.type = 'S';
        this.availableDays = new Array<AvailableDays>();
        this.shops = new Array<ShopKeeperDetail>();
    }
}

export class Otp {

    constructor(
        public digit1?: any,
        public digit2?: any,
        public digit3?: any,
        public digit4?: any,
    ) {
        this.digit1 = null;
        this.digit2 = null;
        this.digit3 = null;
        this.digit4 = null;
    }
}


// export const Categories = {
//     0 : 'social2.jpg',
//     1 : 'salon.png'
// };

