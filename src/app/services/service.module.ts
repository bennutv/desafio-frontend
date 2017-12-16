import { NgModule, Optional, SkipSelf } from '@angular/core';
import { Service } from 'app/services/service.component';


@NgModule({
	declarations: [],
	imports: [
	],
	exports: [],
	providers: [
		Service
	]
})
export class ServiceModule {
	constructor( @Optional() @SkipSelf() parentModule: ServiceModule) {
		if (parentModule) {
			throw new Error('ServiceModule is already loaded. Import it in the AppModule only');
		}
	}
}
