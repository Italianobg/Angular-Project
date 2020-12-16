export interface IServices {
  [index: number]: IService;
}

export interface IService {
  id: string;
  data: IServiceData;
}

export interface IServiceData {
  id: string;
  description: string;
  imageUrl: string;
  name: string;
}
