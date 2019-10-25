import ns from '@/store/constants/ns'
import home from './home/index'
import source from './source/index'
import plant from './plant/index'
import farming from './farming/index'
import warehouse from './warehouse/index'
import origin from './origin/index'

export default {
    [ns.HOME]: home,
    [ns.SOURCE]: source,
    [ns.PLANT]: plant,
    [ns.FARMING]: farming,
    [ns.WAREHOUSE]: warehouse,
    [ns.ORIGIN]: origin
}
