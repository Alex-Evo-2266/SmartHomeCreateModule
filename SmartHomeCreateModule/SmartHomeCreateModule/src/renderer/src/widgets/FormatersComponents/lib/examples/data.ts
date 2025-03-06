export const dataExample = `
from app.internal.pages.schemas.components import ComponentType, Component
from app.internal.poll.serviceDataPoll import servicesDataPoll, ObservableDict
from app.configuration.settings import DEVICE_DATA_POLL

def formater()->list[Component]:

	devices:ObservableDict = servicesDataPoll.get(DEVICE_DATA_POLL)
	device_data = devices.get(key="device_system_name")
	return []
`


export const dataExample2 = `
from app.internal.pages.schemas.components import ComponentType, Component
from app.internal.poll.serviceDataPoll import servicesDataPoll, ObservableDict
from app.configuration.settings import SERVICE_DATA_POLL

def formater()->list[Component]:

	services:ObservableDict = servicesDataPoll.get(SERVICE_DATA_POLL)
	service_data = services.get(key="service_key")
	return []
`