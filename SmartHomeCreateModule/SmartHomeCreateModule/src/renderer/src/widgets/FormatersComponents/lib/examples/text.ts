export const textExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:
	
	return [
		Component(type=ComponentType.TEXT, name="", value="info")
		]

`