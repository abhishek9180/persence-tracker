export class UserBean {
  id: number;
  firstName: string;
  lastName: string;
  avtar?: string;
  email: string;
  password: string;
  constructor() {
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.password = null;
    this.avtar = null;
  }
}
