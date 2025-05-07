import { Component } from '@angular/core';
import { TreeComponent } from "../../shared/components/tree/tree.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TreeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
