import {Component, Input, OnInit} from '@angular/core';

import {Pattern, PatternObj, patternsHashMap} from "../../interface/types";

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input() pattern: Pattern | undefined;
  public sectionTitle: string | undefined = '';

  constructor() {}

  ngOnInit(): void {
    const targetPatternObj: PatternObj | undefined = patternsHashMap.find(pattern => pattern.ptId === this.pattern);
    this.sectionTitle = targetPatternObj?.settingSectionTitle;
  }

}
