import { IDevice } from "../schemas/models/device"

const device_template = (name:string) => 
`from app.ingternal.device.classes.baseDevice import BaseDevice

class ${name}(BaseDevice):
	
	def __init__(self, *args, **kwargs):
		super().__init__(**kwargs)
	
	def load(self):
		super().load()

	async def load_async(self):
		super().load_async()

	def set_value(self, field_id: str, value: str):
		super().set_value(field_id, value)
`

export const generateDeviceClass = (data:IDevice) => {
	const template = device_template(data.name)
	return template
}

const DEVICE_MODULE = 
`from app.ingternal.modules.classes.baseModules import BaseModule

class Module(BaseModule):
    pass
`

export const generateDeviceModule = () => {
	return DEVICE_MODULE
}