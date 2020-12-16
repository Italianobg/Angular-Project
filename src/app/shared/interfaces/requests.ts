export interface IRequests {
  [index: number]: IRequest;
}

export interface IRequest {
  id: string;
  data: IRequestData;
}

export interface IRequestData {
  device: string;
  email: string;
  message: string;
  name: string;
  sDevice: string;
  sService: string;
  service: string;
  status: string;
  subject: string;
}
