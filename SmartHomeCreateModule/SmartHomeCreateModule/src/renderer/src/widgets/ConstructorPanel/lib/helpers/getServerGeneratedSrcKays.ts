import { IComponents, TypeSrc } from "@renderer/entites/module/models/components";
import { TypeComponent } from "alex-evo-web-constructor";

export function getServerGeneratedSrcKeys(component: IComponents): string[] {
    const result: string[] = [];

    // Рекурсивная функция для обхода компонентов
    function traverse(comp: IComponents) {
        // Проверяем, является ли компонент LayoutComponent и имеет ли src === SERVER_GENERATE
        if ('src' in comp && comp.src === TypeSrc.SERVER_GENERATE && 'src_key' in comp && comp.src_key) {
            result.push(comp.src_key);
        }

        // Если компонент содержит вложенные компоненты, рекурсивно обходим их
        if ('value' in comp) {
            if (Array.isArray(comp.value)) {
                if (comp.type === TypeComponent.COLUMNS)
                    comp.value.forEach(data=>traverse(data.value));
                else
                    comp.value.forEach(traverse);
            } else if (comp.value && typeof(comp.value) === 'object') {
                traverse(comp.value);
            }
        }
    }

    // Начинаем обход с переданного компонента
    traverse(component);

    return result;
}
