import { describe, expect, test } from "vitest";
import { getFundCompanies } from "./getFundCompanies";

// Not the greatest test because the heavy lifting is done outside this function
describe("getFundCompanies()", () => {
  test("Return empty if fund name not found", () => {
    expect(getFundCompanies("test")).toEqual([]);
  });

  test("Return empty if no data is receieved", () => {
    expect(getFundCompanies("Test Fund", [])).toEqual([]);
  });

  // I included these tests below but you can argue the other tests are already adequate
  test("Return just the companies", () => {
    expect(getFundCompanies("Test Fund", FUND_TEST_DATA)).toEqual(COMPANY_TEST_DATA);
  });

  test("Allow any fund to be accessed", () => {
    expect(getFundCompanies("Another Test Fund", FUND_TEST_DATA)).toEqual(COMPANY_TEST_DATA);
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
    name: "Another Test Fund",
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
