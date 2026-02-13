import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  loading = true;
  error: string | null = null;
  userId: string | null = null;
  secret: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.secret = this.route.snapshot.queryParamMap.get('secret');

    await this.verifyMagicLink(); // Riutilizza la logica di verifica
  }

  async retry() {
    // Reset stato per feedback visivo
    this.error = null;
    this.loading = true;

    // Breve delay per animazione fluida
    setTimeout(async () => {
      await this.verifyMagicLink();
    }, 300);
  }

  private async verifyMagicLink() {
    // Salva i parametri per il retry
    if (!this.userId || !this.secret) {
      this.userId = this.route.snapshot.queryParamMap.get('userId');
      this.secret = this.route.snapshot.queryParamMap.get('secret');
    }

    if (!this.userId || !this.secret) {
      this.error = 'Token mancante o non valido.';
      this.loading = false;
      return;
    }

    try {
      await this.auth.completeMagicSession(this.userId, this.secret);
      this.loading = false;

      // Piccola animazione di successo prima del redirect
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1200);
    } catch (err: any) {
      console.log(err);
      this.loading = false;
      this.error = 'Link scaduto o non valido. Riprova o richiedi un nuovo Magic Link.';
    }
  }
}
