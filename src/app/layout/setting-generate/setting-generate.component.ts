import { Component, OnInit } from '@angular/core';

import { Pattern } from "../../interface/types";

@Component({
  selector: 'app-setting-generate',
  templateUrl: './setting-generate.component.html',
  styleUrls: ['./setting-generate.component.scss']
})
export class SettingGenerateComponent implements OnInit {

  public pattern: typeof Pattern = Pattern;

  constructor() {}

  ngOnInit(): void {
  }

}
