from pydantic import BaseModel 
from typing import Optional, List, Dict


class TabletesttableItemScheme(BaseModel):
	name: str

class TabletesttableScheme(BaseModel):
	items:List[TabletesttableItemScheme]
