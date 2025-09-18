describe("Login Success", () => {
  it("should allow a user to login", () => {
    cy.visit("/");

    cy.get('[data-cy="form-email"]').type("emre@wit.com.tr");
    cy.get('[data-cy="form-password"]').type("12345678A");
    cy.get('[data-cy="form-terms"]').check();

    cy.get('[data-cy="form-submit"]').click();

    cy.url().should("include", "/success");
    cy.contains("Form başarıyla gönderildi").should("be.visible");
  });
});