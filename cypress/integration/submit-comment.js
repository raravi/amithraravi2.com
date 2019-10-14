describe("Comment Submission", function() {
  it("Visit one of the post - post comment", function() {
    cy.visit("/");

    cy.contains("Articles").click();
    cy.url().should("include", "/articles/");

    cy.contains(
      "Bash: Automating Comments Submission for a Static Site"
    ).click();
    cy.url().should(
      "include",
      "/articles/tech/bash-automating-comments-submission/"
    );

    cy.get("#comment-form-message").type("Testing...");

    cy.get("#comment-form-name").type("Amith Raravi");

    cy.get("#comment-form-email").type("first.last@email.com");

    cy.get("#comment-form-submit").click();

    cy.get(".js-notice").should("have.class", "notice--success");
  });
});
