import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080/'

  data:any = {}
  count:any = 0

  ngOnInit() {
    this.getPub(this.url);
    this.getCount(this.url);
  }


  onClickDelete(id: string): void { 
    console.log(id)
    try {
      this.deletePub(id).subscribe(() => {
        console.log(`Pub with ID ${id} deleted`);
        this.getPub(this.url);
        this.getCount(this.url);
      });
    } catch (e) {
      console.log(e);
    }
  }
  


  deletePub(id: string) {
    return this.http.delete(this.url+`publisher/delete/${id}`);
  }

  private getPub(url: string):void {
    this.http.get<any>(url+'publisher/getall').subscribe(data => {
      this.data = data; 

      console.log(this.data)    
      
    });

  }

  private getCount(url: string):void{
    this.http.get<any>(url+'publisher/findTotal').subscribe(data =>{this.count = data; console.log(data)})
  }
}
