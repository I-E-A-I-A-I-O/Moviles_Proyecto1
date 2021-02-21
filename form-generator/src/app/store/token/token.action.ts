import { Token } from './token.model'

export class SetToken {
    static readonly type = '[TOKEN] set';
    constructor(public payload: Token) {}
}