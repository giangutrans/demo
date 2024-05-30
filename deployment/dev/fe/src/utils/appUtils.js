import { omitBy, isNil } from "lodash";

export function removeUndefined(object) {
  return omitBy(object, isNil);
}
