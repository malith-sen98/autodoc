import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  options = [
    { id: 1, value: 'vehicleowner' },
    { id: 2, value: 'servicecenter' }
  ];

  formConteudo1 = new FormGroup({
    firstName1: new FormControl(''),
    lastName1: new FormControl(''),
  });
  formConteudo2 = new FormGroup({
    firstName2: new FormControl(''),
    lastName2: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {}
}
