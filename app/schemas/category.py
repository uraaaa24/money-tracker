from enum import Enum


class CategoryType(str, Enum):
    food = "food"
    transport = "transport"
    shopping = "shopping"
    entertainment = "entertainment"
    utilities = "utilities"
    health = "health"
    other = "other"
