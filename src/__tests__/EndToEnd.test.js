import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    // Open Chromium window
    browser = await puppeteer.launch();
    // Open new tab
    page = await browser.newPage();
    // Navigate to local app deployment
    await page.goto("http://localhost:3000/");
    // Ensure event list is loaded (event selector) before moving on
    await page.waitForSelector("#event");
  });

  afterAll(() => {
    // Close Chromium window
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    // Check if event details is null (not shown to user)
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    // Click on show details button
    await page.click("#event #show-details");

    // Check if event details is defined (shown to user)
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click("#event #show-details");
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeNull();
  });
});
