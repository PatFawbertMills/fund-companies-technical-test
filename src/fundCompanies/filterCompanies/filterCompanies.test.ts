import { describe, expect, test } from "vitest";
import { filterCompanies } from "./filterCompanies";

describe("filterCompanies()", () => {
  test("Return empty array if no holding fund supplied", () => {
    expect(filterCompanies(FUND_TEST_DATA, 1, [])).toEqual([]);
  });

  test("Return correct number of companies", () => {
    expect(filterCompanies(FUND_TEST_DATA, 1, HOLDING_TEST_DATA)).toHaveLength(4);
  });

  test("Return correct shape of companies", () => {
    expect(filterCompanies(FUND_TEST_DATA, 1, HOLDING_TEST_DATA)).toEqual(COMPANY_TEST_DATA);
  });

  // Reducing weight from 1 to 0.5 should halve all company weights
  test("Reduce company weight based on parent weighting", () => {
    expect(filterCompanies(FUND_TEST_DATA, 0.5, HOLDING_TEST_DATA)).toEqual(COMPANY_TEST_DATA_HALF_WEIGHT);
  });

  // Prove that any level of nesting is handled
  test("Find companies that are deeply nested", () => {
    expect(filterCompanies(FUND_TEST_DATA, 1, DEEP_NESTED_HOLDING_DATA)).toEqual(DEEP_NESTED_COMPANY_DATA);
  });

  // Circular fund inheritance should only bring back one instance of the fund content
  test("Ignore circular fund nesting", () => {
    expect(filterCompanies(FUND_TEST_DATA, 1, HOLDING_CIRCULAR_TEST_DATA)).toEqual(HOLDING_CIRCULAR_COMPANY_DATA);
  });
});

const FUND_TEST_DATA = [
  {
    name: "Test Fund",
    holdings: [
      {
        name: "A",
        weight: 0.2,
      },
      {
        name: "B",
        weight: 0.5,
      },
      {
        name: "C",
        weight: 0.15,
      },
      {
        name: "D",
        weight: 0.15,
      },
    ],
  },
  {
    name: "Fund A",
    holdings: [
      {
        name: "Fund B",
        weight: 0.5,
      },
    ],
  },
  {
    name: "Fund B",
    holdings: [
      {
        name: "Fund C",
        weight: 0.5,
      },
    ],
  },
  {
    name: "Fund C",
    holdings: [
      {
        name: "Fund D",
        weight: 0.5,
      },
    ],
  },
  {
    name: "Fund D",
    holdings: [
      {
        name: "Deep nested company!",
        weight: 1,
      },
    ],
  },
  {
    name: "Fund Circular A",
    holdings: [
      {
        name: "Company A",
        weight: 0.5,
      },
      {
        name: "Fund Circular B",
        weight: 0.5,
      },
    ],
  },
  {
    name: "Fund Circular B",
    holdings: [
      {
        name: "Company B",
        weight: 0.8,
      },
      {
        name: "Fund Circular A",
        weight: 0.2,
      },
    ],
  },
];

const HOLDING_TEST_DATA = [
  {
    name: "A",
    weight: 0.2,
  },
  {
    name: "B",
    weight: 0.5,
  },
  {
    name: "C",
    weight: 0.15,
  },
  {
    name: "D",
    weight: 0.15,
  },
];

const COMPANY_TEST_DATA = [
  {
    name: "A",
    weight: 0.2,
  },
  {
    name: "B",
    weight: 0.5,
  },
  {
    name: "C",
    weight: 0.15,
  },
  {
    name: "D",
    weight: 0.15,
  },
];

const COMPANY_TEST_DATA_HALF_WEIGHT = [
  {
    name: "A",
    weight: 0.1,
  },
  {
    name: "B",
    weight: 0.25,
  },
  {
    name: "C",
    weight: 0.075,
  },
  {
    name: "D",
    weight: 0.075,
  },
];

const DEEP_NESTED_HOLDING_DATA = [
  {
    name: "Fund A",
    weight: 0.5,
  },
];

const DEEP_NESTED_COMPANY_DATA = [
  {
    name: "Deep nested company!",
    weight: 0.063,
  },
];

const HOLDING_CIRCULAR_TEST_DATA = [
  {
    name: "Company A",
    weight: 0.5,
  },
  {
    name: "Fund Circular B",
    weight: 0.5,
  },
];

const HOLDING_CIRCULAR_COMPANY_DATA = [
  {
    name: "Company A",
    weight: 0.5,
  },
  {
    name: "Company B",
    weight: 0.4,
  },
];
