import { setUser, setLoading } from "../state/auth.slice";
import { register, login, getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";
import type { RegisterInput ,LoginInput} from "../../../types/auth.types";

export const useAuth = () => {
  const dispatch = useDispatch();

  async function handleRegister(data:RegisterInput ){
    const response = await register(data);
    dispatch(setUser(response.user));
    return response.user;
  }

  async function handleLogin(data:LoginInput) {
    const response = await login(data);
    dispatch(setUser(response.user));
    return response.user;
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));

      const response = await getMe();

      dispatch(setUser(response.user));

      return response.user;
    } catch (error) {
      dispatch(setUser(null));
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  }
  return { handleRegister, handleLogin, handleGetMe };
};
