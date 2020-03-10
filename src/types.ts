export type ScreenPayload =
  | {
    name: 'PRODUCT_LISTING';
  }
  | {
    name: 'PRODUCT_DETAIL';
    payload: {
      productId: string;
    };
  }
