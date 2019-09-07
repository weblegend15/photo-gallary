import { all, takeLatest } from 'redux-saga/effects'
import {
    // fetch the list of photos
    fetchPhotoListRequest,
} from '../../actions/photo'
import { fetchPhotoListWorker } from './worker'

export default function* photoSaga() {
    yield all([
        takeLatest(fetchPhotoListRequest.toString(), fetchPhotoListWorker),
    ])
}
