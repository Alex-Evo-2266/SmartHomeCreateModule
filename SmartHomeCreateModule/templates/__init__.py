from moduls_src.moduls import BaseModule
from moduls_src.services import Services
from settings import configManager

class %{module.name}%Module(BaseModule):

    dependencies = []

    @staticmethod
    def start():
        pass

    @staticmethod
    def end(self):
        pass
