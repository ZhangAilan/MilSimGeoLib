import { createRouter, createWebHistory } from 'vue-router'
import Simulation from '../views/Simulation.vue'
import RealTimeCombat from '../views/RealTimeCombat.vue'
import BattlefieldMap from '../views/BattlefieldMap.vue'
import StrategicAnalysis from '../views/StrategicAnalysis.vue'
import JointIntelligence from '../views/JointIntelligence.vue'
import DefenseThinkTank from '../views/DefenseThinkTank.vue'
import IntelligentStaff from '../views/IntelligentStaff.vue'
import InformationCenter from '../views/InformationCenter.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/defense-think-tank'
    },
    {
      path: '/simulation',
      name: 'Simulation',
      component: Simulation
    },
    {
      path: '/real-time-combat',
      name: 'RealTimeCombat',
      component: RealTimeCombat
    },
    {
      path: '/battlefield-map',
      name: 'BattlefieldMap',
      component: BattlefieldMap
    },
    {
      path: '/strategic-analysis',
      name: 'StrategicAnalysis',
      component: StrategicAnalysis
    },
    {
      path: '/joint-intelligence',
      name: 'JointIntelligence',
      component: JointIntelligence
    },
    {
      path: '/defense-think-tank',
      name: 'DefenseThinkTank',
      component: DefenseThinkTank
    },
    {
      path: '/intelligent-staff',
      name: 'IntelligentStaff',
      component: IntelligentStaff
    },
    {
      path: '/information-center',
      name: 'InformationCenter',
      component: InformationCenter
    }
  ]
})

export default router 