import { Global, Module } from '@nestjs/common';

import { ConfigSharedModule } from './config.module';

const MODULES = [ConfigSharedModule];

@Global()
@Module({
  imports: MODULES,
  exports: MODULES,
})
export class SharedModule { }