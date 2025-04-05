# import pprint


# async def get_expenses_by_user_id(user_id: int):
#     """
#     Fetch expenses for a specific user.
#     """
#     supabase = await get_supabase_client()

#     # user_id = "user_2uy5b3N3zpd9JjGHBa4MaZMEGEE"

#     response = (
#         supabase.from_("expenses")
#         .select("*")
#         .eq("user_id", user_id)
#         .order("date", desc=True)
#         .order("created_at", desc=True)
#         .execute()
#     )

#     if response.error:
#         raise Exception(f"Error fetching expenses: {response.error.message}")

#     return response.data
