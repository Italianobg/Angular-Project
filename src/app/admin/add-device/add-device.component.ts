import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['../../../form-style.css', './add-device.component.css']
})
export class AddDeviceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addDeviceHandler(formData){
    console.log(formData);
  }
}
