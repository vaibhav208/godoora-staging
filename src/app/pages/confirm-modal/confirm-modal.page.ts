import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AppService } from 'src/app/services/app.service';
import { Subject, takeUntil } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.page.html',
  styleUrls: ['./confirm-modal.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfirmModalPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  user: any;
  @Input() type = 'c';
  @Input() msg: string;

  constructor(
    protected modalCtrl: ModalController,
    protected appService: AppService
  ) {}

  ngOnInit() {
    this.appService.userDetail
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.user = res;
        if (this.user) {
          this.type = this.user.type;
        }
      });
  }

  async dismiss(flag = false) {
    await this.modalCtrl.dismiss({ flag });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
