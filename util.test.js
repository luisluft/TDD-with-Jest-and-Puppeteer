const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

// unit test #1
test("should output name and age", () => {
  const text = generateText("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// unit test #2
test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

// integration test #1
test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// end2end test #1
test("should save the text to the screen", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMon: 80,
    args: ["--windows-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5500/index.html");
  await page.click("input#name");
  await page.type("input#name", "Luis");
  await page.click("input#age");
  await page.type("input#age", "26");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Luis (26 years old)");
});
