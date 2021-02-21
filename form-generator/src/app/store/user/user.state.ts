import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { DeleteUser, SetUser, SetAvatar } from './user.action';
import { UserStateModel } from './user.model';

@State({
    name: "user",
    defaults: {
        user: { username: null, avatar: null }
    }
})
@Injectable({
    providedIn: 'root'
})
export class UserState{
    @Selector()
    static getUser(state: UserStateModel){
        return state.user;
    }

    @Action(SetUser)
    setUser({ patchState, getState }: StateContext<UserStateModel>, { payload }: SetUser){
        let state = getState();
        patchState({
            user: { username: payload, avatar: state.user.avatar }
        })
    }

    @Action(SetAvatar)
    setAvatar({ patchState, getState }: StateContext<UserStateModel>, { payload }: SetAvatar){
        let state = getState();
        patchState({
            user: { username: state.user.username, avatar: payload }
        })
    }

    @Action(DeleteUser)
    deleteUser({ patchState }: StateContext<UserStateModel>){
        patchState({
            user: { username: null, avatar: null }
        })
    }
}