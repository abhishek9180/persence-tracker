import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Persence Tracker';
}


/*
addUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        const user = this.userService.getUserById(id);
        if (user) {
          this.initFromControl(user);
        } else {
          this.initFromControl();
        }
      } else {
        this.initFromControl();
      }
    });
  }

  submit() {
    const body = this.addUser.getRawValue();
    this.activatedRoute.queryParamMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.userService.updateUser(id, body);
      } else {
        this.userService.addUser(body);
      }
    });
  }

  get name() {
    return this.addUser.get('name');
  }
  get email() {
    return this.addUser.get('email');
  }
  get phoneNo() {
    return this.addUser.get('phoneNo');
  }
  initFromControl(user = { name: null, email: null, phoneNo: null }) {
    this.addUser = this.fb.group({
      name: [user.name, Validators.required],
      email: [user.email, Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$')],
      phoneNo: [user.phoneNo, Validators.pattern('[0-9]{10}')]
    });
  }
*/
