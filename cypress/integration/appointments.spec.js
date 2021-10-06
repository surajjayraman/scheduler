describe("Appointment", () => {

    beforeEach(() => {
      cy.request('GET','/api/debug/reset')
      cy.visit('/')
      cy.contains('Monday');
    });
    
    it('should book an interview', () => {
      cy.get('[alt=Add]')
        .first()
        .click();
      
      cy.get('[data-testid=student-name-input]')
        .type('Lydia Miller-Jones');  
    });
}); 