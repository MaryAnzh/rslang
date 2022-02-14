class Storage {
  private _isAutorize: boolean;

  constructor () {
    this._isAutorize = false;
  }

  
  public get isAutorize() : boolean {
    return this._isAutorize;
  }
   
  public set isAutorize(v : boolean) {
    
    this._isAutorize = v;
  }
   

}

const storage = new Storage();
export { storage };