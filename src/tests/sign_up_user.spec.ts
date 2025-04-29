import * as supertest from 'supertest';

const request = supertest('http://localhost:8001/api/v1');

describe('USER SIGN UP', () => {
    describe('POSITIVE TESTING', () => {
        it.skip('should sign up a new user', async () => {
            const userData = {
                name: "John Doe",
                email: "john9@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData)
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body.message)
            expect(res.status).toBe(201)
            expect(res.body.status).toBe('success')
        })
    })

    describe('NEGATIVE TESTING', () => {

        it.skip('should get an error when user is not in the body', async () => {
            const userData = {
                email: "john10@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData)
            const res = await request.post('/users/signup').send(userData)
            console.log(res.body.message)
            console.log(res.body)
            expect(res.status).toBe(400)
            expect(res.body.message).toBe("Missing required fields: name")
    })

    it('should get an error when email is not in the body', async () => {
        const userData = {
            name: "John Doe",
            password: "mypassword123",
            passwordConfirm: "mypassword123"
        }
        console.log(userData)
        const res = await request.post("/users/signup").send(userData)
        console.log(res.body.message)
        console.log(res.body)
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("Missing required fields: email")
})

it('should get an error when password is not in the body', async () => {
    const userData = {
                name: "John Doe",
                email: "john11@example.com",
                passwordConfirm: "mypassword123"
    }
    console.log(userData)
    const res = await request.post("/users/signup").send(userData)
    console.log(res.body.message)
    console.log(res.body)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Missing required fields: password")
})

it('should get an error when passwordConfirm is not in the body', async () => {
    const userData = {
                name: "John Doe",
                email: "john12@example.com",
                password: "mypassword123"
    }
    console.log(userData)
    const res = await request.post("/users/signup").send(userData)
    console.log(res.body.message)
    console.log(res.body)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Missing required fields: passwordConfirm")
})

it('should get an error when password is different from passwordConfirm ', async () => {
    const userData = {
        name: "John Doe",
        email: "john13@example.com",
        password: "mypassword123",
        passwordConfirm: "mypassword1234"
    }
    console.log(userData)
    const res = await request.post("/users/signup").send(userData)
    console.log(res.body.message)
    console.log(res.body)
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!")
})
  })
})
