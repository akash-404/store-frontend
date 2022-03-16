
import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe ('Test server endpoint', () => {
    it('expect GET to be status 200', async () =>{
        try{
            const response = await request.get('/')
            expect(response.status).toBe(200)
        }catch (err) {
            throw new Error(`Unable to test server endpoint --------${err}`);
        }
    })
})