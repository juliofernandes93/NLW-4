import { compare } from "bcrypt";
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { sign } from 'jsonwebtoken'


class SessionController {

    async create(request: Request, response: Response){
        const {name, password} = request.body

        const usersRepository = getCustomRepository(UsersRepository)

        const user = await usersRepository.findOne({name})

        if(!user){
            return response.status(400).json({error: "User not found"})
        }

        const matchPassword = await compare(password, user.password)

        if(!matchPassword){
            return response.status(400).json({error: "Incorrect password or username"})
        }

        const token = sign ({}, 'bb5ca07b5d102cbfd5579f734792759d',{
            subject: user.id,
            expiresIn: '1d'
        })

        return response.json({token, user})
    }
}

export {SessionController}