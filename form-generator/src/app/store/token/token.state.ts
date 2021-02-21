import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetToken } from './token.action'
import { TokenStateModel } from './token.model'
 
@State({
    name: "token",
    defaults: {
        token: "nada"
    }
})
@Injectable({
    providedIn: 'root'
})
export class TokenState{
    @Selector()
    static getToken(state: TokenStateModel) {
        return state.token;
    }

    @Action(SetToken)
    setToken({ patchState }: StateContext<TokenStateModel>, { payload }: SetToken){
        patchState({
            token: payload
        })
    }
}