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
        expect(newUser.body).toHaveProperty('message', 'Welcome testing1!');
        expect(newUser.body).toHaveProperty('newUser', 'planner', 'email', );
        expect(newUser.body).toHaveProperty('newUser', 'planner', 'id', 1);  
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
describe('Get profile of logged in user', () => {
    it('GET /api/planner/:id', async() => {
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
        
        const profile = await request(server)
            .get('/api/planner/1')
            .set('Authorization', loggedIn.body.token)
            
            
        //tests
        expect(profile.status).toBe(200);
        expect(profile.body).toBeDefined();
        expect(profile.body).toHaveProperty('planner', 'id', 1);
        expect(profile.body).toHaveProperty('planner', 'username', 'testing1');
        expect(profile.body).not.toHaveProperty('planner', 'password');
        expect(profile.body).toHaveProperty('planner', 'home_location', 'tester');
        expect(profile.body).toHaveProperty('planner', 'email', 'testing@t.com');
        expect(profile.body.weddings).toHaveLength(0);
        expect(profile.body.weddings[0]).not.toBeDefined();
        expect(profile.body).not.toHaveProperty('message');
    })
    // tests that id middleware is working
    it('GET /api/planner/:id', async() => {
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
        
        const profile = await request(server)
            .get('/api/planner/2')
            .set('Authorization', loggedIn.body.token)
            
            
        //tests
        expect(profile.status).toBe(400);
        expect(profile.body).toBeDefined();
        expect(profile.body).toHaveProperty('message', 'planner does not exist');
        expect(profile.body).not.toHaveProperty('token');

    })
})

// tests editing profile information
describe('Edit planner\'s profile information', () => {
    it('PUT /api/planner/:id', async() => {
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
        
        const editing = await request(server)
            .put('/api/planner/1')
            .send({
                username: 'testing2',
                password: 'testing1',
                home_location: 'jester',
                email: 'testing2@t.com'
            })
            .set('Authorization', loggedIn.body.token)
            
        //tests
        expect(editing.status).toBe(200);
        expect(editing.body).toBeDefined();
        expect(editing.body).toHaveProperty('message', 'Profile successfully updated!');
        expect(editing.body).not.toHaveProperty('token');
    })
    // tests profile editing validation middleware, but only with home_location
    it('PUT /api/planner/:id', async() => {
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
        
        const editing = await request(server)
            .put('/api/planner/1')
            .send({
                username: 'testing2',
                password: 'testing1',
                home_location: '',
                email: 'testing2@t.com'
            })
            .set('Authorization', loggedIn.body.token)
            
        //tests
        expect(editing.status).toBe(400);
        expect(editing.body).toBeDefined();
        expect(editing.body).toHaveProperty('message', 'your location must be at least 2 characters');
        expect(editing.body).not.toHaveProperty('token');
    })

})

// tests creating a new wedding
describe('Create a new wedding on this profile', () => {
    it('POST /api/planner/weddings', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(newWedding.status).toBe(201);
        expect(newWedding.body).toBeDefined();
        expect(newWedding.body).toHaveProperty('description', 'Hopefully this test will work well!');
        expect(newWedding.body).toHaveProperty('planner_id', 1);
        expect(newWedding.body).toHaveProperty('id', 1);
        expect(newWedding.body).toHaveProperty('theme', 'tests');
        expect(newWedding.body).toHaveProperty('wedding_location', 'somewhere');
        expect(newWedding.body).not.toHaveProperty('token');

    })
    // tests validation middlware but only with theme
    it('POST /api/planner/weddings', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: '',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(newWedding.status).toBe(400);
        expect(newWedding.body).toBeDefined();
        expect(newWedding.body).toHaveProperty('message', 'theme must be at least 3 characters');
        expect(newWedding.body).not.toHaveProperty('weddings');
        expect(newWedding.body).not.toHaveProperty('token');

    })
})

// tests getting weddings by planner id
describe('Get weddings from a planner\'s id', () => {
    it('POST /api/planner/weddings', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)
        
        const anotherOne = await request(server)
            .post('/api/planner/weddings')
                .send({
                    planner_id: 1,
                    wedding_name: 'test wedding2',
                    wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                    theme: 'tests',
                    wedding_location: 'somewhere',
                    description: 'Hopefully this test will work well!'
                })
                .set('Authorization', loggedIn.body.token)
        
        const allWed = await request(server)
            .get('/api/planner/1/weddings')
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(allWed.status).toBe(200);
        expect(allWed.body).toBeDefined();
        expect(allWed.body).toHaveLength(2);
        expect(allWed.body[0]).toHaveProperty('id', 1);
        expect(allWed.body[0]).toHaveProperty('theme', 'tests');
        expect(allWed.body[0]).toHaveProperty('wedding_location', 'somewhere');
        expect(allWed.body[0]).not.toMatchObject(allWed.body[1]);
        expect(allWed.body[2]).not.toBeDefined();

    })    
})

// tests getting single wedding by its id
describe('Get single wedding by wedding id', () => {
    it('POST /api/weddings/:id', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)
        
        const anotherOne = await request(server)
            .post('/api/planner/weddings')
                .send({
                    planner_id: 1,
                    wedding_name: 'test wedding2',
                    wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                    theme: 'tests',
                    wedding_location: 'somewhere',
                    description: 'Hopefully this test will work well!'
                })
                .set('Authorization', loggedIn.body.token)
        
        const oneWed = await request(server)
            .get('/api/planner/weddings/2')
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(oneWed.status).toBe(200);
        expect(oneWed.body).toBeDefined();
        expect(oneWed.body[0].planner_id).toBe(1);
        expect(oneWed.body[0].id).toBe(2);
        expect(oneWed.body[0].wedding_name).toBe('test wedding2');

    })    
})

// tests editing single wedding by its id but only with its name
describe('Edit a single wedding by wedding id', () => {
    it('PUT /api/weddings/:id', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)
        
        const edited = await request(server)
            .put('/api/planner/weddings/1')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding editing',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(edited.status).toBe(200);
        expect(edited.body).toBeDefined();
        expect(edited.body).toHaveProperty('message', 'Wedding has been successfully updated');
        

    })    
})

// tests deleting a single wedding by its id
describe('Deletes single wedding by wedding id', () => {
    it('DELETE /api/weddings/:id', async() => {

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
        
        const newWedding = await request(server)
            .post('/api/planner/weddings')
            .send({
                planner_id: 1,
                wedding_name: 'test wedding',
                wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                theme: 'tests',
                wedding_location: 'somewhere',
                description: 'Hopefully this test will work well!'
            })
            .set('Authorization', loggedIn.body.token)
        
        const anotherOne = await request(server)
            .post('/api/planner/weddings')
                .send({
                    planner_id: 1,
                    wedding_name: 'test wedding2',
                    wedding_photo: 'as;dofijoea;sijdfoejao;ijdf',
                    theme: 'tests',
                    wedding_location: 'somewhere',
                    description: 'Hopefully this test will work well!'
                })
                .set('Authorization', loggedIn.body.token)
        
        const deleted = await request(server)
            .delete('/api/planner/weddings/1')
            .set('Authorization', loggedIn.body.token)

        //tests
        expect(deleted.status).toBe(200);
        expect(deleted.body).toBeDefined();
        expect(deleted.body).toHaveProperty('message', 'Wedding has successfully been deleted')
        

    })    
})