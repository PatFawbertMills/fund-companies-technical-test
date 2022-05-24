import { useMemo } from "react";
import { getFundCompanies } from "./getFundCompanies";

export const useFundCompanies = (fund: string = "") => {
  // 'Expensive' so warrants a useMemo hook
  const companies = useMemo(() => getFundCompanies(fund), [getFundCompanies, fund]);
  return companies;
};
