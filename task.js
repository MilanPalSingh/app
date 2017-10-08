

module.exports = class task {
  constructor() {
    this._id = 0;
    this._title ="";
    this._description ="";
    this._dependency=[];
    this._eta=0;
    this._type="task";
    this._status=0;
  }
  set id(id){
  	this._id=id;
  }
  set title(title){
  	this._title=title;
  }
  set dependency(d){
  	this._dependency.push(d);
  }
  set eta(e){
  	this._eta = e;
  }
  set status(s){
  	this._status =s;
  }
  get id(){
  	return this._id;
  }
  get title(){
  	return this._title;
  }
  get dependency(){
  	return this._dependency;
  }
  get eta(){
  	return this._eta;
  }
  get status(){
  	return this._status;
  }
}