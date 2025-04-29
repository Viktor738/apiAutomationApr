import * as supertest from 'supertest';
import { faker } from '@faker-js/faker';
const request = supertest('http://localhost:8001/api/v1');
import { Response } from 'superagent';
interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}


describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING with async/await', () => {
        it('should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
            }
            console.log(userData)
            try {
                //make the POST request 
                const res: Response = await request.post('/users/signup').send(userData).expect(201)
                //log the response message
                console.log(res.body)
                //validate the response body
                expect(res.body.status).toBe("success");
                expect(res.body.data.user.name).toBe(userData.name);
                expect(typeof res.body.data.user.name).toBe("string");
                expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                expect(typeof res.body.data.user.email).toBe("string");
                expect(res.body.token).toBeDefined();
                expect(typeof res.body.token).toBe("string");

                // Additional checks for user object
                expect(res.body.data.user).toHaveProperty("_id");
                expect(res.body.data.user).not.toHaveProperty("password");
            } catch (error) {
                console.error("Error during signup:", error);
                throw error; // Rethrow the error to fail the test

            }
        })
    })

    describe('POSITIVE TESTING with .then', () => {
        it('should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
            }
            console.log(userData)
            //make the POST request using .then
            return request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .then((res:Response) => {
                    expect(res.body.status).toBe("success");
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe("string");
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe("string");
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe("string");

                    // Additional checks for user object
                    expect(res.body.data.user).toHaveProperty("_id");
                    expect(res.body.data.user).not.toHaveProperty("password");
                })
                .catch((error) => {
                    console.error("Error during signup:", error);
                    throw error; // Rethrow the error to fail the test
                })
        })
    })

    describe('POSITIVE TESTING with .end() and done()', () => {
        it('should sign up a new user', (done) => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
            }
            console.log(userData)
            //make the POST request using .then
            request
                .post('/users/signup')
                .send(userData)
                .expect(201)
                .end((err:Error | null, res:Response) => {
                    if (err) {
                        console.error("Error during sign up:", err);
                        return done(err); // Rethrow the error to fail the test
                    }
                    try {
                        expect(res.body.status).toBe("success");
                        expect(res.body.data.user.name).toBe(userData.name);
                        expect(typeof res.body.data.user.name).toBe("string");
                        expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                        expect(typeof res.body.data.user.email).toBe("string");
                        expect(res.body.token).toBeDefined();
                        expect(typeof res.body.token).toBe("string");

                        // Additional checks for user object
                        expect(res.body.data.user).toHaveProperty("_id");
                        expect(res.body.data.user).not.toHaveProperty("password");
                        done()
                    } catch (err) {
                        console.error("Error during sign up:", err);
                        done(err);
                    }
                })
                // .catch((error) => {
                //     console.error("Error during sign up:", error);
                //     throw error; // Rethrow the error to fail the test
                // })
        })
    })


    describe('NEGATIVE TESTING', () => {

        it('should sign up a new user', async () => {

        })
    })
})
