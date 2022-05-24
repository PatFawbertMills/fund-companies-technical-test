import { describe, expect, test } from "vitest";
import { cloneDeep } from "lodash";
import { dedupeCompanies } from "./dedupeCompanies";

describe("dedupeCompanies()", () => {
  test("returns unedited list if no dupes", () => {
    expect(dedupeCompanies(COMPANY_TEST_DATA)).toEqual(COMPANY_TEST_DATA);
  });

  test("returns empty array if not passed anything", () => {
    expect(dedupeCompanies([])).toEqual([]);
  });

  test("removes duplicates", () => {
    let clonedData = cloneDeep(COMPANY_TEST_DATA);
    expect(dedupeCompanies([...clonedData, ...clonedData])).toHaveLength(3);
  });

  // Needed to cloneDeep the test data due to javascript's ...spread only going one level deep
  // Deeper levels are still referenced which would result in tests invalidating each other
  test("sums the company's weighting", () => {
    let clonedData = cloneDeep(COMPANY_TEST_DATA);
    expect(dedupeCompanies([...clonedData, ...clonedData])).toEqual(COMPANY_TEST_DATA_RESULT);
  });
});

const COMPANY_TEST_DATA = [
  {
    name: "MicroFit",
    weight: 0.5,
  },
  {
    name: "GreenCo",
    weight: 0.3,
  },
  {
    name: "GrapeCo",
    weight: 0.2,
  },
];

const COMPANY_TEST_DATA_RESULT = [
  {
    name: "MicroFit",
    weight: 1.0,
  },
  {
    name: "GreenCo",
    weight: 0.6,
  },
  {
    name: "GrapeCo",
    weight: 0.4,
  },
];
