import { IHolding } from "../types";

// Ensure we only have one instance of a company in our collection
export const dedupeCompanies = (companies: IHolding[]): IHolding[] => {
  return companies.reduce<IHolding[]>((uniqueCompanies, current) => {
    const index = uniqueCompanies.findIndex((item) => item.name === current.name);
    if (index === -1) {
      return uniqueCompanies.concat([current]);
    } else {
      // If we have a record of the company, sum the weights together
      uniqueCompanies[index].weight += current.weight;
      return uniqueCompanies;
    }
  }, []);
};
