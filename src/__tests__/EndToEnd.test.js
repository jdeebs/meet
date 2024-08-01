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

    // Check if event details is null (not shown to user)
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeNull();
    // Close Chromium window
    browser.close();
  });

  test("User can expand an event to see its details", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    await page.waitForSelector("#event");
    // Click on show details button
    await page.click("#event #show-details");

    // Check if event details is defined (shown to user)
    const eventDetails = await page.$("#event #show-details");
    expect(eventDetails).toBeDefined();
    browser.close();
  });
});
