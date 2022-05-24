import { find, flow } from "lodash";
import { IFund } from "../types";
import { filterCompanies } from "../filterCompanies";
import { dedupeCompanies } from "../dedupeCompanies";

import RAW_DATA from "../../../data.json";

// I'm passing the data in as a prop to illustrate this could come from an API in future, for example
export const getFundCompanies = (fundName: string, data = RAW_DATA) => {
  const fundData: IFund[] = data;
  // Escape if we have bad data
  if (!fundData || !fundData.length) return [];

  // Escape if we don't have the fund
  const mainFund = find(fundData, { name: fundName });
  if (!mainFund) return [];

  // Weight can be assumed as 1 for the top level fund, 1 being 100% of the fund
  // const companyHoldings = filterCompanies(fundData, 1, mainFund.holdings);

  // Ensure we only have 1 instance of each company, summing the weights
  // const filteredCompanies = dedupeCompanies(companyHoldings);
  // return filteredCompanies;

  // I wanted to try an implementation of 'Function Composition'
  const processCompanies = flow(filterCompanies, dedupeCompanies);
  return processCompanies(fundData, 1, mainFund.holdings, [fundName]);
};
