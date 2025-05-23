// const userData:UserData = {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     password: "test1234",
//     passwordConfirm: "test1234"
// }

import { faker } from "@faker-js/faker";
import { User } from "./interface";
import * as supertest from "supertest"
const request = supertest('http://localhost:8001/api/v1');

export function getUser(role: string): User {
    const randomUser = createRandomUser()
    const password = "test1234"
    return {
        name: randomUser.username,
        email: randomUser.email.toLowerCase(),
        password: password,
        passwordConfirm: password,
        role: role
    }
}

export function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.username(), // before version 9.1.0, use userName()
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}

//Signup user (Promise with async/await)
export function signUp(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .post('/users/signup')
            .send(user)
            .end((err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
    })
}

export function signUp2(user) {
    return request
        .post('/users/signup')
        .send(user)
        //.expect(201)
}

export function login(user: User): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .post('/users/login')
            .send(user)
            .end((err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
    })
}

export function login2(user: User) {
    return request
        .post('/users/login')
        .send(user)
        .expect(200)
}

export function deleteFunction(cookie: string): Promise<any> {
    return new Promise((resolve, reject) => {
        request
            .delete('/users/deleteMe')
            .set('Cookie', cookie)
            .end((err, res) => {
                if (err) reject(err)
                else resolve(res)
            })
    })
}

export function deleteFunction2(cookie: string) {
    return request
        .delete('/users/deleteMe')
        .set('Cookie', cookie)
        .expect(200)
}