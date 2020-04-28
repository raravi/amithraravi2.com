describe("Visit All Pages", function() {
  it("Visits the main pages on local site - AmithRaravi.com", function() {
    cy.visit("/");

    cy.contains("Articles").click();
    cy.url().should("include", "/articles/");

    cy.contains("Bash: Automating Comments Submission for a Static Site").click();
    cy.url().should("include", "/articles/tech/bash-automating-comments-submission/");

    cy.contains("Portfolio").click();
    cy.url().should("include", "/portfolio/");

    cy.contains("Web Design / Digital Marketing").click();
    cy.url().should("include", "/portfolio/web-design/");

    cy.contains("raravi").click();
    cy.url().should("include", "/");

    cy.get("footer").contains("About Me").click();
    cy.url().should("include", "/about/");

    cy.get("footer").contains("Terms").click();
    cy.url().should("include", "/terms/");

    cy.visit("/term/", { failOnStatusCode: false });
    cy.contains("404 or SOS ?!");
  });
});
