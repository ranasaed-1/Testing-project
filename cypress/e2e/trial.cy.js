describe('search product',()=>{
    it('search product',()=>{
        cy.visit('http:/automationExercice.com');
        cy.get([href="/products"]).click();
        cy.get('search products').should('be.visible');
    })
})