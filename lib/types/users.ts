type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  updatedAt: string | null;
  createdAt: string;
};

export { type User };
