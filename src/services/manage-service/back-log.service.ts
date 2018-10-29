import {manageService} from "@/config/server/manage-service";
import { NetService } from '@/utils/net.service'
import { Inject } from "@/core/decorator";

export class BackLogService {
  @Inject(NetService) private netService: NetService

  constructor(){
    console.log(234324324)
  }
  roleAllocateBacklogs(data) {
    return this.netService.send({
      server: manageService.backLogController.roleAllocateBacklogs,
      data: data
    })
  }
}
