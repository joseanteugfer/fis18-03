import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrdenesPagoComponent } from './ordenesPago/ordenesPago.component';
import { EditableOrdenPagoComponent } from './editable-orden/editable-orden.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesPagoComponent,
    EditableOrdenPagoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
