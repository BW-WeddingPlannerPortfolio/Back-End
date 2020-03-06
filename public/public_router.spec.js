const server = require('../api/server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');
const testPrep = require('../api/testPrep.js');

beforeEach(testPrep);
// const signup = await request(server)
//             .post('/api/auth/register')
//             .send({
//                 username: '',
//                 password: '',
//                 home_location: '',
//                 email: ''
//             })


// test for /api/weddings 
// describe('Get all weddings', () => {
//     it('GET all weddings from multiple users')
// })

// test for /api/weddings/id

// test for /api/planners
describe('Get all planners', () => {
    it('GET /api/planners', async() => {
        
        //setup
        const user1 = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing1',
                password: 'testing1',
                home_location: 'tester',
                email: 'testing1@t.com'
            })
        const user2 = await request(server)
            .post('/api/auth/register')
            .send({
                username: 'testing2',
                password: 'testing2',
                home_location: 'tester',
                email: 'testing2@t.com'
            })
        const planners = await request(server)
            .get('/api/planners')  
            
        //tests    
        expect(planners.status).toBe(200);
        expect(planners.body).toHaveLength(2);
        expect(planners.body[1].id).toBeDefined();
        expect(planners.body[1].id).toBe(2);
        expect(planners.body[0].id).toBe(1)
        expect(planners.body[0].username).toBe('testing1');
        expect(planners.body[1].profile_pic).toBeNull();
        expect(planners.body[1].home_location).toBe('tester')
        expect(planners.body[1].email).toBe('testing2@t.com')
        expect(planners.body[0]).not.toMatchObject(planners.body[1]);
        expect(planners.body[2]).not.toBeDefined();
    })
})

// test for /api/planners/id
describe('get planner by id', () => {
    it('GET /api/planners/:id', async() => {
        
        //setup
        const user1 = await request(server)
        .post('/api/auth/register')
        .send({
            username: 'testing1',
            password: 'testing1',
            home_location: 'tester',
            email: 'testing1@t.com'
        })

        const planner = await request(server)
            .get('/api/planners/1')

        //tests
        expect(planner.status).toBe(200);
        expect(planner.body).toBeDefined();
        expect(planner.body).toHaveProperty('planner', 'username', 'testing1');
        expect(planner.body).toHaveProperty('planner', 'home_location', 'tester');
        expect(planner.body).toHaveProperty('planner', 'email', 'testing@t.com');
        expect(planner.body).not.toHaveProperty('planners');
        expect(planner.body.weddings).toHaveLength(0);
        expect(planner.body).toHaveProperty('weddings')
    })
    // tests that an id that doesn't exist will return an error
    it('GET /api/planners/:id', async() => {
        
        //setup
        const user1 = await request(server)
        .post('/api/auth/register')
        .send({
            username: 'testing1',
            password: 'testing1',
            home_location: 'tester',
            email: 'testing1@t.com'
        })

        const planner = await request(server)
            .get('/api/planners/2')

        //tests that id validation middleware is working
        expect(planner.status).toBe(400);
        expect(planner.body).toBeDefined();
        expect(planner.body).toHaveProperty('message', 'planner does not exist');
    })
    //tests that an id will return the wedding and planner as a single object
    // it('GET /api/planners/:id', async() => {
        
    //     //setup
    //     const user1 = await request(server)
    //         .post('/api/auth/register')
    //         .send({
    //             username: 'testing1',
    //             password: 'testing1',
    //             home_location: 'tester',
    //             email: 'testing1@t.com'
    //         })
        
    //     const wedding = await request(server)
    //         .post('/api/planner/weddings')
    //         .send({
    //             planner_id: 1,
    //             wedding_name: 'testing wedding',
    //             theme: 'testing',
    //             wedding_location: 'MN',
    //             description: 'hopefully this is a good thing to test, seems like a bit of overkill'
    //         })
    //         .set('authorization', user1.body.token)

    //     const planner = await request(server)
    //         .get('/api/planners/1')
            

    //     //tests that id validation middleware is working
    //     expect(planner.status).toBe(200);
    //     expect(wedding.token).toBeDefined();
    // })
})

