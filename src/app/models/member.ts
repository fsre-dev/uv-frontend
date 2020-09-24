import {Membership} from './membership';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  cardNumber: string;
  memberType: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  cellNumber: string;
  email: string;
  birthDate: string;
  passportNumber: string;
  identityCard: string;
  oib: string;
  membership: Membership;
  deleted: boolean;
}
