import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShortenResult, LinkItem, DeleteResponse } from '../interfaces/url';

@Injectable({
  providedIn: 'root',
})
export class UrlShortenerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  shortenUrl(url: string): Observable<ShortenResult> {
    return this.http.post<ShortenResult>(`${this.apiUrl}/shorten`, { url });
  }

  getLinks(): Observable<LinkItem[]> {
    return this.http.get<LinkItem[]>(`${this.apiUrl}/links`);
  }

  deleteLink(shortCode: string): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(
      `${this.apiUrl}/links/${shortCode}`
    );
  }
}