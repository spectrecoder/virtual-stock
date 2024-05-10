import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})

export class NewsModalComponent implements OnInit {

  @Input() companyNews: News[];
  @Input() currNews: News;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

  open(news, content) {
    this.currNews = news;
    this.modalService.open(content);
  }

}
