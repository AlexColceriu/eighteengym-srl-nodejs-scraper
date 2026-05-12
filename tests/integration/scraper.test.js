/**
 * Integration tests for the scraper workflow
 */

describe("Scraper integration", () => {
  it("should have all required modules", async () => {
    const index = await import("../../index.js");
    expect(index.fetchCareersPage).toBeDefined();
    expect(index.mapToJobModel).toBeDefined();
  });

  it("should fetch careers page successfully", async () => {
    const index = await import("../../index.js");
    const result = await index.fetchCareersPage();
    expect(result.jobTypes).toContain("Club manager");
    expect(result.jobTypes).toContain("Front desk - Recepție");
    expect(result.locations).toContain("Cluj Napoca");
    expect(result.locations).toContain("București");
  });
});
