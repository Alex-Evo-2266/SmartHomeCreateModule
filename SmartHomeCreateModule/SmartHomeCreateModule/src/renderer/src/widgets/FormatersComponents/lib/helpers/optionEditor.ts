import { editor } from "monaco-editor";

export const options: editor.IStandaloneEditorConstructionOptions = {
        selectOnLineNumbers: true, // Включает выделение номеров строк
        automaticLayout: true, // Автоматическое изменение размера редактора
        theme: 'vs-light', // Тема редактора
        minimap: {
          enabled: false, // Отключаем мини-карту
        },
        occurrencesHighlight: "singleFile",
        renderLineHighlight: 'all',
        matchBrackets: "always"
      };