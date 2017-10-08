

module.exports = class task {
  constructor(title, id , des, eta, status, dependency,uuid) {
    this._id = id || 0;
    this._title =title || "";
    this._description =des || "";
    this._dependency= dependency || [];
    this._eta=eta || 0;
    this._type="task";
    this._status=status || 0;
    this._uuid=uuid ||0;
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
  get uuid(){
  	return this._uuid;
  }
}