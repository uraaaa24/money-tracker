# import pprint
# from fastapi import APIRouter, Depends, Request

# from app.core.auth import get_current_user
# from app.schemas.common import ListResponse
# from app.schemas.expense import ExpenseResponse
# from app.services.expense_service import get_expenses_by_user_id


# router = APIRouter()


# @router.get(
#     # "/expenses", tags=["expenses"], response_model=ListResponse[ExpenseResponse]
#     "/expenses",
#     tags=["expenses"],
# )
# def get_expenses(user=Depends(get_current_user)):
#     """
#     Fetch expenses for a specific user.
#     """
#     user_id = user["sub"]

#     expenses = get_expenses_by_user_id(user_id)

#     return expenses
