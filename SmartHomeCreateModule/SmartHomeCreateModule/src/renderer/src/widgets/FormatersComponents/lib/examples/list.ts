export const listExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:

	return [
		Component(
			type=ComponentType.LIST, 
			name="", 
			value=[Component(type=ComponentType.TEXT, value="text")]
		)
		]

`