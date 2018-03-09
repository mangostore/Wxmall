/* component */
import CubeCell from './cell/cell'
import CubeSwitch from './switch/switch'
import CubeBadge from './badge/badge'
import CubeInput from './input/input'
import CubeDrawer from './drawer/drawer'
import {CubeChecker, CubeCheckerItem} from './checker/checker'
import CubeNumber from './number/number'
import {CubeTab, CubeTabItem} from './tab/tab'
import CubeSticky from './sticky/sticky'

/* plug */
import Validator from './libs/validator'
import SetTitle from './libs/setTitle'

/* validator */
import required from './libs/validators/required'
import minLength from './libs/validators/minLength'
import maxLength from './libs/validators/maxLength'
import mobile from './libs/validators/mobile'

/* util */
import {setStore, getStore, removeStore, getQuery} from './libs/utils'

/* rem */
import './libs/rem'

export {
  /* component */
  CubeCell,
  CubeSwitch,
  CubeBadge,
  CubeInput,
  CubeDrawer,
  CubeChecker,
  CubeCheckerItem,
  CubeNumber,
  CubeTab,
  CubeTabItem,
  CubeSticky,
  /* plug */
  Validator,
  SetTitle,
  /* validators */
  required,
  minLength,
  maxLength,
  mobile,
  /* util */
  setStore,
  getStore,
  removeStore,
  getQuery
}
