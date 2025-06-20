const d = document;
const $unitCategory = d.querySelector(".category-selector select");
const $unitSelectorFrom = d.querySelector(".unit-selector-from select");
const $unitSelectorTo = d.querySelector(".unit-selector-to select");
const $inputValue = d.querySelector(".value-input input");
const $outputValue = d.querySelector(".value-output p");

export const domRef = {
  $unitCategory,
  $unitSelectorFrom,
  $unitSelectorTo,
  $inputValue,
  $outputValue,
};
