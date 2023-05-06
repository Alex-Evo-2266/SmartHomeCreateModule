from moduls_src.moduls import BaseModule
from moduls_src.services import Services
from settings import configManager

from castom_moduls.routers.base_module_router import router as base_router

class %{module.name}%Module(BaseModule):

    dependencies = []
    routers = [base_router]

    @staticmethod
    def start():
        pass

    @staticmethod
    def end(self):
        pass
