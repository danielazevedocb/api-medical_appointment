import { User } from "../entities/user.entity"


export interface IUserRespositiry {
  findByUsername(username: string): Promise<User | undefined>
  save(data: User):  Promise<User>
}