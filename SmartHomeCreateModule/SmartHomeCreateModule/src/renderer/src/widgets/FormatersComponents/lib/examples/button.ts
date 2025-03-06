export const buttonExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:

	return [
		Component(
			type=ComponentType.BUTTON, 
			name="", 
			label="text btn", 
			action=None, 
			value=Component(type=ComponentType.TEXT, value="text"))
		]

`