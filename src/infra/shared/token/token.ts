import { User } from "@prisma/client";

export interface  IToken {
    create(user: User) :string
    valite(token: string): boolean
}