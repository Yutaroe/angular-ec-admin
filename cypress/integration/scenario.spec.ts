const rootUrl = 'http://localhost:4200/';
const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;

describe(' test addtopping', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it(' add new topping', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('#toppings').click();
    cy.get('[routerLink="/addtopping"]').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'addtopping'));
    
    cy.get('input').type('チョコレート')
    cy.get('.topping-button').click()
    cy.url().should(url => expect(url).equal(rootUrl + 'toppinglist'))

    // cy.get('#deletebutton').last().click()
    // cy.on('window:confirm', () => true);
  });
});