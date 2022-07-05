import {Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-navi',
  templateUrl: './side-navi.component.html',
  styleUrls: ['./side-navi.component.scss']
})
export class SideNaviComponent implements OnInit {

  @Input() sideNaviState = false;

  constructor() { }

  ngOnInit(): void {
  }

  public naviClose(): void {
    this.sideNaviState = false;
  }


}
