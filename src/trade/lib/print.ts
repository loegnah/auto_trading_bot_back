import { CANDLE_FIELDS } from "./tradeConst";
import { Candle, CandleRaw } from "./tradeType";

export function printCandleData(data: CandleRaw | Candle) {
  const printList: string[] = CANDLE_FIELDS.map(
    (field) => `${field}: ${data[field]}`,
  );
  console.log("----------------------------------------");
  console.log(printList.join("\n"));
  console.log("----------------------------------------");
}

export function convertKline(data: any): Candle {
  return {
    start: Number(data[0]),
    open: Number(data[1]),
    high: Number(data[2]),
    low: Number(data[3]),
    close: Number(data[4]),
  };
}
