export const actionExample = `
from app.internal.pages.schemas.components import ComponentType, Component

def formater()->list[Component]:

	return [
		Component(
			type=ComponentType.BUTTON, 
			name="", 
			label="text btn", 
			action=Action(
                action_type=ActionType.DIALOG,
                action_target="dialog_name",
                close_dialog=False, # закрывает диалоговое окно если кнопка в диалоговом окне.
                query={"q1":"data1"},
                data=Component(type=ComponentType.TEXT, value="text", name="")
            ), 
			value=Component(type=ComponentType.TEXT, value="text"))
		]

`