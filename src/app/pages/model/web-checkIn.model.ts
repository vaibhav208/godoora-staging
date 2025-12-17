// import { SignaturePad } from 'angular2-signaturepad/signature-pad';

export class WebCheckInModel {
    constructor(
        public emailId?: string,
        public guestName?: string,
        public contactNumber?: string,
        public address?: string,
        public CheckIn?: string,
        public CheckOut?: string,
        public numberOfGuests?: string,
        public emergencyContact?: string,
        public idProof?: string,
        public healthIssues?: string,
        public travelHistory?: string,
        public covidContact?: string,
        public aarogyaSetuapp?: boolean,
        // public signaturePad?: SignaturePad
    ) {}
}
