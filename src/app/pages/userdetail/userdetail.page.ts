import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.page.html',
  styleUrls: ['./userdetail.page.scss'],
})
export class UserdetailPage implements OnInit {
  selectedUser = JSON.parse(localStorage.getItem('selectedUser') || '{}');
  users = JSON.parse(localStorage.getItem('users') || '[]');
  activeUser = JSON.parse(localStorage.getItem('activeUser') || '{}');
  image!: SafeResourceUrl;

  constructor(
    private navCtrl: NavController,
    public sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.selectedUser =
      this.route.getCurrentNavigation()?.extras.state?.['selectedUser'] ??
      JSON.parse(localStorage.getItem('selectedUser') || '{}');
    this.activeUser =
      this.route.getCurrentNavigation()?.extras.state?.['activeUser'] ??
      JSON.parse(localStorage.getItem('activeUser') || '{}');
  }
  User() {
    // Find the index of the selected user in the users array
    const selectedUserIndex = this.users.findIndex(
      (u: any) => u.id === this.selectedUser.id
    );

    // Update the user object in the users array
    this.users[selectedUserIndex] = this.selectedUser;

    // Save the updated user object in local storage
    localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser));
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // check if the selected file is an image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = this.sanitizer.bypassSecurityTrustResourceUrl(
          reader.result as string
        );
        this.selectedUser.image = reader.result as string;

        // Find the index of the selected user in the users array
        const selectedUserIndex = this.users.findIndex(
          (u: any) => u.id === this.selectedUser.id
        );

        // Update the image of the user object in the users array
        this.users[selectedUserIndex].image = reader.result as string;

        // Save the updated user object in local storage
        localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser));
        localStorage.setItem('users', JSON.stringify(this.users));

        // If the active user has the same ID as the selected user, update the active user's image as well
        if (this.activeUser && this.activeUser.id === this.selectedUser.id) {
          this.activeUser.image = reader.result as string;
          localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
          alert('Image has been uploaded');
        }
      };
    } else {
      alert('Please select an image of type JPEG or PNG');
    }
  }

  updateUser() {
    // Find the index of the selected user in the users array
    const selectedUserIndex = this.users.findIndex(
      (u: any) => u.id === this.selectedUser.id
    );

    // Update the user object in the users array
    this.users[selectedUserIndex] = this.selectedUser;

    if (this.activeUser && this.activeUser.id === this.selectedUser.id) {
      this.activeUser = this.selectedUser;
    }

    // Save the updated user object in local storage
    localStorage.setItem('selectedUser', JSON.stringify(this.selectedUser));
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('activeUser', JSON.stringify(this.activeUser));
  }

  goBack() {
    localStorage.removeItem('selectedUser');
    this.route.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  deleteUser() {}
}
