import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    // Open Chromium window
    browser = await puppeteer
      .launch
      // Uncomment to see tests conducted within the browser
      (/*{
        headless: false,
        slowMo: 250, // Slow down by 250ms per action
        timeout: 0, // Removes any puppeteer/browser timeout limitations
        }*/);
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

  test("User can collapse an event to hide details", async () => {
    await page.click("#event #show-details");
    const eventDetails = await page.$("#event .details");
    expect(eventDetails).toBeNull();
  });
});

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    // Open Chromium window
    browser = await puppeteer
      .launch
      // Uncomment to see tests conducted within the browser
      (/*{
        headless: false,
        slowMo: 250, // Slow down by 250ms per action
        timeout: 0, // Removes any puppeteer/browser timeout limitations
        }*/);
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

  test("City search input is empty by default", async () => {
    const citySearchInput = await page.$(".city");
    const placeholderText = await page.evaluate(
      (input) => input.placeholder,
      citySearchInput
    );
    expect(placeholderText).toBe("Search for a city");
  });

  test("User should see list of events from all cities", async () => {
    // Extract city names from the event-location class in the events
    const eventListItems = await page.$$eval("#event-list li", (items) =>
      items.map((item) =>
        item.querySelector(".event-location").textContent.trim()
      )
    );
    // Get unique city names
    // Convert array of cities into a set to remove duplicates, then back into an array of unique cities
    const uniqueCities = [...new Set(eventListItems)];

    // Ensure there are multiple unique cities
    expect(uniqueCities.length).toBeGreaterThan(1);
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    
  })
});
