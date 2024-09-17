import dayjs from "dayjs";
import { KLINE_FIELDS } from "@/coin/bybit/bybit.const";
import { Kline } from "@/coin/bybit/bybit.type";

export function printKlineData(data: any) {
  const timeFormatSeoul = dayjs(data.start)
    .tz("Asia/Seoul")
    .format("YYYY-MM-DD HH:mm:ss");
  const printList: string[] = KLINE_FIELDS.map(
    (field) => `${field}: ${data[field]}`,
  );
  console.log("----------------------------------------");
  console.log(timeFormatSeoul);
  console.log(printList.join("\n"));
  console.log("----------------------------------------");
}

export function convertKline(data: any): Kline {
  return {
    start: Number(data[0]),
    open: Number(data[1]),
    high: Number(data[2]),
    low: Number(data[3]),
    close: Number(data[4]),
  };
}
