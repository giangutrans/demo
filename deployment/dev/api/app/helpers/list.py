from typing import List, Any
from bson import ObjectId

def get_unique_list(item: List[Any])-> List[Any]:
    unique_list = set(item) if item else None
    return list(unique_list) if unique_list else None

def parse_to_object_id(item: List[Any]):
    parsed_array = []
    for ite in item:
        parsed_array.append(ObjectId(ite["_id"]))

    return parsed_array
