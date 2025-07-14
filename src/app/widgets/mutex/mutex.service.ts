import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

export interface MutexState {
  panelOn: boolean;
  input: string | null;
}

@Injectable({ providedIn: 'root' })
export class MutexService {
  private baseUrl = 'https://www.gritlabs.net';
  private storageKey = 'mutexState';

  constructor(private http: HttpClient) {}

  getState(): Observable<MutexState> {
    return this.http
      .get<MutexState>(`${this.baseUrl}/mutex/state`)
      .pipe(
        tap((state) => this.saveLocalState(state)),
        catchError(() => of(this.getLocalState()))
      );
  }

  setState(state: MutexState): Observable<void> {
    this.saveLocalState(state);
    return this.http
      .post<void>(`${this.baseUrl}/mutex/state`, state)
      .pipe(catchError(() => of(void 0)));
  }

  getLocalState(): MutexState {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        return JSON.parse(raw) as MutexState;
      } catch {
        // ignore parse error
      }
    }
    return { panelOn: false, input: null };
  }

  private saveLocalState(state: MutexState) {
    localStorage.setItem(this.storageKey, JSON.stringify(state));
  }
}
