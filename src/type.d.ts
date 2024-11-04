enum Material {
  Wood = "wood",
  Horn = "horn",
  Metal = "metal",
  Stone = "stone",
  Glass = "glass",
  Plastic = "plastic",
  Composite = "composite",
  Rubber = "rubber",
  Leather = "leather",
  Bone = "bone",
  Ivory = "ivory",
  Paper = "paper",
  Cord = "cord",
  Other = "other"
}

export interface Knife {
  _id: string;
  name: string;
  images: string[];
  handle: Material;
  blade: Material;
  sharpness: number;
  price: number;
  durability: number;
  weight: number;
  length: number;
  description: string;
  userId: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin'
}

export interface BaseUser {
  _id: string;
  username: string;
  role: Role;
}