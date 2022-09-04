import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AddDispatch } from "../store/store";

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
