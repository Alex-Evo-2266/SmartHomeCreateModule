

interface ControlAPI{
    type: string
    system_name: string
    field: string
    value: string
}

interface ListItem{
    title: string
    text: string
}

interface CardAPI{
    header: string
    test: string
    list: ListItem[]
    control: ControlAPI[]
}