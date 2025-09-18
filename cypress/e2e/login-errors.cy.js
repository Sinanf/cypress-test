describe("Login Errors", () => {
  it("email yanlış: 1 hata mesajı ve buton disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("yanlisEmail");
    cy.get('[data-cy="form-password"]').type("12345678A");
    cy.get('[data-cy="form-submit"]').should("be.disabled");
    cy.get('[data-cy="error-email"]').should("be.visible");
    cy.get('[data-cy="error-password"]').should("not.exist");
  });

  it("email ve password yanlış: 2 hata mesajı", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("yanlisEmail");
    cy.get('[data-cy="form-password"]').type("kisa");
    cy.get('[data-cy="form-submit"]').should("be.disabled");
    cy.get('[data-cy="error-email"]').should("be.visible");
    cy.get('[data-cy="error-password"]').should("be.visible");
  });

  it("email ve password doğru ama terms işaretli değil: buton disabled", () => {
    cy.visit("/");
    cy.get('[data-cy="form-email"]').type("emre@wit.com.tr");
    cy.get('[data-cy="form-password"]').type("12345678A");
    cy.get('[data-cy="form-submit"]').should("be.disabled");
  });
});
