import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Puzzle } from './puzzle.model';
import { PuzzleActions, PuzzleActionTypes } from './puzzle.actions';

export interface PuzzleState extends EntityState<Puzzle> {
  active?: Puzzle;
  loaded: boolean;
  loading: boolean;
}

export const adapter: EntityAdapter<Puzzle> = createEntityAdapter<Puzzle>({
  selectId: model => model.name
});

export const initialPuzzleState: PuzzleState = adapter.getInitialState({
  loaded: false,
  loading: false
});

export function reducer(state = initialPuzzleState, action: PuzzleActions): PuzzleState {
  switch (action.type) {
    case PuzzleActionTypes.AddPuzzle: {
      return adapter.addOne(action.payload.puzzle, state);
    }

    case PuzzleActionTypes.UpsertPuzzle: {
      return adapter.upsertOne(action.payload.puzzle, state);
    }

    case PuzzleActionTypes.AddPuzzles: {
      return adapter.addMany(action.payload.puzzles, state);
    }

    case PuzzleActionTypes.UpsertPuzzles: {
      return adapter.upsertMany(action.payload.puzzles, state);
    }

    case PuzzleActionTypes.UpdatePuzzle: {
      return adapter.updateOne(action.payload.puzzle, state);
    }

    case PuzzleActionTypes.UpdatePuzzles: {
      return adapter.updateMany(action.payload.puzzles, state);
    }

    case PuzzleActionTypes.DeletePuzzle: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PuzzleActionTypes.DeletePuzzles: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PuzzleActionTypes.LoadPuzzles: {
      return {
        ...adapter.addAll(action.payload.puzzles, state),
        loaded: true
      };
    }

    case PuzzleActionTypes.ClearPuzzles: {
      return adapter.removeAll(state);
    }

    case PuzzleActionTypes.ActivatePuzzle:
      return {
        ...state,
        active: action.payload.puzzle
      };

    case PuzzleActionTypes.StartLoading: {
      return {...state, loading: true};
    }

    case PuzzleActionTypes.StopLoading: {
      return {...state, loading: false};
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
