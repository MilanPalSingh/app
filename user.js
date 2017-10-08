

module.exports = class user {
  // constructor() {
  //   this._id = 0;
  //   this._name ="";
  //   this._tasks=[];
  //   this._level=0;
  //   this._avalability=true;
  // }
  constructor(id,name,level) {
    this._id = id || 0;
    this._name =name || "";
    this._tasks=[];
    this._level=level || 0;
    this._avalability=true;
  }

  set id(id){
  	this._id=id;
  }
  set name(n){
  	this._name=n;
  }
  set tasks(t){
  	this._tasks.push(t);
  }
  set level(l){
  	this._level =l;
  }
  set avalability(a){
    this._avalability = a;
  }
  get id(){
    return this._id;
  }
  get name(){
    return this._name;
  }
  get tasks(){
    return this._tasks;
  }
  get level(){
    return this._level ;
  }
  get avalability(){
    return this._avalability;
  }
  get eta(){
    return this._tasks[0].eta;
  }
}