import { isFunction } from "../../utils";
import invertCondition from "../invertCondition";

const not = argsOrFn => {
  if (isFunction(argsOrFn)) {
    const fn = argsOrFn;
    return (...args) => invertCondition(fn(...args));
  } else {
    const args = argsOrFn;
    return invertCondition(args);
  }
};

export default not;
