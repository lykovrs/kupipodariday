import { HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  LoginOrPasswordIncorrect = 100,
  UserAlreadyExists,
  UserNotFound = 102,
  WishNotFound = 103,
  WishCanNotEdit = 104,
  WishCanNotDelete = 105,
  OfferNotFound = 106,
  WishlistNotFound = 107,
  WishlistCanNotEdit = 108,
  WishlistCanNotDelete = 109,
}

export const code2message = new Map<ErrorCode, string>([
  // user
  [ErrorCode.LoginOrPasswordIncorrect, 'Login or password is incorrect'],
  [ErrorCode.UserAlreadyExists, 'User already exists'],
  [ErrorCode.UserNotFound, 'User not found'],
  // wish
  [ErrorCode.WishNotFound, 'Wish not found'],
  [ErrorCode.WishCanNotEdit, 'You can edit only your wish'],
  [ErrorCode.WishCanNotDelete, 'You can delete only your wish'],
  // offer
  [ErrorCode.OfferNotFound, 'Offer not found'],
  // wishlist
  [ErrorCode.WishlistNotFound, 'Wishlist not found'],
  [ErrorCode.WishlistCanNotEdit, 'You can edit only your wishlist'],
  [ErrorCode.WishlistCanNotDelete, 'You can delete only your wishlist'],
]);

export const code2status = new Map<ErrorCode, HttpStatus>([
  [ErrorCode.LoginOrPasswordIncorrect, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserAlreadyExists, HttpStatus.BAD_REQUEST],
  [ErrorCode.UserNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishCanNotEdit, HttpStatus.FORBIDDEN],
  [ErrorCode.WishCanNotDelete, HttpStatus.FORBIDDEN],
  [ErrorCode.OfferNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishlistNotFound, HttpStatus.NOT_FOUND],
  [ErrorCode.WishlistCanNotEdit, HttpStatus.FORBIDDEN],
  [ErrorCode.WishlistCanNotDelete, HttpStatus.FORBIDDEN],
]);
