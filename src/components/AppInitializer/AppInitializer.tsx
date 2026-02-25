import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../store/slices/authSlice";
import { fetchProfile } from "../../store/slices/profileSlice";
import type { AppDispatch, RootState } from "../../store";

const AppInitializer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, authChecked } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (authChecked && isAuthenticated) {
      dispatch(fetchProfile());
    }
  }, [dispatch, authChecked, isAuthenticated]);

  return null;
};

export default AppInitializer;
