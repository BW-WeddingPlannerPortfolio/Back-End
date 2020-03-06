const server = require('../api/server.js');
const request = require('supertest');
const testPrep = require('../api/testPrep.js');

beforeEach(testPrep);

// tests registration
describe('Registers new wedding planner', () => {
    it('POST /api/auth/register', async () => {

        //setup
        const newUser = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing1',
                password: 'testing1',
                home_location: 'tester',
                email: 'testing1@t.com'
            })
        //testing
        expect(newUser.status).toBe(201);
        expect(newUser.body).toBeDefined();
        expect(newUser.body).not.toHaveProperty('planner', 'password');  
        expect(newUser.body).toHaveProperty('token');
        expect(newUser.body).toHaveProperty('message', 'Welcome testing1!')
        expect(newUser.body).toHaveProperty('newUser', 'planner', 'email', );
        expect(newUser.body).toHaveProperty('newUser', 'planner', 'id', 1)  
    })
    // tests that register middleware is working, but only for username
    it('POST /api/auth/register', async () => {

        //setup
        const newUser = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'test',
                password: 'testing1',
                home_location: 'tester',
                email: 'testing1@t.com'
            })
        //testing
        expect(newUser.status).toBe(400);
        expect(newUser.body).toBeDefined();
        expect(newUser.body).toHaveProperty('message', 'username must be at least 5 characters')
        expect(newUser.body).not.toHaveProperty('token')
    })
})
// tests login
describe('Logs in a wedding planner', () => {
    it('POST /ap/auth/login', async() => {

        //setup
        const newUser = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing1',
                password: 'testing1',
                home_location: 'tester',
                email: 'testing1@t.com'
            })    

        const loggedIn = await request(server)
            .post('/api/auth/login')
            .send({
                username: 'testing1',
                password: 'testing1'
            })
            
        //tests
        expect(loggedIn.status).toBe(201);
        expect(loggedIn.body).toBeDefined();
        expect(loggedIn.body).toHaveProperty('message', 'Welcome Back testing1!');
        expect(loggedIn.body).toHaveProperty('token');

    })
    // tests login middleware but only on username
    it('POST /ap/auth/login', async() => {

        //setup
        const newUser = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing1',
                password: 'testing1',
                home_location: 'tester',
                email: 'testing1@t.com'
            })    

        const loggedIn = await request(server)
            .post('/api/auth/login')
            .send({
                username: '',
                password: 'testing1'
            })
            
        //tests
        expect(loggedIn.status).toBe(400);
        expect(loggedIn.body).toBeDefined();
        expect(loggedIn.body).toHaveProperty('message', 'username is a required field');
        expect(loggedIn.body).not.toHaveProperty('token');

    })

})

// tests get logged in planner by id

// tests editing profile information

// tests creating a new wedding

// tests getting weddings by planner id

// tests getting single wedding by its id

// tests editing single wedding by its id

// tests deleting a single wedding by its id
