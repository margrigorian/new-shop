import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>(); // типизировали стандартный хук useDispatch
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector; // типизировали useSelector

// и новые переменные будут использоваться вместо useDispatch и useSelector