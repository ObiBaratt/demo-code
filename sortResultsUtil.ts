import { DisplayResult, sortInput } from "@/types";
import { MAX_DISPLAY_LENGTH } from "@/constants";

export const sortDisplayResults = ({
  isNum,
  results,
}: sortInput): DisplayResult[] => {
  const resultLength = results.TYPE1.length + results.TYPE2.length;
  const validResults =
    MAX_DISPLAY_LENGTH > resultLength ? resultLength : MAX_DISPLAY_LENGTH;

  const toDisplay: DisplayResult[] = [];

  let count = 0;

  while (toDisplay.length < validResults) {
    if (isNum) {
      let item;
      if (results.TYPE2.length > count) {
        item = {
          type: "TYPE2",
          id: results.TYPE2[count].TYPE2_ID,
          displayName: results.TYPE2[count].TYPE2_NAME,
        };
      } else {
        item = {
          type: "TYPE1",
          id: results.TYPE1[count - results.TYPE2.length].TYPE1_ID,
          displayName:
            results.TYPE1[count - results.TYPE2.length].TYPE1_NAME,
        };
      }
      count++;
      toDisplay.push(item);
    } else {
      let item;
      if (results.TYPE1.length > count) {
        item = {
          type: "TYPE1",
          id: results.TYPE1[count].TYPE1_NAME,
          displayName: results.TYPE1[count].TYPE1_NAME,
        };
      } else {
        item = {
          type: "TYPE2",
          id: results.TYPE2[count - results.TYPE1.length].TYPE2_NAME,
          displayName:
            results.TYPE2[count - results.TYPE1.length].TYPE2_NAME,
        };
      }
      count++;
      toDisplay.push(item);
    }
  }
  return toDisplay;
};
