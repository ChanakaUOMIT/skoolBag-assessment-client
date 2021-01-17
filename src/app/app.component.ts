import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'skool-bag';

  w3_open() {
    document.getElementById('mySidebarprofile').style.display = 'block';
    document.getElementById('myOverlay').style.display = 'block';
  }

  w3_close() {
    document.getElementById('mySidebarprofile').style.display = 'none';
    document.getElementById('myOverlay').style.display = 'none';
  }
}
