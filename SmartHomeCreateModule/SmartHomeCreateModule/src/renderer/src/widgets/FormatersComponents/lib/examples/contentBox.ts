export const contentBoxExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:

	return [
		Component(
			type=ComponentType.CONTENT_BOX, 
			name="", 
			label="info", 
			value=Component(type=ComponentType.TEXT, value="text"))
		]

`