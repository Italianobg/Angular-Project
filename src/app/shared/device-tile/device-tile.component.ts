import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-device-tile',
  templateUrl: './device-tile.component.html',
  styleUrls: ['./device-tile.component.css'],
})
export class DeviceTileComponent implements OnInit {
  @Input() device;
  constructor() {}

  ngOnInit(): void {}
}
