import { SetMetadata } from '@nestjs/common';
import { PUBLIC_DECORATOR } from '../constant';

/**
 * public method decorator
 * @returns
 */
export const Public = () => SetMetadata(PUBLIC_DECORATOR, true);
