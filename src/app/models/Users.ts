export class User {
    constructor(public id: number, public name: string) {}
  }
  
  export interface IUserResponse {
    total: number;
    results: User[];
  }