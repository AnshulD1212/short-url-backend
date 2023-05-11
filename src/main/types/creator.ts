export type Creator = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  profilePhoto: string;
};

export type CreatorBody = Omit<
  Creator,
  'id' | 'createdAt' | 'updatedAt' | 'profilePhoto' | 'verified'
>;
