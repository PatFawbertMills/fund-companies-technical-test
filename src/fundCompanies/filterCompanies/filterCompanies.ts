import { find } from "lodash";
import { IHolding, IFund } from "../types";
 
/**
 Collect all the companies in our data set. Will iterate over nested funds
 * @param collection our dataset
 * @param weight the ratio to apply to each fund or company's share of the overall fund value
 * @param fundContents the contents of the fund, this could be companies or nested funds
 * @param fundNames the collection of funds we have already iterated over, to ensure we don't fall into an infinite loop. Include any funds you want to be ignored
*/
export const filterCompanies = (collection: IFund[], weight: number = 1, fundContents: IHolding[], fundNames: string[] = []): IHolding[] => {
  let companies = [];
  for (let i = 0; i < fundContents.length; i++) {
    const holding = fundContents[i];
    // Would prefer to use a flag in the data to determine the type of holding but the test data is patchy
    if (holding.name.startsWith("Fund")) {
      // is our holding already in our collection? If so, avoid the infinite loop and return
      if(fundNames.includes(holding.name)) {
        return [];
      }
      // Ensure we can find the fund in our dataset
      const fund = find(collection, { name: holding.name });
      if (!fund) return [];
      /* 
      Important: 
        1. The weight is relative to the weight of the parent holding (a ratio)
        2. The fundNames are only relevant within the context of the top level holding iterating through it's children, this is to 
           prevent infinite nesting, e.g. B within C and then C within B
      */
      companies.push(...filterCompanies(collection, holding.weight * weight, fund.holdings, [...fundNames, holding.name]));
    } else {
      // If we have a company just add it to our companies[] collection
      const company: IHolding = { name: holding.name, weight: parseFloat((weight * holding.weight).toFixed(3)) };
      companies.push(company);
    }
  }
  return companies;
};
