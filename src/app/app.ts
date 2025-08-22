import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortenResult, LinkItem } from './interfaces/url';
import { UrlShortenerService } from './services/url-shortener.service';
import { UrlShortenerFormComponent } from "./components/url-shortener-form/url-shortener-form";
import { UrlResultComponent } from "./components/url-result/url-result";
import { UrlListComponent } from "./components/url-list/url-list";

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule, UrlShortenerFormComponent, UrlResultComponent, UrlListComponent]
})
export class App implements OnInit {
  protected readonly title = signal('url-shortener-frontend');

  shortenResult: ShortenResult | null = null;
  links: LinkItem[] = [];
  loadingLinks: boolean = false;
  linksError: string = '';

  constructor(private urlShortenerService: UrlShortenerService) {}

  ngOnInit(): void {
    this.fetchLinks();
  }

  // Lidar com o evento do formulário quando uma URL é encurtada com sucesso
  onUrlShortened(result: ShortenResult): void {
    this.shortenResult = result;
    this.fetchLinks(); // Atualiza a lista após o encurtamento
  }

  // Lidar com o evento de exclusão
  onDeleteLink(shortCode: string): void {
    this.urlShortenerService.deleteLink(shortCode)
      .subscribe({
        next: () => {
          console.log('Link excluído com sucesso!');
          this.fetchLinks(); // Atualiza a lista após a exclusão
        },
        error: (err) => {
          console.error('Erro ao excluir o link:', err);
          this.linksError = 'Erro ao excluir o link.';
        }
      });
  }

  // Busca a lista de links na API
  fetchLinks(): void {
    this.loadingLinks = true;
    this.linksError = '';
    this.urlShortenerService.getLinks()
      .subscribe({
        next: (links) => {
          this.links = links;
          this.loadingLinks = false;
        },
        error: (err) => {
          this.linksError = 'Não foi possível carregar a lista de links.';
          console.error(err);
          this.loadingLinks = false;
        }
      });
  }

}