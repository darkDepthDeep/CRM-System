import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "../../store/slices/authSlice";
import type { AppDispatch } from "../../store";

const AppInitalizer = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return null;
};

export default AppInitalizer;
