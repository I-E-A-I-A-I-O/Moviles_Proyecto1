import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuCreationFunctionsService {

  constructor() { }

  createDeleteInputs(tree){
    let list = this.treeToListAll(tree);
    let inputs = []
    list.forEach(element => {
      inputs.push({
        label: element.name,
        value: element,
        type: "radio"
      })
    })
    return inputs;
  }

  generateId(tree){
    if (tree.length > 0){
      let list = this.treeToListAll(tree);
      return list.length + 1;
    }
    else{
      return 1;
    }
  }

  createOptionInputs(options){
    let inputs = [];
    options.forEach(element => {
      inputs.push({
        label: element.name,
        value: element,
        type: "radio"
      })
    })
    return inputs;
  }

  createInputs(parents){
    let list = this.treeToList(parents);
    let inputs = [];
    list.forEach(element => {
      inputs.push({
        label: element.name,
        value: element,
        type: "radio"
      })
    })
    return inputs;
  }

  treeToListAll(tree){
    let list = [];
    for(let i = 0; i < tree.length; i++){
      list.push(tree[i]);
      if(tree[i].type){
        if (tree[i].childs.length > 0){
          list = list.concat(this.treeToListAll(tree[i].childs));
        }
      }
    }
    return list;
  }

  treeToList(tree){
    let list = [];
    for(let i = 0; i < tree.length; i++){
      if(tree[i].type){
        list.push(tree[i]);
        if (tree[i].childs.length > 0){
          list = list.concat(this.treeToList(tree[i].childs));
        }
      }
    }
    return list;
  }
}
