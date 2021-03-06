import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Puzzle } from '../../../models/puzzle/puzzle.model';
import { PuzzleService } from '../../../services/puzzle.service';
import { encode } from 'firebase-key';

interface Page {
  id: string;
  name: string;
  icon: string;
}

interface Link {
  page: Page;
  link?: string;
}

const LINKS: Link[] = [
  {page: {id: 'timer', name: 'Timer', icon: 'timer'}, link: '/puzzles/:puzzle/timer'},
  {page: {id: 'scores', name: 'Scores', icon: 'assessment'}, link: '/puzzles/:puzzle/scores'},
  {page: {id: 'puzzles', name: 'Puzzles', icon: 'games'}, link: '/puzzles'},
  {page: {id: 'settings', name: 'Settings', icon: 'settings'}, link: '/settings'},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public links: Link[];

  @Input() activePage: string;
  private _subscription: Subscription = Subscription.EMPTY;

  constructor(
    private readonly puzzleService: PuzzleService
  ) {
  }

  ngOnInit() {
    this._subscription = this.puzzleService.puzzle$()
      .subscribe((puzzle: Puzzle | undefined) => {
        this.links = LINKS.map((link: Link) => {
          if (link.link !== undefined && link.link.includes('/:puzzle/')) {
            if (puzzle !== undefined) {
              return {
                ...link,
                link: link.link.replace('/:puzzle/', `/${encode(puzzle.name)}/`)
              };
            }

            return {
              ...link,
              link: undefined
            };
          }

          return link;
        });
      });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
