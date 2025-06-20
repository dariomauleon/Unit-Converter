import { units, unitTable } from "../utilities/index.js";
import { createLabelOutput, cleanInputs } from "./ui.js";

const validations = (category, fromUnit, toUnit, valueInput) => {
  if (category === "" || !Object.keys(units).includes(category)) {
    alert("La categoría debe existir en la gama de opciones");
    return false;
  }
  if (fromUnit === "" || !units[category].includes(fromUnit)) {
    alert("Unidad fuera de la gama");
    return false;
  }
  if (toUnit === "" || !units[category].includes(toUnit)) {
    alert("Unidad fuera de la gama");
    return false;
  }
  if (valueInput === "" || isNaN(valueInput)) {
    alert("El valor debe ser un número");
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

  if (!validations(category, fromUnit, toUnit, inputValue)) return;

  let result;

  if (category === "temperature") {
    result = temperatureConverter(inputValue, fromUnit, toUnit);
  } else {
    result = generalConverter(category, fromUnit, toUnit, inputValue);
  }
  createLabelOutput(result, category, toUnit);
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
