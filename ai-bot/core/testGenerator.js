function toPlaywright(test) {
  return `
test("${test.scenario}", async ({ page }) => {
  ${test.steps.map((s) => `// ${s}`).join("\n")}
  // Expect: ${test.expected}
});
`;
}