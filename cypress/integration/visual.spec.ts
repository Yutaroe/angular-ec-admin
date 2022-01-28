const rootUrl = 'http://localhost:4200/';
const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 900;

describe('Visual test Login-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial project page', () => {
    cy.visit(rootUrl + '/login');
    cy.url().should((url) => expect(url).equal(rootUrl + 'login'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test list-page', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial project page', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test itemDetail', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial detail page', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('.table-row').first().click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'detail/1'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test addItem', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial addItem page', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('#product').click();
    cy.get('[routerLink="/add"]').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'add'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test topping', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial topping page', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('#toppings').click();
    cy.get('[routerLink="/toppinglist"]').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'toppinglist'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test addtopping', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial addtopping page', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('#toppings').click();
    cy.get('[routerLink="/addtopping"]').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'addtopping'));
    cy.matchImageSnapshot();
  });
});

describe('Visual test buyuser', () => {
  beforeEach(() => {
    cy.viewport(VIEW_WIDTH, VIEW_HEIGHT);
  });
  it('Visits the initial buyuser', () => {
    cy.visit(rootUrl + 'list');
    cy.get('[type="email"]').type('sypress@test.com');
    cy.get('[formControlName="password"]').type('password111');
    cy.get('button').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'list'));

    cy.get('[routerLink="/buyuser"]').click();
    cy.url().should((url) => expect(url).equal(rootUrl + 'buyuser'));
    cy.matchImageSnapshot();
  });
});
