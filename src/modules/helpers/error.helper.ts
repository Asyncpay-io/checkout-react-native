import type { Error } from '../../@types';

export const resolveError = (error: any): Error => {
  if (typeof error === 'object') {
    if (error.error && error.error_code && error.error_description) {
      return {
        error: error.error,
        error_code: error.error_code,
        error_description: error.error_description,
      };
    } else {
      return {
        error: 'SDK_ERROR',
        error_code: '0003',
        error_description: error,
      };
    }
  } else {
    return {
      error: 'SDK_ERROR',
      error_code: '0003',
      error_description: error,
    };
  }
};
