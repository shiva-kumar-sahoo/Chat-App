export const AuthContext = createContext();

const AuthContextProvider = ({ Children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userToken,
      }}
    >
      {Children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
