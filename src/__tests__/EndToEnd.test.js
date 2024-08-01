import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  test("An event element is collapsed by default", async () => {
    // Open Chromium window
    const browser = await puppeteer.launch();

    // Open new tab
    const page = await browser.newPage();
    // Navigate to local app deployment
    await page.goto("http://localhost:3000/");

    // Ensure event list is loaded (event selector) before moving on
    await page.waitForSelector("#event");

    // Check if event details isn't null (not shown to user)
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeNull();
    // Close Chromium window
    browser.close();
  });
});
