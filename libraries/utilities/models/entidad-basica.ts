export class EntidadBasica {
  constructor(
    private _id: string,
    private _codigo: string,
    private _nombre: string,
  ) {}

  public get id() {
    return this._id;
  }

  public get codigo() {
    return this._codigo;
  }

  public get nombre() {
    return this._nombre;
  }
}
