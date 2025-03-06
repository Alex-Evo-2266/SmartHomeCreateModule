export const cardExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:

	return [
		Component(
            type=ComponentType.CARD, 
            name="", 
            label="info", 
            action=None, 
            value=Component(type=ComponentType.TEXT, value="text"))
		]

`