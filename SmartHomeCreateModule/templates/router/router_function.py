
@router.%{api.type}%("/%{api.url}%"%{route_option}%)
async def %{api.name}%(%{input_data}%auth_data: dict = Depends(token_dep)):
    pass

