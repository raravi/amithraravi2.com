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

    cy.server(); // enable response stubbing

    cy.route({
      method: "POST",           // Route all POST requests
      url: "/add-comment.php",  // that have a URL that matches '/articles/*', and
      status: 200,              // send status (of response) of 200
      response: "OK",           // and force the response to be: "OK"
      delay: 2000,              // response returns after 2 seconds
    });

    cy.get("#comment-form-submit").click();

    cy.server({ enable: false }); // disable response stubbing

    cy.get(".js-notice").should("have.class", "notice--success");
  });
});
