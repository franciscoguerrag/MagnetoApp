import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptsRoutingModule } from './receipts-routing.module';
import { ReceiptsComponent } from './receipts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ReceiptsRoutingModule,
        AutocompleteLibModule
    ],
    declarations: [ReceiptsComponent]
})
export class ReceiptsModule {}
