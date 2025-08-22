import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkItem } from '../../interfaces/url';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./url-list.css'],
})

export class UrlListComponent {
  @Input() links: LinkItem[] = [];

  @Output() linkDeleted = new EventEmitter<string>();

  onDelete(link: LinkItem): void {
    const shortCode = link.short_url.split('/').pop() || '';
    if (shortCode) {
      this.linkDeleted.emit(shortCode);
    }
  }
}