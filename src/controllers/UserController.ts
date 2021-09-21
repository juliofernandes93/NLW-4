import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository'

 import * as bcrypt from 'bcrypt'

class UserController{
    async create(request: Request, response: Response){
        const {name, email, password} = request.body
        const passwordHash = await bcrypt.hash(password, 8)
        const usersRepository = getCustomRepository(UsersRepository)
        const userAlreadyExists = await usersRepository.findOne({
            email
        })
        if (userAlreadyExists){
            return response.status(400).json({
                error: "User Already Exists"                
            })
        }
        const user = usersRepository.create({
            name, email, password: passwordHash
        })

        await usersRepository.save(user)

        delete user.password;

        return response.status(201).json(user);
    }
}

export { UserController };
