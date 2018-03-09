import {req, len} from './libs'

export default (val, length) => !req(val) || len(val) < length
