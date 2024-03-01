import { useContext } from "react";
import { ListContext } from "../context/list-context";

export const useListContext = () => useContext(ListContext);