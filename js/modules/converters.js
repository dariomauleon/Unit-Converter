import { units, unitTable } from "../utilities/index.js";
import { createLabelOutput, cleanInputs } from "./ui.js";

const validations = (category, fromUnit, toUnit, valueInput) => {
  [category, fromUnit, toUnit, valueInput].forEach((el) => {
    el.nextElementSibling?.classList.remove("show");
  });

  if (category.value === "" || !Object.keys(units).includes(category.value)) {
    category.nextElementSibling.classList.add("show");
    return false;
  }
  if (
    fromUnit.value === "" ||
    !units[category.value].includes(fromUnit.value)
  ) {
    fromUnit.nextElementSibling.classList.add("show");
    return false;
  }
  if (toUnit.value === "" || !units[category.value].includes(toUnit.value)) {
    toUnitUnit.nextElementSibling.classList.add("show");
    return false;
  }
  if (valueInput.value === "" || isNaN(valueInput.value)) {
    valueInput.nextElementSibling.classList.add("show");
    return false;
  }
  return true;
};

const handleConverter = ({
  $unitCategory,
  $unitSelectorFrom,
  $unitSelectorTo,
  $inputValue,
  $outputValue,
}) => {
  const category = $unitCategory.value;
  const fromUnit = $unitSelectorFrom.value;
  const toUnit = $unitSelectorTo.value;
  const inputValue = $inputValue.value;

  if (
    !validations($unitCategory, $unitSelectorFrom, $unitSelectorTo, $inputValue)
  )
    return;

  let result;

  if (category === "temperature") {
    result = temperatureConverter(inputValue, fromUnit, toUnit);
  } else {
    result = generalConverter(category, fromUnit, toUnit, inputValue);
  }
  createLabelOutput(result, toUnit, $outputValue);
  cleanInputs({
    $unitCategory,
    $unitSelectorFrom,
    $unitSelectorTo,
    $inputValue,
    $outputValue,
  });
};

const temperatureConverter = (inputValue, fromUnit, toUnit) => {
  if (fromUnit === toUnit) {
    return inputValue;
  } else if (fromUnit === "C" && toUnit === "F") {
    return (inputValue * 9) / 5 + 32;
  } else if (fromUnit === "C" && toUnit === "K") {
    return inputValue + 273.15;
  } else if (fromUnit === "F" && toUnit === "C") {
    return ((inputValue - 32) * 5) / 9;
  } else if (fromUnit === "F" && toUnit === "K") {
    return ((inputValue - 32) * 5) / 9 + 273.15;
  } else if (fromUnit === "K" && toUnit === "C") {
    return inputValue - 273.15;
  } else if (fromUnit === "K" && toUnit === "F") {
    return ((inputValue - 273.15) * 9) / 5 + 32;
  } else {
    throw new Error("Conversión no válida");
  }
};

const generalConverter = (category, fromUnit, toUnit, inputValue) => {
  const table = unitTable[category];
  const result = (inputValue * table[fromUnit]) / table[toUnit];
  return result;
};

export { handleConverter };
