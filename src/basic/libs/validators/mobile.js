import {regex} from './libs'

const mobileRegex = /^1[3|4|5|7|8|9][0-9]{9}$/
export default (val) => regex(val, mobileRegex)
