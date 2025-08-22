import { Component, Input } from '@angular/core';
import { ShortenResult } from '../../interfaces/url';

@Component({
  selector: 'app-url-result',
  templateUrl: './url-result.html',
  styleUrls: ['./url-result.css']
})
export class UrlResultComponent {
  @Input() result!: ShortenResult;
}