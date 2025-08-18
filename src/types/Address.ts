export enum AddressType {
  HOME = "HOME",
  WORK = "WORK",
  OTHER = "OTHER"
}

export interface Address {
  id: string;
  userId: string;
  addressType: AddressType;
  personName: string;
  phoneNumber: string;

  houseNumber: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pinCode: string;

  isDefault: boolean;
  latitude: string;
  longitude: string;

  createdAt: string;
  updatedAt: string;
}