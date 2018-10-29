import { Observable } from "rxjs";
import { StorageService } from '@/utils/storage.service'
const getType = ['GET', 'DELETE'] // 使用GET请求类型
export class NetService{
  public static generateRequestUrl({ service, controller, action, url }: { service: string, controller: string, action: string, url?: string }, append = [], sort?):string {
    // 自定义url优先级最高
    if (url) return url
    if (controller) {
      let targetUrl = [service, controller, action, ...append].filter(x => x).join('/')
      if (sort) {
        targetUrl += '?'
        targetUrl += Object.entries(sort.sort).map(([k, v]) => `sort=${k},${v}`).join('&')
      }
      return targetUrl
    } else {
      throw new Error('server配置异常')
    }
  }
  /**
   * 生成头部信息
   */
  private generateRequestHeader(headers): any {
    let token = StorageService.getItem('userToken') || ''
    if (token) {
      return Object.assign({
        'authorization': token,
        'content-type': 'application/json'
      }, headers)
    } else {
      return headers || {}
    }
  }

  private filterEmptyData(data) {
    Object.entries(data)
      .filter(([key, value]) => {
        // 过滤空字符串
        if (value === undefined || value === "") {
          return true
        }
      })
      .forEach(([key, value]) => {
        delete data[key]
      });
    return data
  }

  public send(options: any): Observable<any>{
    let data = Object.assign({}, options.data)  //传入的参数
    let postData  //post请求参数处理
    let getData  //get请求参数处理
    let url = NetService.generateRequestUrl(options.server, options.append, options.sort)
    let method = options.server.type || 'GET'
    let headers = this.generateRequestHeader(options.headers)
    getType.indexOf(method) > -1 ? (getData = this.filterEmptyData(data)) : (postData = this.filterEmptyData(data))  // 判断参数类型GET/POST
    // 创建待观察对象
    var observable = Observable.create((observer) => {
      wx.request({
        method : method,
        url : url,
        header : headers,
        data : getType.includes(method)? getData : postData,
        success (res) {
          console.log(res)
        },
        fail(ex){
          console.log(ex)
        }
      })
    })
    return observable
  }
}
