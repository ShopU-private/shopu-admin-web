export interface UserListResponse {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string; 
  lastSignedAt: string;
}


export interface User {
  id: string;
  name?: string;
  email?: string;
  phoneNumber: string;
  whatsappNumber?: string;
  role: Role;
  orderIds: string[];
  cartItemsId: string[];
  addressIds: string[];
  createdAt: string
  updatedAt?: string
  lastSignedAt?: string;
}

export enum Role{
    ADMIN = 'ADMIN',
    USER = 'USER'
}