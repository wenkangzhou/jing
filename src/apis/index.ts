import Request from '../utils/request'

export default class API {
  static login(loginData: any): Promise<any> {
    return Request.post(`/admin/login`, loginData)
  }
}
