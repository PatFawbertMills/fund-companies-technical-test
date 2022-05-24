import { describe, expect, test } from "vitest";
import { toPercent } from "./toPercent";

describe("toPercent()", () => {
  test("converts to a percentage", () => {
    expect(toPercent(0.04)).toBe(4);
  });

  test("outputs to 1 decimal place", () => {
    expect(toPercent(0.012)).toBe(1.2);
  });

  test("handles numbers over 100%", () => {
    expect(toPercent(1.12345678)).toBe(112.3);
  });

  test("outputs a number"),
    () => {
      expect(toPercent(1)).toBeTypeOf('number');
    };
});
