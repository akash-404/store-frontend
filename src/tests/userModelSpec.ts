import { User, UserStore } from '../models/users';

const store = new UserStore();
const user: User = {
  username: 'test1',
  firstname: 'test2',
  lastname: 'test3',
  password: 'password'
  }

let userId:number;
describe("User MODEL TESTS", () => {
  beforeAll(async (done) => {
    try{const userObj = await store.create(user);
    userId = userObj.id!;
    done();
    }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
      }
  });

  it("should create new user", async () => {
      try{
    const userObj = await store.create(user);
    expect(userObj.id).toBeTruthy();
      }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
      }
  });

  it("should return all users", async () => {
    try{const users = await store.index();
    expect(users?.length).toBeGreaterThan(0);
}catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });

  it("should return user of given ID", async () => {
      try{
    const userObj = await store.show(userId);
    expect(userObj.id).toEqual(userId);
    expect(userObj.firstname).toEqual(user.firstname);
    expect(userObj.lastname).toEqual(user.lastname);
    expect(userObj.username).toEqual(user.username);
      }catch (err) {
        throw new Error(`Unable to run test --------${err}`);
      }
  });

  it("should delete user", async () => {
      try{
    await store.delete1(userId.toString());
    const userObj = await store.show(userId);
    expect(userObj).toBeFalsy();
}catch (err) {
    throw new Error(`Unable to run test --------${err}`);
  }
  });
});