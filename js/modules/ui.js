const d = document;

const cleanInputs = ({
  $unitCategory,
  $unitSelectorFrom,
  $unitSelectorTo,
  $inputValue,
}) => {
  ($unitCategory.value = ""),
    ($unitSelectorFrom.value = ""),
    ($unitSelectorTo.value = ""),
    ($inputValue.value = "");
};

const optionCreator = (options) => {
  const $fragment = d.createDocumentFragment();
  options.forEach((option) => {
    const $option = d.createElement("option");
    $option.textContent = `${option}`;
    $fragment.appendChild($option);
  });
  return $fragment;
};

const createLabelOutput = (result, unit, $outputValue) => {
  const isFloat = !Number.isInteger(result);
  const formattedResult = isFloat ? result.toFixed(2) : result;
  $outputValue.textContent = `Converted Unit: ${formattedResult} ${unit}`;
};

const loadCategories = (categories, { $unitCategory }) => {
  $unitCategory.innerHTML = `<option value="" selected></option>`;
  const options = optionCreator(Object.keys(categories));
  $unitCategory.appendChild(options);
};

const loadUnits = (unitsSelected, $unitSelectorFrom, $unitSelectorTo) => {
  $unitSelectorFrom.innerHTML = "";
  $unitSelectorTo.innerHTML = "";
  $unitSelectorFrom.appendChild(optionCreator(unitsSelected));
  $unitSelectorTo.appendChild(optionCreator(unitsSelected.reverse()));
};

const selectedCategory = (
  category,
  units,
  { $unitCategory, $unitSelectorFrom, $unitSelectorTo }
) => {
  if ($unitCategory.value === "") return;
  const keys = Object.keys(units);
  const selected = keys.find((el) => el === category);
  loadUnits(units[selected], $unitSelectorFrom, $unitSelectorTo);
};

export {
  selectedCategory,
  loadUnits,
  loadCategories,
  createLabelOutput,
  cleanInputs,
};
