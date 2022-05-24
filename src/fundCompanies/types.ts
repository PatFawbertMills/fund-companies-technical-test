export interface IFund {
  name: string;
  holdings: IHolding[];
}

export interface IHolding {
  name: string;
  weight: number;
}
