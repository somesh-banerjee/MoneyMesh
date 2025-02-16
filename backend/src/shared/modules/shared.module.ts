import { Global, Module } from '@nestjs/common';

import { ConfigSharedModule } from './config';
import { JwtSharedModule } from './jwt';

const MODULES = [ConfigSharedModule, JwtSharedModule];

@Global()
@Module({
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule { }