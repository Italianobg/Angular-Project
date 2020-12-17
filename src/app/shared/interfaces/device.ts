export interface IDevices {
  [index: number]: IDevice;
}

export interface IDevice {
  id: string;
  data: IDeviceData;
}

export interface IDeviceData {
  id: string;
  description: string;
  imageUrl: string;
  linkedServices: ILinkedServices[];
  name: string;
  requestCounter: number;
  shortDescription: string;
}

export interface ILinkedServices {
  service: string;
  price: number;
  name: string;
}
