import {Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() isSideNaviOpen = new EventEmitter<boolean>();

  public isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  public sideNaviControl(isOpen: boolean): void {
    this.isOpen = !isOpen;
    this.isSideNaviOpen.emit(!isOpen);
  }

}
