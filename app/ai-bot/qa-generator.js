export function generateStructuredTestCases(criteriaText) {
  const lines = criteriaText.split("\n");

  let scenario = "";
  let given = "";
  let when = "";
  let then = "";

  const ui = [];
  const data = [];
  const logic = [];
  const edge = [];

  lines.forEach((line) => {
    const text = line.trim();

    if (/scenario/i.test(text)) {
      scenario = text.replace(/scenario:/i, "").trim();
    } else if (/given/i.test(text)) {
      given = text;
    } else if (/when/i.test(text)) {
      when = text;
    } else if (/then/i.test(text)) {
      then = text;

      ui.push({
        scenario,
        test: `Verify UI elements for "${scenario}"`,
        steps: [given, when],
        expected: then,
      });

      data.push({
        scenario,
        test: `Validate input variations`,
        steps: [
          "Valid input",
          "Invalid input",
          "Boundary values",
        ],
        expected: "System handles all data correctly",
      });

      logic.push({
        scenario,
        test: `Validate business logic`,
        steps: [given, when],
        expected: then,
      });

      edge.push({
        scenario,
        test: `Validate edge cases`,
        steps: [
          "Empty input",
          "Max length",
          "Special chars",
          "Null values",
        ],
        expected: "Handled gracefully",
      });
    }
  });

  return {
    "ui.spec": ui,
    "data.spec": data,
    "logic.spec": logic,
    "edgeCases.spec": edge,
  };
}

module.exports = { generateStructuredTestCases };