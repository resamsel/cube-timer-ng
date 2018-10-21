import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Score } from './score.model';
import { ScoreActions, ScoreActionTypes } from './score.actions';

export interface ScoreState extends EntityState<Score> {
  loading: boolean;
}

export const adapter: EntityAdapter<Score> = createEntityAdapter<Score>({
  selectId: model => `${model.timestamp}-${model.value}`
});

export const initialScoreState: ScoreState = adapter.getInitialState({
  loading: true
});

export function reducer(state = initialScoreState, action: ScoreActions): ScoreState {
  switch (action.type) {
    case ScoreActionTypes.AddScore: {
      return adapter.addOne(action.payload.score, state);
    }

    case ScoreActionTypes.UpsertScore: {
      return adapter.upsertOne(action.payload.score, state);
    }

    case ScoreActionTypes.AddScores: {
      return adapter.addMany(action.payload.scores, state);
    }

    case ScoreActionTypes.UpsertScores: {
      return adapter.upsertMany(action.payload.scores, state);
    }

    case ScoreActionTypes.UpdateScore: {
      return adapter.updateOne(action.payload.score, state);
    }

    case ScoreActionTypes.UpdateScores: {
      return adapter.updateMany(action.payload.scores, state);
    }

    case ScoreActionTypes.DeleteScore: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ScoreActionTypes.DeleteScores: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ScoreActionTypes.LoadScores: {
      return adapter.addAll(action.payload.scores, state);
    }

    case ScoreActionTypes.ClearScores: {
      return adapter.removeAll(state);
    }

    case ScoreActionTypes.StartLoading: {
      return {...state, loading: true};
    }

    case ScoreActionTypes.StopLoading: {
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
