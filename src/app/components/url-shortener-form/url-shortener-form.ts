import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlShortenerService } from '../../services/url-shortener.service';
import { ShortenResult } from '../../interfaces/url';

@Component({
  selector: 'app-url-shortener-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './url-shortener-form.html',
  styleUrls: ['./url-shortener-form.css'],
})
export class UrlShortenerFormComponent {
  originalUrl: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  // Emitter para enviar o resultado para o componente pai
  @Output() urlShortened = new EventEmitter<ShortenResult>();

  constructor(private urlShortenerService: UrlShortenerService) {}

  onSubmit(): void {
    if (!this.originalUrl) {
      this.errorMessage = 'Por favor, insira uma URL.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.urlShortenerService.shortenUrl(this.originalUrl).subscribe({
      next: (result) => {
        this.urlShortened.emit(result);
        this.originalUrl = '';
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao encurtar a URL. Tente novamente.';
        console.error(err);
        this.loading = false;
      },
    });
  }
}