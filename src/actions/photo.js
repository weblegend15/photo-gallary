import { createAction } from 'redux-actions'

// fetch the list of photos
export const fetchPhotoListRequest = createAction('FETCH_PHOTO_LIST_REQUEST')
export const fetchPhotoListSuccess = createAction('FETCH_PHOTO_LIST_SUCCESS')
export const fetchphotoListFailure = createAction('FETCH_PHOTO_LIST_FAILURE')

// // favorite the photo
export const favoritePhotoRequest = createAction('FAVORITE_PHOTO_REQUEST')
