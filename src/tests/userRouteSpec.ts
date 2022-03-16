import request from 'request';
import {User} from '../models/users';

let token: string;

const user: User = {
    username: 'test1',
    firstname: 'test2',
    lastname: 'test3',
    password: 'password'
}

describe("User endpoint tests", () => {
  beforeAll(async (done) => {
    try{
      const  postConfig = {
        url:'http://localhost:3000/users',
        body: user,
        json: true
      };

      request.post(postConfig, (err, httpResponse, body)=>{
          token = 'Bearer ' + body.token.replace(/['"]+/g, '');
          done();
      });
    }catch (err) {
      throw new Error(`Unable to test endpoint --------${err}`);
    }
  });

  it("User Authentication test", async () => {
    try{const body = {
        username: 'test1',
        password: 'password'
    };
    const  postConfig = {
        url:'http://localhost:3000/users/authenticate',
        body: user,
        json: true
    };

    request.post(postConfig, (err, httpResponse, body)=>{
        expect(httpResponse.statusCode).toBe(200);
    });
  }catch (err) {
    throw new Error(`Unable to run authenticate test --------${err}`);
  }

  });

  it("should create new user", async () => {

    try{
      const  postConfig = {
        url:'http://localhost:3000/users',
        body: user,
        json: true
      };

      request.post(postConfig, (err, httpResponse, body)=>{
        expect(httpResponse.statusCode).toBe(200);
      });
    }catch (err) {
      throw new Error(`Unable to test = create new user. --------${err}`);
    }
  });

  it("should get list of users", async () => {
    try{const getConfig = {
        url:'http://localhost:3000/users',
        headers : {
            "Authorization" : token
        }
    }
    request.get(
        getConfig,
        (error, response, body) => {
            expect(response.statusCode).toBe(200);
        }
      );
    }catch (err) {
      throw new Error(`Unable to run test --------${err}`);
    }
  });

  it("should get user info", async () => {
    try{const getConfig = {
        url:'http://localhost:3000/users/1',
        headers : {
            "Authorization" : token
        }
    }
    request.get(
        getConfig,
        (error, response, body) => {
            expect(response.statusCode).toBe(200);
        }
      );
    }catch (err) {
      throw new Error(`Unable to run test --------${err}`);
    }
  });


  it("should delete user", async () => {
    try{const getConfig = {
        url:'http://localhost:3000/users/1',
        headers : {
            "Authorization" : token
        }
    }
    request.delete(
        getConfig,
        (error, response, body) => {
            expect(response.statusCode).toBe(200);
        }
      );
    }catch (err) {
      throw new Error(`Unable to run test --------${err}`);
    }
  });
});