import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { users, User } from '../utils/users';

export type TUserContext = {
  user: User;
  setUser: (user: User) => void;
};

const UserContext = createContext<TUserContext>({} as TUserContext);

export const useUserData = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User>(users[0]);

  const value = {
    user,
    setUser,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
