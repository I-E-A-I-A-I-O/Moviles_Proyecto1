export class SetUser{
    static readonly type = '[USER] set username';
    constructor(public payload: string){}
}

export class SetAvatar{
    static readonly type = '[USER] ser avatar';
    constructor(public payload: string){}
}

export class DeleteUser{
    static readonly type = '[USER] delete';
    constructor(){}
}