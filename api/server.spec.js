const request = require('supertest');
const server = require('./server.js');

describe('server', function() {
    //tests that the test is running
    it('runs tests', function() {
        expect(true).toBe(true);
    })

    describe('GET /', function() {
        it('should return text/html', function() {
            return request(server).get('/').then(res => {
                expect(res.type).toMatch('text/html')
            })
        })
    })
})