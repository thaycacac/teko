export type ScreenPayload =
  | {
    name: 'PRODUCT_LISTING';
  }
  | {
    name: 'PRODUCT_DETAIL';
    payload: {
      sku: string;
    };
  }
