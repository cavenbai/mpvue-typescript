
import { requestType } from '@/config/enum.config'
const SERVICE = 'service-manage'
const CONTROLLER = 'backlogController'
export default {
  /**
   * 角色待分配事项
   */
  roleAllocateBacklogs: {
    service: SERVICE,
    controller: CONTROLLER,
    action: 'roleAllocateBacklogs',
    type: requestType.Post
  }
}
